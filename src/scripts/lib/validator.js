import Immutable from 'immutable'
var validator = {
	beChecked: {
		account: {
			errorMessage: 'Error: wrong format of the account',
			pattern: /^[a-zA-Z0-9]{6,18}$/
		},
		password: {
			errorMessage: 'Error: wrong format of the password',
			pattern: /^[a-zA-Z0-9]{6,18}$/
		},
		again: {
			errorMessage: 'Error: wrong format of the again',
			pattern: /^[a-zA-Z0-9]{6,18}$/
		},
		phone: {
			errorMessage: 'Error: wrong format of the phone',
			pattern: /^[1-9]\d{10}$/
		},
		email: {
			errorMessage: 'Error: wrong format of the email',
			pattern: /^[a-zA-Z_\-\d]+@(([a-zA-Z_\-\d])+\.)+[a-zA-Z]{2,4}$/
		}
	},
	validate: function(input) {
		var result = Immutable.Map({});
		for (var key in input) {
			if (key in this.beChecked && !this.beChecked[key].pattern.test(input[key])) {
				if (key == 'again' && input['again'] !== input['password']) {
					result = result.set('again', this.beChecked['again'].errorMessage);
				} else{
					result = result.set(key, this.beChecked[key].errorMessage);
				}
			}
			// exception
		}
		return result;
	}

}
export default validator