var mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId;

//sub Schema
var MemberSchema = new mongoose.Schema({
	position: {type:String,default: null},
	student_id: {type:String,default: null},
	name:{type:String,default: null},   			//群名片
	join_on: { type: Date, default: Date.now },
	// member_id : ObjectId
	image: {type:String,default: null},
	account:  {type:String,default: null}
});
var HomeworkSchema = new mongoose.Schema({
	name: {type:String,default: null},
	content: {type:String,default: null},
	deadline: {type:Date,default: null},
	join_on: { type: Date, default: Date.now },
	// unlooks: [ObjectId]
	unlooks:[MemberSchema],        // account
	// unlooks_num: {type: Number, default: null}    //maybe need to be deprecated
});
var NoticeSchema = new mongoose.Schema({
	name: {type:String,default: null},
	content: {type:String,default: null},
	deadline: {type:Date,default: null},
	join_on: { type: Date, default: Date.now },
	image:{type:String,default: null},
	// unlooks: [ObjectId]
	unlooks:[MemberSchema],
	// unlooks_num: {type: Number, default: null}
});
// var CandidateSchema = new mongoose.Schema({
// 	candidate_id : {type: ObjectId},
// 	votes : {type: Number, default: 0},
// });
var OptionSchema = new mongoose.Schema({
	name: {type:String,default: null},
	votes : {type: Number, default: 0},
	// supporters: [ObjectId]
	supporters:[MemberSchema]
});
var VoteSchema = new mongoose.Schema({
	name: {type:String,default: null},
	content: {type:String,default: null},
	options: [OptionSchema],
	// position: {type:String,default: null},
	// candidates:[CandidateSchema],
	deadline: {type:Date,default: null},
	join_on: { type: Date, default: Date.now },
	// unvote: [ObjectId]
	unvotes: [MemberSchema],
	// unvotes_num: {type: Number, default: null}
});
var StatusSchema = new mongoose.Schema({
	name:{type:String,default: null},
	code: {type: Number, default: 0}
    // self_status : {type: Number, default: 0},
    // homeworks_status: {type: Number, default: 0},
    // notices_status: {type: Number, default: 0},
    // votes_status: {type: Number, default: 0},
    // members_status: {type: Number, default: 0},
    // joiners_status: {type: Number, default: 0}
});
//parent Schema
var OrganizationSchema = new mongoose.Schema({
    name: {type:String,default: null},
    account: {type:String,default: null,index:true},
    password: {type:String,default: null},
    image: {type:String,default: null},
    school:{type:String,default: null},
    join_on: { type: Date, default: Date.now },
    members: [MemberSchema],
    // members_num:{type:Number,default: 0},
    homeworks: [HomeworkSchema],
    notices: [NoticeSchema],
    votes: [VoteSchema],
    joiners:[String],    //待加入人的账号
    status: [StatusSchema]
});

OrganizationSchema.set('autoIndex', false);
VoteSchema.set('autoIndex', false);
HomeworkSchema.set('autoIndex', false);
NoticeSchema.set('autoIndex', false);
MemberSchema.set('autoindex', false);
StatusSchema.set('autoIndex', false);
OptionSchema.set('autoIndex', false);
// CandidateSchema.set('autoIndex', false);

//methods
OrganizationSchema.methods.speak = function () {
  console.log(this.name);
};

//static methods 
OrganizationSchema.statics.findByName = function (name, callback) {
  return this.find({ name: name}, callback);
};
OrganizationSchema.statics.findByAccount = function(account, callback) {
	return this.findOne({ account: account })
			   .exec(callback);
};
OrganizationSchema.statics.s_findByAccount = function(account, callback) {
	this.findOne({ account: account }, {name:1, account:1, image:1, password:1})
		.exec(function(err,data) {
			var tem = {};
			tem.account = data.account;
			tem.image = data.image;
			tem.name = date.name;
			if (data.password === null) {
				tem.need_password = false;
			} else {
				tem.need_password = true;
			}
			callback(err, tem);
		});
	return this.findOne({ account: account }, {name:1, account:1, image:1, password:1})
			   .exec(callback);
};
//Model
var Organization = mongoose.model('Organization', OrganizationSchema);


//validate
// Organization.schema.path('name').validate(function (value) {
// 	return value.length > 0;
// }, "name couldn't empty");

//find
// Organization.find({name:'dylan'},{ name: 1, password: 1}).
// 		limit(1).
// 		sort({ password: -1 }).
// 		select({ name: 1, password: 1, email:1})
// 		exec(f);

module.exports = Organization;