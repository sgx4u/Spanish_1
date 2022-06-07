async function ProcessRequest(info) {
	var error = 0;
	let API_Response;
	var urlapi = "https://siam-mag-dev.azurewebsites.net/api/pantallas/" + info.API_Endpoint;
	console.log(urlapi);
	await fetch(urlapi, {
		method: info.method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info.data),
	})
		.then(function (response) {
			return response.json().catch(function (error) {
				console.log(error);
			});
		})
		.then(function (data) {
			error = 0;
			API_Response = data;
		})
		.catch(function (error) {
			error = 1;
		});
	if (error === 1) {
		return null;
	} else {
		return API_Response;
	}
}
exports.ProcessRequest = ProcessRequest;
