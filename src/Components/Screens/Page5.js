import React, { Component } from "react";
import { Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { PulseLoader } from "react-spinners";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Page5 extends Component {
	//this page contains page-no 5 to 8
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "",
			SnackbarTimeOut: 4000,
			Data: [
				{
					idAlertasTempranas: 1,
					idTipoAlerta: 1,
					textoAlerta: "Testing Data",
					descript: "Esta es una alerta de prueba",
					departamento: "San Vicente",
					municipio: "Apastepeque",
					active: "Activo",
					fechaCreado: "",
				},
				{
					name: "Alerta 2",
					tipoalerta: "",
					description: "Esta es una alerta de prueba",
					departamento: "San Salvador",
					municipio: "Apopa",
					active: "Activo",
				},
				{
					name: "Alerta 3",
					tipoalerta: "",
					description: "Esta es una alerta de prueba",
					departamento: "La Libertad",
					municipio: "Ciuad Arce",
					active: "Inactivo",
				},
				{
					name: "Alerta 4",
					tipoalerta: "",
					description: "Esta es una alerta de prueba",
					departamento: "La Libertad",
					municipio: "Santa Tecla",
					active: "Activo",
				},
			],
			DropDowns: [],
		};
	}

	async componentDidMount() {
		await this.setState({ BackDrop: true });
		axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-tipos-de-alertas").then((res) => {
			let API_Response = res.data;
			console.log(API_Response);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({
					key: "Open",
					variant: "warning",
					Message: "API Not responding.....",
					TimeOut: 1000,
				});
			} else if (API_Response.code === "OK") {
				this.setState({ DropDowns: API_Response.body });
			} else {
				this.SnackbarActions({
					key: "Open",
					variant: "warning",
					Message: "API Not responding.....",
					TimeOut: 1000,
				});
			}
		});
		await this.setState({ BackDrop: false });
	}

	// Alert Messages Trigger function
	SnackbarActions = async (Data) => {
		if (Data.key === "Open") {
			await this.setState({
				SnackBar: true,
				SnackBarVariant: Data.variant,
				snackBarMessage: Data.Message,
				SnackbarTimeOut: Data.TimeOut,
			});
		} else {
			await this.setState({ SnackBar: false, SnackbarTimeOut: 10000 });
		}
	};
	render() {
		// const classes = useStyles();
		console.log("Hiiiii");

		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h6">Agregar Alerta Temprana</Typography>
					</Grid>
					<Grid item xs={12} />
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={2}>
								<Typography>Título:</Typography>
							</Grid>
							<Grid item xs={3}>
								<TextField fullWidth variant="outlined" />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={2}>
								<Typography>Mensaje:</Typography>
							</Grid>
							<Grid item xs={3}>
								<TextField multiline fullWidth variant="outlined" placeholder="Description" />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={2}>
								<Typography>Tipo de Alerta:</Typography>
							</Grid>
							<Grid item xs={3}>
								<TextField select fullWidth variant="outlined" value="default">
									<MenuItem disabled value="default">
										Selecciona Tipo Alerta
									</MenuItem>
									{this.state.DropDowns.map((data, Index) => {
										return <MenuItem key={"MI" + Index}>{data.nombreTipoAlerta}</MenuItem>;
									})}
								</TextField>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<FormControl>
									<FormLabel id="demo-row-radio-buttons-group-label">Afectacion:</FormLabel>
									<RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
										<FormControlLabel value="female" control={<Radio />} label="Afecta a todo el País" />
										<FormControlLabel value="male" control={<Radio />} label="Afecta a Departamento" />
										<FormControlLabel value="other" control={<Radio />} label="Afecta a Municipio" />
									</RadioGroup>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} />
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={2}>
								<Button variant="outlined">Guardar</Button>
							</Grid>
							<Grid item xs={2}>
								<Button variant="outlined">Cancelar</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{/* Alert Messages */}
				<Snackbar open={this.state.SnackBar} autoHideDuration={this.state.SnackbarTimeOut} onClose={() => this.SnackbarActions({ key: "Close", variant: "warning" })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
					<Alert onClose={() => this.SnackbarActions({ key: "Close" })} severity={this.state.SnackBarVariant} variant="filled">
						{this.state.snackBarMessage}
					</Alert>
				</Snackbar>

				{/* Backdrop When Data Loading */}
				<Backdrop style={{ zIndex: 2, color: "#fff" }} open={this.state.BackDrop}>
					<PulseLoader color="white" size={16} />
				</Backdrop>
			</>
		);
	}
}
