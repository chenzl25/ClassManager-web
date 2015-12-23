window.onload = function() {
	var search = document.getElementById('search');
	var input = document.getElementById('input');
	var result = document.getElementById('result');
	var user_checked = document.querySelectorAll('input[name=user]')[0].checked;
	// var organization_checked = document.querySelectorAll('input[name=organization]')[0].checked;
	var request = new XMLHttpRequest();
	search.onclick= function(event) {
		var tem = input.value;
		var which = '';
		if (user_checked) {
			which = 'user';
		} else {
			which = 'organization';
		}
		request.open('GET', 'http://localhost:8080/search/' +which + '/'+ tem);
		request.send(null);
		request.onreadystatechange = function() {
			if (request.readyState === 4 && request.status == 200) {
				var type = request.getResponseHeader('Content-Type');
				result.innerHTML = request.responseText;
			}
		};
	};
};