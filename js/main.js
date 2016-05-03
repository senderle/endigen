(function main() {

	var root = {};
	(function rootModule(root) {
        var mainData;
		var mainButton;
		var mainOut;

        function init(json) {
            mainData = json;
        }

		function randomUnique() {
            var rand = Math.floor(Math.random() * 89999999 + 10000000);
            return "" + new Date().getTime() + rand;
		}

        function displayUnique() {
            var id = randomUnique();
            if (mainOut) {
			    mainOut.value = id;
                mainOut.focus();
                mainOut.select();
            } else {
                console.log(id);
            }
        }


        function bindButton(id) {
			mainButton = document.getElementById(id); 
			mainButton.addEventListener('click', displayUnique);
        }

		function bindOut(id) {
			mainOut = document.getElementById(id);
		}

        root.init = init;
        root.bindButton = bindButton;
		root.bindOut = bindOut;

		return root;
	})(root);

    var request = new XMLHttpRequest();
    var url = 'data/main.json';
    
    request.responseType = 'json';
    request.addEventListener('load', function loadJson() {
        if (request.readyState == 4 && request.status == 200) {
            root.init(request.response);
            root.bindButton('button-main');
			root.bindOut('output-main');
        }
    });
    
    request.open('GET', url, true);
    request.send();
})();
