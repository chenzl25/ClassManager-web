import Immutable from 'immutable'
var validator = {
	beChecked: {
		account: {
			errorMessage: '用户名6~18位英文字母、数字',
			pattern: /^[a-zA-Z0-9]{6,18}$/
		},
		password: {
			errorMessage: '密码6~18位英文字母、数字',
			pattern: /^[a-zA-Z0-9]{6,18}$/
		},
		again: {
			errorMessage: '两次密码输入不相同',
			pattern: /^[a-zA-Z0-9]{6,18}$/
		},
		phone: {
			errorMessage: '手机号码11位数字',
			pattern: /^[1-9]\d{10}$/
		},
		email: {
			errorMessage: '邮箱格式不正确',
			pattern: /^[a-zA-Z_\-\d]+@(([a-zA-Z_\-\d])+\.)+[a-zA-Z]{2,4}$/
		}
	},
	validate: function(input) {
		var result = Immutable.Map({});
		for (var key in input) {
			if (key in this.beChecked && !this.beChecked[key].pattern.test(input[key])) {
				result = result.set(key, this.beChecked[key].errorMessage);
			}
			if (key == 'again' && input['again'] !== input['password']) {
				result = result.set('again', this.beChecked['again'].errorMessage);
			}
			// exception
		}
		return result;
	}

}
export default validator