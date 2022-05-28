import React, { Component } from "react";
import MuiAlert from "@mui/lab/Alert";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography, Checkbox, Label } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { CircleLoader } from "react-spinners";
import axios from "axios";
import CustomCheckBox from "../helperUi/CustomCheckBox";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let flag = 1;
export default class Page15 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			isChecked: false,
			snackBarMessage: "",
			isReRender: false,
			SnackbarTimeOut: 4000,
			Data: [
				{
					Correo_Electrónico: "carlos.ponce@gmail.com",
					Comentario: "comentario 1",
					ID_Usuario: 23,
				},
				{
					Correo_Electrónico: "pepe.ponce@gmail.com",
					Comentario: "comentario 2",
					ID_Usuario: 28,
				},
				{
					Correo_Electrónico: "carlos.peñate@gmail.com",
					Comentario: "comentario 3",
					ID_Usuario: 3,
				},
				{
					Correo_Electrónico: "dodo.caramelo19@gmail.com",
					Comentario: "comentario 4",
					ID_Usuario: 2,
				},
			],
			FilterData: [],
			SelectedDropdownValue: 1,
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

	componentDidMount() {
		this.loadDefaultData();
	}

	loadDefaultData = async () => {
		await this.setState({ BackDrop: true });
		// await axios.post("http://qa.mag.gob.sv/PRA/api/pantallas/add-Detalle-de-Informacion/"+data.idInformacion+"/"+data.nombreInformacionDetalle+"/"+data.descripcion+"/"+data.link+"/"+data.idTipoAlerta,formData,config).then(res => {
		//     let API_Response = res.data;
		//     console.log(API_Response)
		//     if(API_Response === null || API_Response === undefined){
		//         this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
		//     }else if(API_Response.code==="OK"){
		//         this.setState({Add_Edit_window:false,SelectedData:{}});
		//         this.loadDefaultData();
		//     }else{
		//         this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
		//     }
		// }).catch(error => {
		//     console.log(error);
		// });
		// await axios.post("http://qa.mag.gob.sv/PRA/api/pantallas/add-Detalle-de-Informacion/"+data.idInformacion+"/"+data.nombreInformacionDetalle+"/"+data.descripcion+"/"+data.link+"/"+data.idTipoAlerta,formData,config).then(res => {
		//     let API_Response = res.data;
		//     console.log(API_Response)
		//     if(API_Response === null || API_Response === undefined){
		//         this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
		//     }else if(API_Response.code==="OK"){
		//         this.setState({Add_Edit_window:false,SelectedData:{}});
		//         this.loadDefaultData();
		//     }else{
		//         this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
		//     }
		// }).catch(error => {
		//     console.log(error);
		// });
		let [DefaultData, FilterData] = await Promise.all([axios.get("http://qa.mag.gob.sv/PRA/api/pantallas/get-Sugerencias/1"), axios.get("http://qa.mag.gob.sv/PRA/api/pantallas/get-filtro-Sugerencias")]);
		DefaultData = DefaultData.data;
		FilterData = FilterData.data;
		console.log(DefaultData, FilterData);
		if (DefaultData.code === "OK") {
			this.setState({ Data: DefaultData.body });
		} else {
			this.SnackbarActions({
				key: "Open",
				variant: "warning",
				Message: "API Not responding.....",
				TimeOut: 1000,
			});
		}
		if (FilterData.code === "OK") {
			this.setState({ FilterData: FilterData.body });
		} else {
			this.SnackbarActions({
				key: "Open",
				variant: "warning",
				Message: "Dropdown values are not loaded",
				TimeOut: 1000,
			});
		}
		await this.setState({ BackDrop: false });
	};

	DropdownloadData = async (value) => {
		this.setState({ SelectedDropdownValue: value });
		await axios
			.get("http://qa.mag.gob.sv/PRA/api/pantallas/get-Sugerencias/" + value)
			.then((res) => {
				this.setState({ BackDrop: true });
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
				this.setState({ BackDrop: false });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	checkBoxHandler = async (idSugerencia, leido) => {
		try {
			const result = await axios.put(`http://qa.mag.gob.sv/PRA/api/pantallas/update-sugerencia-actualizar/${idSugerencia}/${leido}`);

			this.setState({ isReRender: !this.state.isReRender });
		} catch (error) {
			console.log(error);
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.isReRender !== prevState.isReRender) {
			console.log("Update work");
			this.DropdownloadData(this.state.SelectedDropdownValue);
		}
	}

	render() {
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Mantenimiento de Sugerencias</Typography>
					</Grid>
					<Grid item xs={6}>
						<Grid item xs={12} sm={6}>
							<TextField select value={this.state.SelectedDropdownValue} fullWidth onChange={(e) => this.DropdownloadData(e.target.value)}>
								{this.state.FilterData.map((data, index) => {
									return (
										<MenuItem key={"MI" + index} value={data.idEstado}>
											{data.nombre}
										</MenuItem>
									);
								})}
							</TextField>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						{/* <Button color="primary" variant="outlined" style={{float:"right"}}>Agregar Detalle Información</Button> */}
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Sugerencia
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Correo Electrónico
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Comentario
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Usuario
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Marcar como leída
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.Data.length > 0 ? (
										this.state.Data.map((data, index) => (
											<TableRow>
												<TableCell align="center">{data.idSugerencia}</TableCell>
												<TableCell align="center">{data.correoElectronico}</TableCell>
												<TableCell align="center">{data.comentario}</TableCell>
												<TableCell align="center">{data.idUsuario}</TableCell>
												<TableCell align="center">
													{data.leido === 1 && <CustomCheckBox onClick={() => this.checkBoxHandler(data.idSugerencia, this.state.SelectedDropdownValue)} value={false} />}
													{data.leido === 2 && <CustomCheckBox onClick={() => this.checkBoxHandler(data.idSugerencia, this.state.SelectedDropdownValue)} value={true} />}
													{/* <Checkbox
                            onClick={() =>
                              this.checkBoxHandler(
                                data.idSugerencia,
                                this.state.SelectedDropdownValue
                              )
                            }
                          /> */}
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={5} align="center">
												<b>********* No hay datos disponibles *********</b>
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
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
					<CircleLoader color="white" size={100} />
				</Backdrop>
			</>
		);
	}
}
