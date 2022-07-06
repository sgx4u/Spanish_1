import axios from "axios";

// export class AuthApis {
// 	loginHandlerApi = async (data) => {
// 		try {
// 			const response = await axios.post("******url*******", data);
// 			return { success: true, data: response.data, status: response.status };
// 		} catch (error) {
// 			if (error.response)
// 				return {
// 					success: false,
// 					status: error.response.status,
// 					message: error.response.data.message,
// 					paragraph: error.response.data.paragraph,
// 				};
// 			else {
// 				return { success: false, status: 500 };
// 			}
// 		}
// 	};

// 	registrationHandlerApi = () => {
// 		console.log("Registration handler");
// 	};
// }

export class AuthApis {
	loginHandlerApi = async (data) => {
		try {
			const response = await axios.get(`https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-login/${data.userName}/${data.password}`);
			return { success: true, data: response.data, status: response.status };
		} catch (error) {
			if (error.response)
				return {
					success: false,
					status: error.response.status,
					message: error.response.data.message,
					paragraph: error.response.data.paragraph,
				};
			else {
				return { success: false, status: 500 };
			}
		}
	};

	registrationHandlerApi = () => {
		console.log("Registration handler");
	};
}
