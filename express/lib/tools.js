var fs = require('fs');
var path = require('path');
var User = require('../database/User');
var Organization = require('../database/Organization');

var tools = {
	refresh : function (req, res, next) {
		if (req.session.user_data) {
			User.findByAccount(req.session.user_data.account, function(err, data) {
				req.session.user_data = data;
	  			next();
			});
		} else {
			next();
		}
	},
	update_status : function (data, status_name) {
		for (var i = 0; i < data.status.length; i++) {
			if (data.status[i].name === status_name) {
				data.status[i].code = Math.random();
				return true;
			}
		}
		return false;
	},
	invalid_data_handler :function (err) {
		// err is our ValidationError object
		// err.errors.password is a ValidatorError object
		if (err) {
	    	console.log('Attention!');
	    	console.log('--------------the save() failed----------------------');
	    	for (var i in err.errors) {
				console.log(err.errors[i].message); // prints 'Validator "Invalid password" failed for path password with value `grease`'
				console.log(err.errors[i].kind);  // prints "Invalid password"
				console.log(err.errors[i].path);  // prints "password"
				console.log(err.errors[i].value); // prints "vlue of password"
			}
	    	console.log('-----------------------------------------------------');
	  	} else {
	    	console.log('save successfully');
	  	}
	},
	user_in_organization: function (user_data, organization_account) {
		for (var i = 0; i < user_data.relationships.length; i++) {
			if (organization_account === user_data.relationships[i].account) {
				return true;
			}
		}
		return false;
	},
	user_is_manager_in_organization: function (user_data, organization_account) {
        for (var i =0; i < user_data.relationships.length; i++) {
            if (  user_data.relationships[i].account === organization_account) {
                if (user_data.relationships[i].position === 'founder' || 
                    user_data.relationships[i].position === 'manager') {
                    return true;
                } else {
                    return false;
                }
            }
	    }
	    return false;
	},
	user_is_founder_in_organization: function (user_data, organization_account) {
        for (var i =0; i < user_data.relationships.length; i++) {
            if (  user_data.relationships[i].account === organization_account) {
                if (user_data.relationships[i].position === 'founder') {
                    return true;
                } else {
                    return false;
                }
            }
	    }
	    return false;
	},
	add_homework_members: function(data_o,homework) {
		var self = this;
		for (var i = 0; i < data_o.members.length; i++) {
			User.findByAccount(data_o.members[i].account, function(err,data) {
				data.homeworks.push(homework);
				data.homeworks[data.homeworks.length-1].account = data_o.account;
				self.update_status(data_o, 'homeworks');
				data.save(self.invalid_data_handler);
			});
		}
	},
	send_message: function (account, message) {
		var self = this;
		User.findByAccount(account, function(err, data) {
			data.messages.push(message);
			self.update_status(data, 'messages');
			data.save(this.invalid_data_handler);
		});
	},
	ungroup: function(user_account, organization_account) {
		var self = this;
		User.findByAccount(user_account, function(err, data_u) {
			for (var i = 0; i < data_u.relationships.length; i++) {
				if (data_u.relationships[i].account === organization_account) {
					data_u.relationships.splice(i,1);
					self.update_status(data_u, 'relationships');
					data_u.save(self.invalid_data_handler);
					break;
				}
			}
		});
	},
	exclude: function(user_account, organization_account) {
		var self = this;
		User.findByAccount(user_account, function(err, data_u) {
			for (var i = 0; i < data_u.relationships.length; i++) {
				if (data_u.relationships[i].account === organization_account) {
					data_u.relationships.splice(i,1);
					self.update_status(data_u, 'relationships');
					data_u.save(self.invalid_data_handler);
					break;
				}
			}
		});
		Organization.findByAccount(organization_account, function(err, data_o) {
			var i, j, k;
			for (i = 0; i < data_o.members.length; i++) {
				if (data_o.members[i].account === user_account) {
					data_o.members.splice(i, 1);
					self.update_status(data_o, 'members');
					break;
				}
			}
			for (i = 0; i < data_o.homeworks.length; i++) {
				for (j = 0; j < data_o.homeworks[i].unlooks.length; j++) {
					if (data_o.homeworks[i].unlooks[j].account === user_account) {
						data_o.homeworks[i].unlooks.splice(j, 1);
						self.update_status(data_o, 'homeworks');
						break;
					}
				}
			}
			for (i = 0; i < data_o.notices.length; i++) {
				for (j = 0; j < data_o.notices[i].unlooks.length; j++) {
					if (data_o.notices[i].unlooks[j].account === user_account) {
						data_o.notices[i].unlooks.splice(j, 1);
						self.update_status(data_o, 'notices');
						break;
					}
				}
			}
			for (i = 0; i < data_o.votes.length; i++) {
				var has_vote = true;
				for (j = 0; j < data_o.votes[i].unvotes.length; j++) {
					if (data_o.votes[i].unvotes[j].account === user_account) {
						data_o.votes[i].unvotes.splice(j, 1);
						has_vote = false;
						break;		
					}
				}
				if (has_vote) {
					var find = false;
					for (j = 0; j < data_o.votes[i].options.length && !find; j++) {
						for (k = 0; k < data_o.votes[i].options[j].supporters.length && !find; k++) {
							console.log(user_account);
							if (data_o.votes[i].options[j].supporters[k].account === user_account) {
								data_o.votes[i].options[j].supporters.splice(k, 1);
								find = true;
								self.update_status(data_o, 'votes');
							}
						}
					}
				}
			}
			data_o.save(self.invalid_data_handler);
		});
	},
	delete_image: function(image, callback) {
		fs.unlink(path.join(__dirname, '..', 'uploads', image), function(err) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	}
};
module.exports = tools;