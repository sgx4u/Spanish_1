import { useState } from "react";
import { Grid, TextField, Paper, Button } from "@material-ui/core";
const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	return (
		<div className="LoginPage">
			<Paper>
				<Grid container spacing={3} direction={"column"} justify={"center"} alignItems={"center"}>
					<Grid item xs={12}>
						<TextField label="Username" onChange={(e) => setUsername(e.target.value)}></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField label="Password" type={"password"} onChange={(e) => setPassword(e.target.value)}></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth> Login </Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default Login;
