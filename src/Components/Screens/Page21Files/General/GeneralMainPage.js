import React, { Component } from "react";
import MuiAlert from "@mui/lab/Alert";
import { FormControlLabel, Checkbox, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, InputAdornment, Typography, Divider, DialogActions, Dialog, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { CircleLoader } from "react-spinners";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class GeneralMainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "",
			SnackbarTimeOut: 4000,
			Data: [],
			MasterData: [],
			Add_Edit_window: false,
			AddNew: false,
			EditInfo: false,
			ModifiedData: {},
		};
	}

	async componentDidMount() {
		this.loadDefaultData();
	}

	loadDefaultData = async () => {
		await this.setState({ BackDrop: true });
		await axios.get("https://siam-mag-dev.azurewebsites.net/api/desarrollos/Get_Productores").then((res) => {
			let API_Response = res.data;
			console.log(API_Response);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			} else if (API_Response.code === "OK") {
				this.setState({ Data: API_Response.body, MasterData: API_Response.body });
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
				activo: SelectedData.activo,
				direccion: SelectedData.direccion,
				facebook: SelectedData.facebook,
				fechaCreado: SelectedData.fechaCreado,
				idProdctores: SelectedData.idProdctores,
				instagram: SelectedData.instagram,
				nombre: SelectedData.nombre,
				telephono: SelectedData.telephono,
				whatsapp: SelectedData.whatsapp,
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
		let date = new Date();
		const formData = new FormData();
		if (data.logo !== null) {
			formData.append("file", data.file);
		}
		let documentJson = {
			activo: data.activo,
			direccion: data.direccion,
			facebook: data.facebook,
			fechaCreado: date,
			instagram: data.instagram,
			nombre: data.nombre,
			telephono: data.telephono,
			whatsapp: data.whatsapp,
			exportador: data.exportador ? 1 : 0,
		};
		if (this.state.AddNew) {
			// const json = JSON.stringify(documentJson);
			// const blob = new Blob([json], {
			//     type: 'application/json'
			// });
			formData.append("webProductores", JSON.stringify(documentJson));
		}
		const config = { headers: { "content-type": "multipart/form-data" } };
		if (this.state.AddNew) {
			await axios.post("https://siam-mag-dev.azurewebsites.net/api/pantallas/add-productores-ingresar", formData, config).then((res) => {
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
			console.log({
				activo: data.activo,
				direccion: data.direccion,
				facebook: data.facebook,
				fechaCreado: date,
				idProdctores: data.idProdctores,
				instagram: data.instagram,
				nombre: data.nombre,
				telephono: data.telephono,
				whatsapp: data.whatsapp,
				exportador: data.exportador ? 1 : 0,
			});
			await axios.put("https://siam-mag-dev.azurewebsites.net/api/pantallas/update-productores-aquilizar/" + data.idProdctores + "/" + data.nombre + "/" + data.telephono + "/" + data.facebook + "/" + data.whatsapp + "/" + data.direccion + "/" + data.instagram + "/" + data.activo + "/" + (data.exportador ? 1 : 0), formData, config).then((res) => {
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

	SearchFilter = async (value) => {
		value = value.toLowerCase();
		await this.setState({
			Data: this.state.MasterData.filter((data) => data.nombre.toLowerCase().includes(value)),
			SearchValue: value,
		});
	};

	onChangeFiles = async (key, filenameKey, files) => {
		let Data = this.state.ModifiedData;
		Data[key] = files.length > 0 ? files[0] : null;
		Data[filenameKey] = files.length > 0 ? files[0].name : null;
		await this.setState({ ModifiedData: Data });
	};

	render() {
		// const classes = useStyles();
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon color="primary" />
											</InputAdornment>
										),
									}}
									placeholder="Buscar Productor"
									value={this.state.SearchValue}
									onChange={(e) => this.SearchFilter(e.target.value)}
								/>
							</Grid>
							{/* //* Edited - Subhajit Ghosh */}
							{/* <Grid item xs={12} sm={3}>
                                <TextField select fullWidth value="Buscar Todos">
                                    <MenuItem value="Buscar Todos">Buscar Todos</MenuItem>
                                </TextField>
                            </Grid> */}
							<Grid item xs={12} sm={3}>
								<Button style={{ float: "right" }} variant="outlined" onClick={() => this.setState({ AddNew: true, Add_Edit_window: true })}>
									Crear Productor
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Nombre\Productor
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											telephono
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											direccion
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											whatsapp
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											facebook
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											instagram
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											activo
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.Data.map((data, index) => {
										return (
											<TableRow>
												<TableCell align="center">{data.nombre}</TableCell>
												<TableCell align="center">{data.telephono}</TableCell>
												<TableCell align="center">{data.direccion}</TableCell>
												<TableCell align="center">{data.whatsapp}</TableCell>
												<TableCell align="center">{data.facebook}</TableCell>
												<TableCell align="center">{data.instagram}</TableCell>
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

				{/* Add New / Edit*/}
				<Dialog open={this.state.Add_Edit_window} onClose={() => this.setState({ Add_Edit_window: false, EditInfo: false, AddNew: false })} fullWidth size="lg">
					<DialogTitle>{this.state.AddNew ? "Agregar Productor" : "Editar Productor"}</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant="h5"></Typography>
							</Grid>
							<Grid item xs={12}>
								<center>
									<FormControlLabel control={<Checkbox checked={this.state.ModifiedData.exportador} onChange={(e) => this.TextFeildValueChanges(e.target.checked, "exportador")} />} label="Exportador" labelPlacement="right" />
								</center>
							</Grid>
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
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Teléfono:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.ModifiedData.telephono} onChange={(e) => this.TextFeildValueChanges(e.target.value, "telephono")} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">direccion:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.ModifiedData.direccion} onChange={(e) => this.TextFeildValueChanges(e.target.value, "direccion")} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">whatsapp:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.ModifiedData.whatsapp} onChange={(e) => this.TextFeildValueChanges(e.target.value, "whatsapp")} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">facebook:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.ModifiedData.facebook} onChange={(e) => this.TextFeildValueChanges(e.target.value, "facebook")} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">instagram:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth value={this.state.ModifiedData.instagram} onChange={(e) => this.TextFeildValueChanges(e.target.value, "instagram")} />
									</Grid>
								</Grid>
							</Grid>
							{this.state.EditInfo ? (
								<Grid item xs={12}>
									<Grid container spacing={2}>
										<Grid item xs={5}>
											<Typography variant="h6">activo:</Typography>
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
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">Logo:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth type="file" onChange={(e) => this.onChangeFiles("file", "logo", e.target.files)} />
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
											<TextField variant="outlined" fullWidth value={this.state.ModifiedData.Estado} select>
												<MenuItem value={1}>Activator</MenuItem>
												<MenuItem value={9}>Inactivator</MenuItem>
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
