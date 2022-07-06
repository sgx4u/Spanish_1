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
			ModifiedData: { file: "" },
		};
	}

	async componentDidMount() {
		this.loadDefaultData();
	}

	loadDefaultData = async () => {
		this.setState({ BackDrop: true });
		await axios.get("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-web-productores").then((res) => {
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
					Data: API_Response.body,
					MasterData: API_Response.body,
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
	};

	EditWindow = (Index) => {
		const SelectedData = this.state.Data[Index];
		console.log(SelectedData);
		this.setState({
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
				exportador: SelectedData.exportador,
			},
		});
	};


	TextFeildValueChanges = async (value, key) => {
		let Data = this.state.ModifiedData;
		Data[key] = value;
		await this.setState({ ModifiedData: Data });
		console.log(this.state.ModifiedData);
	};

	CheckBoxValueChanges = async (value, key) => {
		let valor 
		if(value = true){valor=1};
		//console.log(valor)
		let Data = this.state.ModifiedData;
		Data[key] = valor;
		await this.setState({ ModifiedData: Data });
		//console.log(this.state.ModifiedData);
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

		formData.append("file", data.file ? data.file : "");

		let documentJson = {
			activo: data.activo ? 1 : 0,
			direccion: data.direccion,
			facebook: data.facebook,
			fechaCreado: date,
			instagram: data.instagram,
			nombre: data.nombre,
			telephono: data.telephono,
			whatsapp: data.whatsapp,
			exportador: data.exportador ? 1 : 0,
		};

		var config = {
			method: "put",
			url: `https://siam-pra-1656956256760.azurewebsites.net/api/pracms/update-productores-aquilizar/${data.idProdctores}/${data.nombre}/${data.telephono}/${data.facebook}/${data.whatsapp}/${data.direccion}/${data.instagram}/${data.activo ? data.activo : 1}/${data.exportador ? 1 : 0}`,

			data: formData,
		};
		if (this.state.AddNew) {
			/*  formData.append("webProductores", JSON.stringify(documentJson)); */
			var config_add = {
				method: "post",
				url: `https://siam-pra-1656956256760.azurewebsites.net/api/pracms/add-productores-ingresar/${data.nombre}/${data.telephono}/${data.facebook}/${data.whatsapp}/${data.direccion}/${data.instagram}/${data.exportador ? 1 : 0}`,
				data: formData,
			};
			await axios(config_add).then((res) => {
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
					this.setState({ ModifiedData: {}, Add_Edit_window: false });
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
		} else {
			await axios(config).then((res) => {
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
					this.setState({ ModifiedData: {}, Add_Edit_window: false });
				} else {
					this.SnackbarActions({
						key: "Open",
						variant: "warning",
						Message: "API Not responding.....",
						TimeOut: 1000,
					});
				}
			});
		}
		this.loadDefaultData();
		await this.setState({ UpdateLoader: false });
	};

	CancelEditAddWindow = async () => {
		await this.setState({
			Add_Edit_window: false,
			EditInfo: false,
			ModifiedData: {},
		});
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
					<Grid item>
						<TableContainer component={Paper}>
							<Table style={{ paddingRight: 4, paddingLeft: 5 }}>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Nombre\Productor
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Teléfono
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Direccion
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Whatsapp
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Facebook
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											E-mail
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
												<TableCell align="center">{data.nombre}</TableCell>
												<TableCell align="center">{data.telephono}</TableCell>
												<TableCell align="center">{data.direccion}</TableCell>
												<TableCell align="center">{data.whatsapp}</TableCell>
												<TableCell align="center">{data.facebook}</TableCell>
												<TableCell align="center">{data.instagram}</TableCell>
												<TableCell align="center">{data.activo == 1 ? "Activo" : "Inactivo"}</TableCell>
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
					<DialogTitle>{this.state.AddNew ? "Agregar Productor" : "Editar Productor"}</DialogTitle>
					<Divider />
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant="h5"></Typography>
							</Grid>
							<Grid item xs={12}>
								<center>
									<FormControlLabel control={<Checkbox checked={this.state.ModifiedData.exportador} onChange={(e) => this.CheckBoxValueChanges(e.target.checked, "exportador")} />} label="Exportador" labelPlacement="right" />
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
										<TextField variant="outlined" defaultValue={"ND"} fullWidth value={this.state.ModifiedData.whatsapp} onChange={(e) => this.TextFeildValueChanges(e.target.value, "whatsapp")} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">facebook:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" defaultValue={"ND"} fullWidth value={this.state.ModifiedData.facebook} onChange={(e) => this.TextFeildValueChanges(e.target.value, "facebook")} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item xs={5}>
										<Typography variant="h6">E-mail:</Typography>
									</Grid>
									<Grid item xs={7}>
										<TextField variant="outlined" fullWidth defaultValue={"ND"} value={this.state.ModifiedData.instagram} onChange={(e) => this.TextFeildValueChanges(e.target.value, "instagram")} />
									</Grid>
								</Grid>
							</Grid>
							{/*   {this.state.EditInfo ? (
								<Grid item xs={12}>
									<Grid container spacing={2}>
										<Grid item xs={5}>
											<Typography variant="h6">activo:</Typography>
										</Grid>
										<Grid item xs={7}>
										 <TextField
                        variant="outlined"
                        select
                        value={this.state.ModifiedData.activo}
                        fullWidth
                        onChange={(e) =>
                          this.DropDownValueChanges(e.target.value)
                        }
                      >
												<MenuItem value={1}>Activo</MenuItem>
												<MenuItem value={0}>InActivo</MenuItem>
											</TextField>
										</Grid>
									</Grid>
								</Grid>
							) : (
								<></>
						    )} */}
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
											<TextField variant="outlined" fullWidth select /*onChange={(e) => this.TextFeildValueChanges(e.target.value,"activo")}*/ >
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
