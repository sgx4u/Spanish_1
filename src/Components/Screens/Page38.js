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
			Data: [],
			Add_Edit_window: false,
			AddNew: false,
			EditInfo: false,
			ModifiedData: {},
			DropdownData: [],
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
		await this.loadDefaultData();
		console.log("Test 1");
	}

	loadDefaultData = async () => {
		await this.setState({ BackDrop: true });
		axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-informe-precios").then((res) => {
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
				this.setState({ Data: API_Response.body, Add_Edit_window: false });
			} else {
				this.SnackbarActions({
					key: "Open",
					variant: "warning",
					Message: "API Not responding.....",
					TimeOut: 1000,
				});
			}
		});

		axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-tipo-precios").then((res) => {
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
				this.setState({ DropdownData: API_Response.body });
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

	DropDownValueChanges = async (value) => {
		let Data = this.state.ModifiedData;
		Data.activo = value;
		await this.setState({ ModifiedData: Data });
	};

	updateHandler = () => {
		let Data = this.state.ModifiedData;
		var myHeaders = new Headers();
		myHeaders.append("Cookie", "ARRAffinity=157a08f3cf7318bcf09a7abb8ef35f9619888baf70de15241990350d6f427fbd; ARRAffinitySameSite=157a08f3cf7318bcf09a7abb8ef35f9619888baf70de15241990350d6f427fbd");

		var formdata = new FormData();
		formdata.append("file", Data.SelectedFile, "[PROXY]");

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		};

		// fetch(`https://siam-mag-dev.azurewebsites.net/api/pantallas/add-subir-precios-internacional/${Data.nombre}/${Data.Título}/${Data.Descripción}`, requestOptions)
		// 	.then((response) => response.text())
		// 	.then((res) => {
		// 		this.loadDefaultData();
		// 		this.CancelEditAddWindow();
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
		this.setState({ UpdateLoader: false });
	};

	Add_and_UpdateData = async () => {
		await this.setState({ UpdateLoader: true });
		this.updateHandler();
		const formData = new FormData();
		let Data = this.state.ModifiedData;
		console.log("Form Data <<<<<@@@@>>>>", Data);
		// if (Data.SelectedFileName !== null) {
		formData.append("file", Data.SelectedFile);
		// }

		const config = { headers: { "content-type": "multipart/form-data" } };

		await axios
			.post("https://siam-mag-dev.azurewebsites.net/api/pantallas/add-subir-precios-internacional/" + Data.nombre + "/" + Data.Título + "/" + Data.Descripción + "", formData, config)
			.then((res) => {
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
					// this.SnackbarActions({
					// 	key: "Open",
					// 	variant: "success",
					// 	Message: "Saved",
					// 	TimeOut: 1000,
					// });
					this.loadDefaultData();
				} else {
					this.SnackbarActions({
						key: "Open",
						variant: "warning",
						Message: "API Not responding.....",
						TimeOut: 1000,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		await this.setState({ UpdateLoader: false });
	};

	CancelEditAddWindow = async () => {
		await this.setState({
			Add_Edit_window: false,
			EditInfo: false,
			ModifiedData: {},
		});
	};

	UpdateStatusData = async (id, status) => {
		await this.setState({ BackDrop: true });
		await axios.put("https://siam-mag-dev.azurewebsites.net/api/pantallas/update-precio-informe/" + id + "/" + status).then((res) => {
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
				this.loadDefaultData();
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
	};

	onChangeFiles = (e) => {
		const SelectedFile = e.target.files.length > 0 ? e.target.files[0] : null;
		const SelectedFileName = e.target.files.length > 0 ? e.target.files[0].name : null;

		this.setState({ ModifiedData: { ...this.state.ModifiedData, SelectedFile: SelectedFile, SelectedFileName: SelectedFileName } });
	};

	render() {
		// const classes = useStyles();
		// console.log("ModifiedData <<<<###??????>>>>>", this.state.ModifiedData);
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Matenimiento de Informe de Precios</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button
							color="primary"
							variant="outlined"
							style={{ float: "right" }}
							onClick={() =>
								this.setState({
									EditInfo: false,
									AddNew: true,
									Add_Edit_window: true,
								})
							}
						>
							Agregar
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Informe de Precio
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Titulo
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Descripción
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Cambiar Estado
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.Data.length > 0 ? (
										this.state.Data.map((data, index) => {
											return (
												<TableRow>
													<TableCell align="center">{data.idRetrospectiva}</TableCell>
													<TableCell align="center">{data.titulo}</TableCell>
													<TableCell align="center">{data.descripcion}</TableCell>
													<TableCell align="center">
														<TextField select label="" value={data.activo} onChange={(e) => this.UpdateStatusData(data.idRetrospectiva, e.target.value)}>
															<MenuItem value={1}>Activo</MenuItem>
															<MenuItem value={0}>InActivo</MenuItem>
														</TextField>
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
				<Dialog
					open={this.state.Add_Edit_window}
					onClose={() =>
						this.setState({
							Add_Edit_window: false,
							EditInfo: false,
							AddNew: false,
						})
					}
					fullWidth
					size="lg"
				>
					<DialogTitle>Subir Archivo</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Tipo de Precio:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" select fullWidth value={this.state.ModifiedData.nombre} onChange={(e) => this.setState({ ModifiedData: { ...this.state.ModifiedData, nombre: e.target.value } })}>
											<MenuItem>Select</MenuItem>
											{this.state.DropdownData.map((data, Index) => {
												return (
													<MenuItem key={"MI" + Index} value={data.idTipoPrecio}>
														{data.nombre}
													</MenuItem>
												);
											})}
										</TextField>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Título:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" value={this.state.ModifiedData.Título} fullWidth onChange={(e) => this.setState({ ModifiedData: { ...this.state.ModifiedData, Título: e.target.value } })} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Descripción:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" multiline value={this.state.ModifiedData.Descripción} fullWidth onChange={(e) => this.setState({ ModifiedData: { ...this.state.ModifiedData, Descripción: e.target.value } })} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Archivo:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField
											variant="outlined"
											fullWidth
											//  value={this.state.ModifiedData.SelectedFileName}
											type="file"
											onChange={(e) => this.onChangeFiles(e)}
										/>
									</Grid>
								</Grid>
							</Grid>
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
