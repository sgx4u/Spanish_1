import React, { Component } from "react";
import MuiAlert from "@mui/lab/Alert";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, CircularProgress, Grid, MenuItem, Button, Snackbar, Typography, DialogActions, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { CircleLoader } from "react-spinners";
import axios from "axios";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Page12 extends Component {
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
			DropDowns: [],
			SelectedData: {},
			UpdateLoader: false,
			InfoDropdown: [],
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
		this.setState({ BackDrop: true });
		await axios.get("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-detalle-Informacion").then((res) => {
			let API_Response = res.data;
			console.log("API_Response 1", res.data);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			} else if (API_Response.code === "OK") {
				this.setState({ Data: API_Response.body });
			} else {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			}
		});
		axios.get("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-tipos-de-alertas").then((res) => {
			let API_Response = res.data;
			console.log("API_Response 2", API_Response);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			} else if (API_Response.code === "OK") {
				this.setState({ DropDowns: API_Response.body });
			} else {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			}
		});
		axios.get("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-tipos-informacion-lista").then((res) => {
			let API_Response = res.data;
			console.log("API_Response 3", API_Response);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			} else if (API_Response.code === "OK") {
				this.setState({ InfoDropdown: API_Response.body });
			} else {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			}
		});
		await this.setState({ BackDrop: false });
	};

	InputDataChanges = async (key, value) => {
		let Data = this.state.SelectedData;
		Data[key] = value;
		await this.setState({ SelectedData: Data });
	};

	onChangeFiles = async (key, filenameKey, files) => {
		let Data = this.state.SelectedData;
		Data[key] = files.length > 0 ? files[0] : null;
		Data[filenameKey] = files.length > 0 ? files[0].name : null;
		await this.setState({ SelectedData: Data });
	};

	AddUpdateData = () => {
		this.setState({ UpdateLoader: true });
		let data = this.state.SelectedData;
		console.log(data);
		const formData = new FormData();
		if (data.nombreImagen !== null) {
			formData.append("file", data.file);
		}

		let extraFileUri = "";

		if (data.nombreDocumento1 !== null && data.file1 !== undefined) {
			extraFileUri = `?nombreDocumento1=${data.nombreDocumento1}`;
			formData.append("file1", data.file1);
		}
		if (data.nombreDocumento2 !== null && data.file2 !== undefined) {
			extraFileUri = extraFileUri + `?nombreDocumento2=${data.nombreDocumento2}`;
			formData.append("file2", data.file2);
		}
		if (data.link !== null && data.link !== undefined) {
			extraFileUri = extraFileUri + `?link=${data.link}`;
			formData.append("link", data.link);
		}

		const config = { headers: { "content-type": "multipart/form-data" } };
		let finalDesc = data.descripcion.replaceAll("\n", "!$!");
		if (this.state.AddNew) {
			console.log("Call Api 1", data);
			axios
				.post("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/add-Detalle-de-Informacion/" + data.idInformacion + "/" + data.nombreInformacionDetalle + "/" + finalDesc + "/" + data.idTipoAlerta + "/" + data.nombreImagen + extraFileUri, formData, config)
				// .post("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/add-Detalle-de-Informacion/" + data.idInformacion + "/" + data.nombreInformacionDetalle + "/" + data.descripcion + "/" + data.link + "/" + data.idTipoAlerta + "/" + data.nombreImagen + extraFileUri, formData, config)

				.then((res) => {
					let API_Response = res.data;
					console.log(API_Response);
					if (API_Response === null || API_Response === undefined) {
						this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
					} else if (API_Response.code === "OK") {
						this.setState({ Add_Edit_window: false, SelectedData: {} });
						this.loadDefaultData();
					} else {
						this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			//let finalDesc = data.descripcion.replaceAll("\n", "!$!");
			axios
				.put("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/update-Detalle-de-Informacion/" + data.idInformacionDetalle + "/" + data.idInformacion + "/" + data.nombreInformacionDetalle + "/" + finalDesc + "/" + data.link + "/" + data.idTipoAlerta + "/" + data.activo + "/" + data.nombreImagen + "/" + data.nombreDocumento1 + "/" + data.nombreDocumento2, formData, config)
				.then((res) => {
					let API_Response = res.data;
					console.log(API_Response);
					if (API_Response === null || API_Response === undefined) {
						this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
					} else if (API_Response.code === "OK") {
						this.setState({ Add_Edit_window: false, SelectedData: {} });
						this.loadDefaultData();
					} else {
						this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		this.setState({ UpdateLoader: false });
	};

	render() {
		// const classes = useStyles();
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Noticias</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button color="primary" variant="outlined" style={{ float: "right" }} onClick={() => this.setState({ Add_Edit_window: true, EditInfo: false, AddNew: true, SelectedData: {} })}>
							Agregar
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID
										</TableCell>
										{/* <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">ID Informaci</TableCell> */}
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											T??tulo
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Contenido
										</TableCell>
										{/* <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Imagen</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Doc 1</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Doc2</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Link</TableCell> */}
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Tipo Alerta
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Estado
										</TableCell>
										{/* <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Estad</TableCell> */}
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.Data.map((data, index) => {
										return (
											<TableRow>
												<TableCell align="center">{data.idInformacionDetalle}</TableCell>
												{/* <TableCell align="center">{data.idInformacion}</TableCell> */}
												<TableCell align="center">{data.nombreInformacionDetalle}</TableCell>
												{/* <TableCell align="center">{this.lineBreakHandler(data.descripcion)}</TableCell> */}
												<TableCell align="center">
													{data.descripcion.split("!$!").map(function (item, idx) {
														return (
															<span key={idx}>
																{item}
																<br />
															</span>
														);
													})}
												</TableCell>
												<TableCell align="center">{data.idTipoAlerta}</TableCell>
												{/* <TableCell align="center"><img src={data.imagen} style={{height:20,width:20}} alt="Image Not Loading"/></TableCell>
                                                <TableCell align="center">{data.doc_1}</TableCell>
                                                <TableCell align="center">{data.doc_2}</TableCell>
                                                <TableCell align="center">{data.link}</TableCell> */}
												<TableCell align="center">{data.activo === 1 ? "Activo" : "Inactivo"}</TableCell>
												<TableCell align="center">
													<Button size="small" variant="outlined" color="primary" onClick={() => this.setState({ Add_Edit_window: true, EditInfo: true, AddNew: false, SelectedData: data })}>
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

				{/* Add New / Edit*/}
				<Dialog open={this.state.Add_Edit_window} onClose={() => this.setState({ Add_Edit_window: false, SelectedData: {} })} fullWidth size="lg">
					<DialogTitle>{this.state.AddNew ? "Agregar" : "Editar"}</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Cadenas Productiva:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" defaultValue={"Seleccione Cadena Productiva"} fullWidth select value={this.state.SelectedData.idInformacion} onChange={(e) => this.InputDataChanges("idInformacion", e.target.value)}>
											<MenuItem value={"Seleccione Cadena Productiva"}>Seleccione Cadena Productiva</MenuItem>
											{this.state.InfoDropdown.map((data, Index) => {
												return <MenuItem value={data.idInformacion}>{data.nombre}</MenuItem>;
											})}
										</TextField>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">T??tulo:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.SelectedData.nombreInformacionDetalle} onChange={(e) => this.InputDataChanges("nombreInformacionDetalle", e.target.value)} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Contenido:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth multiline value={this.state.SelectedData.descripcion?.replaceAll("!$!", "\n")} onChange={(e) => this.InputDataChanges("descripcion", e.target.value)} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Imagen:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth type="file" onChange={(e) => this.onChangeFiles("file", "nombreImagen", e.target.files)} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Documento 1:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth type="file" onChange={(e) => this.onChangeFiles("file1", "nombreDocumento1", e.target.files)} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Documento 2:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth type="file" onChange={(e) => this.onChangeFiles("file2", "nombreDocumento2", e.target.files)} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Link:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.SelectedData.link} onChange={(e) => this.InputDataChanges("link", e.target.value)} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Categor??a:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth select defaultValue={"Seleccione Tipo Informaci??n"} value={this.state.SelectedData.idTipoAlerta} onChange={(e) => this.InputDataChanges("idTipoAlerta", e.target.value)}>
											<MenuItem value="Seleccione Tipo Informaci??n">Seleccione Tipo Informaci??n</MenuItem>
											{this.state.DropDowns.map((data, Index) => {
												return (
													<MenuItem key={"MI" + Index} value={data.idTipoAlerta}>
														{data.nombreTipoAlerta}
													</MenuItem>
												);
											})}
										</TextField>
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
											<TextField variant="outlined" fullWidth select value={this.state.SelectedData.activo} onChange={(e) => this.InputDataChanges("activo", e.target.value)}>
												<MenuItem value={1}>Activo</MenuItem>
												<MenuItem value={0}>Inactivo</MenuItem>
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
						<Button variant="outlined" color="secondary" onClick={() => this.setState({ Add_Edit_window: false, SelectedData: {} })}>
							Cancelar
						</Button>
						{this.state.UpdateLoader ? (
							<Button variant="outlined">
								Guardar <CircularProgress style={{ height: 16, width: 16 }} />
							</Button>
						) : (
							<Button variant="outlined" onClick={() => this.AddUpdateData()}>
								Guardar
							</Button>
						)}
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
