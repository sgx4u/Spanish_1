import React, { Component } from "react";
import { Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography, Select } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { PulseLoader } from "react-spinners";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Page5Form from "./Page5Form";

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
					idAlertasTempranas: 2,
					name: "Alerta 2",
					tipoalerta: "",
					description: "Esta es una alerta de prueba",
					departamento: "San Salvador",
					municipio: "Apopa",
					active: "Activo",
				},
				{
					idAlertasTempranas: 3,
					name: "Alerta 3",
					tipoalerta: "",
					description: "Esta es una alerta de prueba",
					departamento: "La Libertad",
					municipio: "Ciuad Arce",
					active: "Inactivo",
				},
				{
					idAlertasTempranas: 4,
					name: "Alerta 4",
					tipoalerta: "",
					description: "Esta es una alerta de prueba",
					departamento: "La Libertad",
					municipio: "Santa Tecla",
					active: "Activo",
				},
			],
			DropDowns: [{ nombreTipoAlerta: "Selecciona Tipo Alerta" }],
		};
	}

	componentDidMount() {
		this.setState({ BackDrop: true });
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
				const dropDownData = this.state.DropDowns.concat(API_Response.body);
				this.setState({
					DropDowns: dropDownData,
				});
			} else {
				this.SnackbarActions({
					key: "Open",
					variant: "warning",
					Message: "API Not responding.....",
					TimeOut: 1000,
				});
			}
		});
		this.setState({ BackDrop: false });
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
		return (
			<>
				<Page5Form DropDowns={this.state.DropDowns} modalCloseHandler={this.props.modalCloseHandler} />
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
