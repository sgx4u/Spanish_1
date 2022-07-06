import React, { Component } from "react";
import MuiAlert from "@mui/lab/Alert";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography, DialogActions, Dialog, DialogContent, DialogTitle, Divider, CircularProgress } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { CircleLoader } from "react-spinners";
import axios from "axios";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Page31 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "",
			SnackbarTimeOut: 4000,
			Data: [
				{ nombre: "Certifcacion Avicultura", activo: "Activo" },
				{ nombre: "Certifcacion Ganaderia", activo: "Activo" },
				{ nombre: "Certifcacion Agricultura", activo: "Inactivo" },
				{ nombre: "Certifcacion Agricultura 1", activo: "Activo" },
			],
			Add_Edit_window: false,
			AddNew: false,
			EditInfo: false,
			ModifiedData: {},
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
		this.loadDefaultData();
	}

	loadDefaultData = async () => {
		await this.setState({ BackDrop: true });
		await axios.get("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-certificados").then((res) => {
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

	EditWindow = async (Index) => {
		const SelectedData = this.state.Data[Index];
		console.log(SelectedData);
		await this.setState({
			Add_Edit_window: true,
			EditInfo: true,
			AddNew: false,
			ModifiedData: {
				nombre: SelectedData.nombre,
				idCertificado: SelectedData.idCertificado,
				activo: SelectedData.activo,
			},
		});
	};

	TextFeildValueChanges = async (value, key) => {
		let Data = this.state.ModifiedData;
		Data[key] = value;
		await this.setState({ ModifiedData: Data });
		console.log(this.state.ModifiedData);
	};

	DropDownValueChanges = async (value) => {
		let Data = this.state.ModifiedData;
		Data.activo = value;
		await this.setState({ ModifiedData: Data });
	};

	Add_and_UpdateData = async () => {
		await this.setState({ UpdateLoader: true });
		let data = this.state.ModifiedData;
		if (this.state.AddNew) {
			await axios.post("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/add-certificado/" + data.nombre).then((res) => {
				let API_Response = res.data;
				console.log(API_Response);
				if (API_Response === null || API_Response === undefined) {
					this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
				} else if (API_Response.code === "OK") {
					this.setState({ ModifiedData: {}, Add_Edit_window: false });
					this.loadDefaultData();
				} else {
					this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
				}
			});
		} else {
			await axios.put("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/update-certificados/" + data.idCertificado + "/" + data.nombre + "/" + data.activo).then((res) => {
				let API_Response = res.data;
				console.log(API_Response);
				if (API_Response === null || API_Response === undefined) {
					this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
				} else if (API_Response.code === "OK") {
					this.setState({ ModifiedData: {}, Add_Edit_window: false });
				} else {
					this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
				}
			});
		}
		this.loadDefaultData();
		await this.setState({ UpdateLoader: false });
	};

	CancelEditAddWindow = async () => {
		await this.setState({ Add_Edit_window: false, EditInfo: false, ModifiedData: {} });
	};

	render() {
		// const classes = useStyles();
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Certificaciones de Productores</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button color="primary" variant="outlined" style={{ float: "right" }} onClick={() => this.setState({ EditInfo: false, AddNew: true, Add_Edit_window: true })}>
							Agregar
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Certificacion
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Nombre
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
													<TableCell align="center">{index + 1}</TableCell>
													<TableCell align="center">{data.nombre}</TableCell>
													<TableCell align="center">{data.activo === 1 ? "Activo" : "Inactivo"}</TableCell>
													<TableCell align="center">
														<Button size="small" variant="outlined" color="primary" onClick={() => this.EditWindow(index)}>
															Editar
														</Button>
													</TableCell>
												</TableRow>
											);
										})
									) : (
										<TableRow>
											<TableCell colSpan={4} align="center">
												<b>No se encontraron registros</b>
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>

				{/* Add New / Edit*/}
				<Dialog open={this.state.Add_Edit_window} onClose={() => this.setState({ Add_Edit_window: false, EditInfo: false, AddNew: false })} fullWidth size="lg">
					<DialogTitle>{this.state.AddNew ? "Agregar" : "Editar"}</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Nombre:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.ModifiedData.nombre} onChange={(e) => this.TextFeildValueChanges(e.target.value, "nombre")} />
									</Grid>
								</Grid>
							</Grid>
							{this.state.EditInfo ? (
								<Grid item xs={12}>
									<Grid container spacing={2}>
										<Grid item xs={5}>
											<Typography variant="h6">Estado:</Typography>
										</Grid>
										<Grid item xs={7}>
											<TextField variant="outlined" select value={this.state.ModifiedData.activo} fullWidth onChange={(e) => this.DropDownValueChanges(e.target.value)}>
												<MenuItem value={1}>Activo</MenuItem>
												<MenuItem value={0}>InActivo</MenuItem>
											</TextField>
										</Grid>
									</Grid>
								</Grid>
							) : (
								<></>
							)}
						</Grid>
					</DialogContent>
					<Divider />
					<DialogActions>
						<Button variant="outlined" color="secondary" onClick={() => this.CancelEditAddWindow()}>
							Cancelar
						</Button>
						<Button variant="outlined" onClick={() => this.Add_and_UpdateData()}>
							{this.state.UpdateLoader ? <CircularProgress style={{ height: 16, width: 16 }} /> : "Guardar"}
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
