var validator = {
	validate_register_user : function(input) {
		var result = {error: false, message: ''};
		this._validate_account(input.account, result);
		this._validate_password(input.password, result);
		this._validate_name(input.name, result);
		this._validate_nick_name(input.nick_name, result);
		this._validate_email(input.email, result);
		this._validate_student_id(input.student_id, result);
		this._validate_phone(input.phone, result);
		this._validate_accessible(input.accessible, result);
		this._validate_gender(input.gender, result);
		this._validate_age(input.age, result);
		this._validate_qq(input.qq, result);
		if (result.error === false) {
			result.message = 'pass the validate_register_user;';
		} 
		return result;
	},
	validate_login_user : function(input) {
		var result = {error: false, message: ''};
		this._validate_account(input.account, result);
		this._validate_password(input.password, result);
		if (result.error === false) {
			result.message = 'pass the validate_login_user;';
		} 
		return result;
	},
	validate_register_organization: function(input) {
		var result = {error: false, message: ''};
		this._validate_account(input.account, result);
		this._validate_name(input.name, result);
		if (result.error === false) {
			result.message = 'pass the validate_register_organization;';
		} 
		return result;
	},
	validate_settings_user: function(input) {
		var result = {error: false, message: ''};
		this._validate_name(input.name, result);
		this._validate_nick_name(input.nick_name, result);
		this._validate_email(input.email, result);
		this._validate_student_id(input.student_id, result);
		this._validate_phone(input.phone, result);
		this._validate_accessible(input.accessible, result);
		this._validate_gender(input.gender, result);
		this._validate_age(input.age, result);
		this._validate_qq(input.qq, result);
		if (result.error === false) {
			result.message = 'pass the validate_settings_user;';
		} 
		return result;
	},
	validate_settings_organization: function(input) {
		var result = {error: false, message: ''};
		this._validate_name(input.name, result);
		if (result.error === false) {
			result.message = 'pass the validate_settings_organization;';
		} 
		return result;
	},
	_validate_account: function(account, result) {
		if (account === null) {
			result.error = true;
			result.message += 'the account is null;';
			return;
		}
		if (account.length < 6) {
			result.error = true;
			result.message += 'the account is too short;';
		}
		if (!/[a-zA-z0-p]+/.test(account)) {
			result.error = true;
			result.message += 'the account contains illegal letter;';
		}

	},
	_validate_password: function(password, result) {
		if (password === null) {
			result.error = true;
			result.message += 'the password is null;';
			return;
		}
		if (password.length < 6) {
			result.error = true;
			result.message += 'the password is too short;';
		}
		if (!/[a-zA-z0-p]+/.test(password)) {
			result.error = true;
			result.message += 'the password contains illegal letter;';
		}
	},
	_validate_name: function(name, result) {
		if (name === null) {
			return;
		}
		if (name.length === 0) {
			result.error = true;
			result.message += 'the name is empty;';
		}
	},
	_validate_nick_name: function(nick_name, result) {
		if (nick_name === null) {
			return;
		}
		if (nick_name.length === 0) {
			result.error = true;
			result.message += 'the nick_name is empty;';
		}
	},
	_validate_email: function(email, result) {
		if (email === null) {
			return;
		}
		if (!/[a-zA-z0-9]+@[a-zA-z0-9]+\..*/.test(email)) {
			result.error = true;
			result.message += 'wrong format for the email;';
		}
	},
	_validate_student_id: function(student_id, result) {
		if (student_id === null) {
			return;
		}
		if (!/[0-9]+/.test(student_id)) {
			result.error = true;
			result.message += 'wrong format for the student_id;';
		}
	},
	_validate_phone: function(phone, result) {
		if (phone === null) {
			return;
		}
		if (!/^[0-9]{11}$/.test(phone)) {
			result.error = true;
			result.message += 'wrong format for the phone number;';
		}
	},
	_validate_gender: function(gender, result) {
		if (gender === null) {
			return;
		}
		if (gender !== 'male' && gender !== 'female') {
			result.error = true;
			result.message += 'wrong format for the gender;';
		}
	},
	_validate_accessible: function(accessible, result) {
		if (accessible === null) {
			return;
		}
		if (accessible !== 'true' && accessible !== 'false') {
			result.error = true;
			result.message += 'wrong format for the accessible;';			
		}
	},
	_validate_age: function(age, result) {
		if (age === null) {
			return;
		}
		if (age < 0 || age > 150) {
			result.error = true;
			result.message += 'wrong format for the age;';
		}
	},
	_validate_qq: function(qq, result) {
		if (qq === null) {
			return;
		}
		if (!/^[0-9]*$/.test(qq)) {
			result.error = true;
			result.message += 'wrong format for the qq number;';
		}
	}
};

module.exports = validator;