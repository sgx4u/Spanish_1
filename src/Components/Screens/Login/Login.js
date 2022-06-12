import { Grid, TextField, Paper, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { AuthApis } from "../../httpServices/AuthApis";

const Login = ({ setSuccess, setReturnID }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const authApiObject = new AuthApis();
		const loginApiResponse = await authApiObject.loginHandlerApi(data);
		setSuccess(loginApiResponse.success);
		setReturnID(
			loginApiResponse.data.body.map((info) => {
				return info.idUsuario;
			})
		);
		console.log("loginApiResponse <<<<@@@>>>>>", loginApiResponse);
	};

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
