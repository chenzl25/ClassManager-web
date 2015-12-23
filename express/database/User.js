var mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId;

//sub Schema
var HomeworkSchema = new mongoose.Schema({
    account: {type:String,default: null},    //organization account
	name: {type:String,default: null},
	content: {type:String,default: null},
	deadline: {type:Date,default: null},
	unlook: {type:Boolean,default:true},
    uncomplish: {type:Boolean,default:true}    //添加的
});
var RelationshipSchema = new mongoose.Schema({
    // organization_id: ObjectId,   // 添加的
    name:{type:String,default: null},           //name of the organization
    account:{type:String,default: null},        //account of the organization
    image:{type:String,default: null},          //image of organization
    position: {type:String,default: null}
});
var MessageSchema = new mongoose.Schema({
    name:{type:String,default: null},
    content:{type:String,default: null},
    sender:{type:String,default: null},
    join_on: {type:Date,default: Date.now},
    unlook: {type:Boolean,default:true}
});
var StatusSchema = new mongoose.Schema({
    name:{type:String,default: null},
    code: {type: Number, default: 0}
    // self_status : {type: Number, default: 0},
    // homeworks_status: {type: Number, default: 0},
    // relationships_status: {type: Number, default: 0},
});
//parent Schema
var UserSchema = new mongoose.Schema({
    name: {type:String,default: null},
    nick_name: {type:String,default: null},
    account: {type:String,default: null,index:true},
    password: {type:String,default: null},
    gender: {type:String,default: null},
    age: {type: Number, default: 0},
    signature: {type:String,default: null},
    accessible: {type:Boolean,default:true},
    student_id: {type:String,default: null},
    image: {type:String,default: null},
    relationships: [RelationshipSchema],
    school: {type:String,default: null},
    email: {type:String,default: null},
    join_on: { type: Date, default: Date.now },
    homeworks: [HomeworkSchema],
    messages:[MessageSchema],
    friends: [String],    //account
    phone: {type: String, default: null},
    qq: {type: String, default: null},
    wechat: {type: String, default: null},
    status: [StatusSchema],
    // {name:'self', code:Math.random()}
    // {name:'homeworks', code:Math.random()}
    // {name:'relationships', code:Math.random()}
    // {name:'messages', code:Math.random()}
});

UserSchema.set('autoIndex', false);
HomeworkSchema.set('autoIndex', false);

//methods
UserSchema.methods.speak = function () {
  console.log(this.name);
};

//static methods 
UserSchema.statics.findByName = function (name, callback) {
  return this.find({name: name}).exec(callback);
};
UserSchema.statics.findByAccount = function(account, callback) {
	return this.findOne({account: account})
			   .exec(callback);
};
UserSchema.statics.s_findByAccount = function(account, callback) {
    return this.findOne({account: account},
                        {password:0,
                         homeworks:0,
                         status:0,
                         messages:0})
                        .exec(callback);
};
//Model
var User = mongoose.model('User', UserSchema);

//validate
// User.schema.path('name').validate(function (value) {
// 	return value.length > 0;
// }, "name couldn't empty");

//find
// User.find({name:'dylan'},{ name: 1, password: 1}).
// 		limit(1).
// 		sort({ password: -1 }).
// 		select({ name: 1, password: 1, email:1})
// 		exec(f);

module.exports = User;