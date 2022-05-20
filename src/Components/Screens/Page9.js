import React, { Component } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, CircularProgress, Grid, MenuItem, Button, Snackbar, Typography, DialogActions, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { PulseLoader } from "react-spinners";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Page9 extends Component {
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "Sample Message",
			SnackbarTimeOut: 4000,
			Data: [],
			Add_Edit_window: false,
			AddNew: false,
			EditInfo: false,
			SelectedFile: null,
			SelectedFileName: null,
			nombre: "",
			id: null,
			activo: 1,
			file: null,
		};
	}

	async componentDidMount() {
		this.loadDefaultData();
	}

	loadDefaultData = async () => {
		await this.setState({ BackDrop: true });
		await axios.get("http://qa.mag.gob.sv/PRA/api/pantallas/get-tipos-de-informacion").then((res) => {
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
				this.setState({ Data: API_Response.body });
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

	SelectedForEdit = (info) => {
		this.setState({
			id: info.idInformacion,
			nombre: info.nombre,
			activo: info.activo,
			SelectedFile: info.imagen,
			Add_Edit_window: true,
			EditInfo: true,
			AddNew: false,
		});
		const data = this.blobConvertor(`data:image/jpeg;base64,${info.imagen}`);
		this.textInput.current.value = "image1";
	};

	Edit_or_NewData = async () => {
		let data = this.state;
		console.log(data);
		if (data.nombre === "") {
			this.SnackbarActions({
				key: "Open",
				variant: "warning",
				Message: "Please enter nombre",
				TimeOut: 8000,
			});
		} else {
			await this.setState({ updateLoader: true });
			const formData = new FormData();
			if (data.SelectedFileName !== null) {
				formData.append("file", data.SelectedFile);
			}
			const config = { headers: { "content-type": "multipart/form-data" } };
			if (data.AddNew) {
				console.log("http://qa.mag.gob.sv/PRA/api/pantallas/add-tipos-de-Informacion/" + data.nombre + "/" + data.SelectedFileName, formData, config);

				await axios
					.post("http://qa.mag.gob.sv/PRA/api/pantallas/add-tipos-de-Informacion/" + data.nombre + "/" + data.SelectedFileName, formData, config)
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
							this.setState({
								Add_Edit_window: false,
								nombre: "",
								SelectedFile: null,
								SelectedFileName: null,
							});
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
			} else {
				console.log("http://qa.mag.gob.sv/PRA/api/pantallas/update-tipos-de-Informacion/" + data.id + "/" + data.nombre + "/" + data.activo + "/" + (data.SelectedFileName === null ? "" : data.SelectedFileName));
				await axios
					.put("http://qa.mag.gob.sv/PRA/api/pantallas/update-tipos-de-Informacion/" + data.id + "/" + data.nombre + "/" + data.activo + "/" + (data.SelectedFileName === null ? "" : data.SelectedFileName), formData, config)
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
							this.setState({
								Add_Edit_window: false,
								nombre: "",
								SelectedFile: null,
								SelectedFileName: null,
							});
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
			}
			await this.setState({ updateLoader: false });
		}
	};

	FileChanged = async (e) => {
		await this.setState({
			SelectedFile: e.target.files.length > 0 ? e.target.files[0] : null,
			SelectedFileName: e.target.files.length > 0 ? e.target.files[0].name : null,
		});
	};
	truncate = (input) => {
		if (input.length > 5) {
			return input.substring(0, 8) + "...";
		}
		return input;
	};
	blobToBase64 = (blob) => {
		return new Promise((resolve, _) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsDataURL(blob);
		});
	};

	b64toBlob = (b64Data, contentType, sliceSize) => {
		contentType = contentType || "";
		sliceSize = sliceSize || 512;

		const byteCharacters = atob(b64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);

			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, { type: contentType });
		return blob;
	};

	blobConvertor = (ImageURL) => {
		const block = ImageURL.split(";");

		const contentType = block[0].split(":")[1];

		const realData = block[1].split(",")[1];

		// Convert it to a blob to upload
		const blob = this.b64toBlob(realData, contentType);
		console.log("Blob <<<<<****>>>>>>", blob);
		return blob;
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
						<Button
							color="primary"
							variant="outlined"
							style={{ float: "right" }}
							onClick={() =>
								this.setState({
									Add_Edit_window: true,
									EditInfo: false,
									AddNew: true,
								})
							}
						>
							Agregar Alerta
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Información
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Nombre
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Imagen Nombre
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Imagen
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
											<TableRow>
												<TableCell align="center">{data.idInformacion}</TableCell>
												<TableCell align="center">{data.nombre}</TableCell>
												<TableCell align="center">{data.nombreImagen}</TableCell>
												<TableCell align="center">
													{/* {this.truncate(data.imagen)} */}
													<img alt="Not able to display" src={`data:image/jpeg;base64,${data.imagen}`} style={{ height: 50, width: 50 }} />
												</TableCell>
												<TableCell align="center">{data.activo === 1 ? "Activo" : "Inactivo"}</TableCell>
												<TableCell align="center">
													<Button size="small" variant="outlined" color="primary" onClick={() => this.SelectedForEdit(data)}>
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

				<Dialog
					open={this.state.Add_Edit_window}
					onClose={() =>
						this.setState({
							Add_Edit_window: false,
							id: null,
							activo: 1,
							nombre: "",
						})
					}
					fullWidth
					size="lg"
				>
					<DialogTitle>{this.state.AddNew ? "Agregar Tipo de Información" : "Editar Tipo de Información"}</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Nombre:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.nombre} onChange={(e) => this.setState({ nombre: e.target.value })} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Imagen:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth type="file" onChange={(e) => this.FileChanged(e)} />
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
											<TextField variant="outlined" select value={this.state.activo} fullWidth onChange={(e) => this.setState({ activo: e.target.value })}>
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
						<Button
							variant="outlined"
							color="secondary"
							onClick={() =>
								this.setState({
									Add_Edit_window: false,
									id: null,
									activo: 1,
									nombre: "",
								})
							}
						>
							Cancelar
						</Button>
						{this.state.updateLoader ? (
							<Button variant="outlined">
								Guardar <CircularProgress style={{ height: 16, width: 16 }} />
							</Button>
						) : (
							<Button variant="outlined" onClick={() => this.Edit_or_NewData()}>
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
					<PulseLoader color="white" size={16} />
				</Backdrop>
			</>
		);
	}
}
