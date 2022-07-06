import { Grid, TextField, Paper, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { AuthApis } from "../../httpServices/AuthApis";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ setSuccess, setFilterPages }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [returnID, setReturnID] = useState();
	const [storeData, setStoreData] = useState();

	const onSubmit = async (data) => {
		const authApiObject = new AuthApis();
		const loginApiResponse = await authApiObject.loginHandlerApi(data);
		setReturnID(
			loginApiResponse.data.body.map((info) => {
				return info.idUsuario;
			})
		);
	};

	const getPermission = () => {
		axios.get(`https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-permission/${returnID}`).then((res) => {
			let API_Response = res.data;
			if (API_Response === null || API_Response === undefined) {
				console.log("Error", API_Response);
			} else {
				setStoreData(res);
			}
		});
	};

	const findPages = (storeData) => {
		let filteredData = [];
		storeData.data.body.map((info) => {
			return filteredData.push(info.titulo);
		});
		setFilterPages(filteredData);
		setSuccess(true);
	};

	useEffect(() => {
		if (returnID != undefined || returnID != null) {
			getPermission();
		}
	}, [returnID]);

	useEffect(() => {
		if (storeData != undefined || storeData != null) {
			findPages(storeData);
		}
	}, [storeData]);

	return (
		<div className="LoginPage">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Paper>
					<Grid container spacing={3} direction={"column"} justifyContent={"center"} alignItems={"center"}>
						<Grid item xs={12}>
							<TextField label="Username" {...register("userName", { required: true })} error={errors.userName?.type === "required"} helperText={errors.userName?.type === "required" && "User Name is required"}></TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField label="Password" type={"password"} {...register("password", { required: true })} error={errors.password?.type === "required"} helperText={errors.password?.type === "required" && "Password is required"}></TextField>
						</Grid>
						<Grid item xs={12}>
							<Button type="submit" fullWidth>
								{" "}
								Login{" "}
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</form>
		</div>
	);
};

export default Login;
