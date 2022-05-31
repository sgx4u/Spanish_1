import React, { Component } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography, DialogActions, Dialog, DialogContent, DialogTitle, Divider, CircularProgress } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { PulseLoader } from "react-spinners";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Request = require("../API_Request");

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Page1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "",
			SnackbarTimeOut: 4000,
			Data: [
				{ idTipoAlerta: 1, nombreTipoAlerta: "Tipo Alerta 2", activo: "Activo" },
				{ idTipoAlerta: 1, nombreTipoAlerta: "Tipo Alerta 2", activo: "Activo" },
				{ idTipoAlerta: 1, nombreTipoAlerta: "Tipo Alerta 2", activo: "Activo" },
			],
			Add_Edit_window: false,
			AddNew: false,
			EditInfo: false,
			ModifiedData: {},
		};
	}

	async componentDidMount() {
		await this.loadDefaultData();
	}

	loadDefaultData = async () => {
		await this.setState({ BackDrop: true });
		axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-tipos-de-alertas").then((res) => {
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
	EditWindow = async (Index) => {
		const SelectedData = this.state.Data[Index];
		await this.setState({
			Add_Edit_window: true,
			EditInfo: true,
			AddNew: false,
			ModifiedData: { idTipoAlerta: SelectedData.idTipoAlerta, nombreTipoAlerta: SelectedData.nombreTipoAlerta, activo: SelectedData.activo },
		});
	};

	TextFeildValueChanges = async (value) => {
		let Data = this.state.ModifiedData;
		Data.nombreTipoAlerta = value;
		await this.setState({ ModifiedData: Data });
	};
	DropDownValueChanges = async (value) => {
		let Data = this.state.ModifiedData;
		Data.activo = value;
		await this.setState({ ModifiedData: Data });
	};
	Add_and_UpdateData = async () => {
		await this.setState({ UpdateLoader: true });
		let data = this.state.ModifiedData;
		// console.log(data)
		if (this.state.AddNew) {
			await axios.post("https://siam-mag-dev.azurewebsites.net/api/pantallas/add-tipo_alertas/" + data.nombreTipoAlerta).then((res) => {
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
			await axios.put("https://siam-mag-dev.azurewebsites.net/api/pantallas/update-tipos-de-Alertas/" + data.idTipoAlerta + "/" + data.nombreTipoAlerta + "/" + data.activo).then((res) => {
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
						<Typography variant="h4">Mantenimiento de Tipos de Información</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button color="primary" variant="outlined" style={{ float: "right" }} onClick={() => this.setState({ Add_Edit_window: true, EditInfo: false, AddNew: true })}>
							Agregar
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Tipo Alerta
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
									{this.state.Data.map((data, index) => {
										return (
											<TableRow key={"TBR" + index}>
												<TableCell align="center">{data.idTipoAlerta}</TableCell>
												<TableCell align="center">{data.nombreTipoAlerta}</TableCell>
												<TableCell align="center">{data.activo === 1 ? "Activo" : "Inactivo"}</TableCell>
												<TableCell align="center">
													<Button size="small" variant="outlined" color="primary" onClick={() => this.EditWindow(index)}>
														Editar
													</Button>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>

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
										<TextField variant="outlined" fullWidth value={this.state.ModifiedData.nombreTipoAlerta} onChange={(e) => this.TextFeildValueChanges(e.target.value)} />
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
					<PulseLoader color="white" size={16} />
				</Backdrop>
			</>
		);
	}
}
