/*关于我们*/
var about = function() {
	this.abouts = function() {
		var paramsJson = {
			type: 5,
		}
		var data = {
			secretKey: "mobileSecretKey1234567890",
			opt: "aboutUs",
			params: JSON.stringify(paramsJson)
		}

		$.post(interfaceApi, data, function(result) {
			var result = JSON.parse(result);
			if (result.messageCode == 1) {
				$('<p>' + result.resultObject + '</p>').appendTo(".main");
			} else {
				getBomBbox(result.message);
			}
		})
	}
}