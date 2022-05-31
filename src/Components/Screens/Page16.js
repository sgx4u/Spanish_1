import React, { Component } from "react";
import MuiAlert from "@mui/lab/Alert";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography, DialogActions, Dialog, DialogContent, DialogTitle, Divider, FormControlLabel, Checkbox } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { CircleLoader } from "react-spinners";
import axios from "axios";

import Page17 from "./Page17";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Page16 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "",
			SnackbarTimeOut: 4000,
			Data: [
				{ Nombre_Completo: "José Abel Contreras", DUI: "09090909-7", NIT: "09090909-7", Dirección: "Colonia la Palma.", Departamento: "San Salvador", Municipio: "Apopa", Tipo_Persona: "Natural", Razón_Socia: "", Correo_Electrónico: "", Clave: "", Celular: "", Latitud: "", Longitud: "", Fecha_Registro: "", Aprobado: "", estado: "Activo" },
				{ Nombre_Completo: "Pablo Escobar", DUI: "09090909-8", NIT: "09090909-8", Dirección: "Colonia la..", Departamento: "San Salvador", Municipio: "Apopa", Tipo_Persona: "Natural", Razón_Socia: "", Correo_Electrónico: "", Clave: "", Celular: "", Latitud: "", Longitud: "", Fecha_Registro: "", Aprobado: "", estado: "Activo" },
				{ Nombre_Completo: "Susana Menjivar de la Rosa", DUI: "09090909-0", NIT: "09090909-8", Dirección: "Colonia la..", Departamento: "San Salvador", Municipio: "San Salvador", Tipo_Persona: "Jurídica", Razón_Socia: "", Correo_Electrónico: "", Clave: "", Celular: "", Latitud: "", Longitud: "", Fecha_Registro: "", Aprobado: "", estado: "Inactivo" },
				{ Nombre_Completo: "Carlos Humberto Mayorga", DUI: "09090609-7", NIT: "9090909-5", Dirección: "Colonia la..", Departamento: "San Salvador", Municipio: "Tutunichapa", Tipo_Persona: "Jurídica", Razón_Socia: "", Correo_Electrónico: "", Clave: "", Celular: "", Latitud: "", Longitud: "", Fecha_Registro: "", Aprobado: "", estado: "Activo" },
			],
			selectedData: {},
		};
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
	async componentDidMount() {
		await this.setState({ BackDrop: true });
		await this.loadDefaultData();
		await this.setState({ BackDrop: false });
	}

	loadDefaultData = async () => {
		await this.setState({ BackDrop: true });
		await axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-Usuario").then((res) => {
			console.log(res);
			let API_Response = res.data;
			console.log(API_Response);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			} else if (API_Response.code === "OK") {
				this.setState({ Data: API_Response.body });
			} else {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			}
		});
		await this.setState({ BackDrop: false });
	};
	InpuTvalueChanges = async (key, value) => {
		let data = this.state.selectedData;
		data[key] = value;
		await this.setState({ selectedData: data });
	};
	addData = async () => {
		await this.setState({ BackDrop: true, Edit_window: false });
		await axios.post("https://siam-mag-dev.azurewebsites.net/api/pantallas/add-usuario-activator/" + this.state.selectedData.idUsuario + "/" + (this.state.selectedData.checked === true ? 1 : 0)).then((res) => {
			console.log(res);
			let API_Response = res.data;
			console.log(API_Response);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			} else if (API_Response.code === "OK") {
				this.loadDefaultData();
			} else {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			}
		});
		await this.setState({ BackDrop: false });
	};
	render() {
		// const classes = useStyles();
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Mantenimiento de Usuario del APP</Typography>
					</Grid>

					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Usuario Web
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Tipo Persona
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Nombre
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Correo Electrónico
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Celular
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Aprobado
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Estado
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.Data.length > 0 ? (
										this.state.Data.map((data, index) => {
											return (
												<TableRow>
													<TableCell align="center">{data.idUsuario}</TableCell>
													<TableCell align="center">{data.tipoPersona}</TableCell>
													<TableCell align="center">{data.primerNombre}</TableCell>
													<TableCell align="center">{data.correoElectronico}</TableCell>
													<TableCell align="center">{data.celular}</TableCell>
													<TableCell align="center">{data.aprovado}</TableCell>
													<TableCell align="center">{data.activo === 1 ? "Activo" : "Inactivo"}</TableCell>
													<TableCell align="center">
														<Button size="small" variant="outlined" color="primary" onClick={() => this.setState({ Edit_window: true, selectedData: data })}>
															Ver
														</Button>
													</TableCell>
												</TableRow>
											);
										})
									) : (
										<TableRow>
											<TableCell colSpan={18} align="center">
												<b>No se encontraron registros</b>
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>

				<Dialog open={this.state.Edit_window} onClose={() => this.setState({ Edit_window: false })} fullWidth size="lg">
					<DialogTitle>Mantenimiento de Usuario del APP</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography>Nombre de Usuario App:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.segundoNombre} />
									</Grid>
									<Grid item xs={12} sm={3}>
										<center>
											<FormControlLabel control={<Checkbox value={this.state.selectedData.checked} onChange={(e) => this.InpuTvalueChanges("checked", e.target.checked)} />} label="Aprobar Usuario App" />
										</center>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">DUI:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.dui} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">NIT:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.nit} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Dirección:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.direccion} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Departamento:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.departmento} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Municipio:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.municipio} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Tipo Persona:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.tipoPersona} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Razón Social:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.razonSocial} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Correo Electrónico:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.correoElectronico} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Clave:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.clave} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Celular:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.celular} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Longitud:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.latitud} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Latitud:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.longitud} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5} sm={3}>
										<Typography variant="h6">Fecha de Registro:</Typography>
									</Grid>
									<Grid item xs={7} sm={6}>
										<TextField fullWidth value={this.state.selectedData.fechaRegistro} />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button variant="outlined" color="secondary" onClick={() => this.setState({ Edit_window: false })}>
							Cancelar
						</Button>
						<Button variant="outlined" onClick={() => this.addData()}>
							Guardar
						</Button>
					</DialogActions>
				</Dialog>

				{/* Alert Messages */}
				<Snackbar open={this.state.SnackBar} autoHideDuration={this.state.SnackbarTimeOut} onClose={() => this.SnackbarActions({ key: "Close", variant: "warning" })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
					<Alert onClose={() => this.SnackbarActions({ key: "Close" })} severity={this.state.SnackBarVariant} variant="filled">
						{this.state.snackBarMessage}
					</Alert>
				</Snackbar>

				{/* Backdrop When Data Loading */}
				<Backdrop style={{ zIndex: 2, color: "#fff" }} open={this.state.BackDrop}>
					<CircleLoader color="white" size={100} />
				</Backdrop>
			</>
		);
	}
}
