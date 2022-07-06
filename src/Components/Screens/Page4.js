import React, { Component } from "react";
import { Paper, CircularProgress, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography, IconButton, DialogActions, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { PulseLoader } from "react-spinners";
import MuiAlert from "@mui/material/Alert";
import { CancelOutlined } from "@mui/icons-material";
import { FaHourglassEnd } from "react-icons/fa";
import axios from "axios";
import Page5 from "./Page5/Page5";

const Request = require("../API_Request");

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Page4 extends Component {
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
			],
			Agregar_window: false,
		};
	}

	getData = () => {
		this.setState({ BackDrop: true });
		axios.get("https://siam-pra-1656956256760.azurewebsites.net/api/pracms/get-alertas-tempranas").then((res) => {
			let API_Response = res.data;
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
		this.setState({ BackDrop: false });
	};

	async componentDidMount() {
		this.getData();
	}

	// Alert Messages Trigger function
	SnackbarActions = (Data) => {
		if (Data.key === "Open") {
			this.setState({
				SnackBar: true,
				SnackBarVariant: Data.variant,
				snackBarMessage: Data.Message,
				SnackbarTimeOut: Data.TimeOut,
			});
		} else {
			this.setState({ SnackBar: false, SnackbarTimeOut: 10000 });
		}
	};

	modalCloseHandler = () => {
		this.setState({ Agregar_window: false });
		this.getData();
	};

	render() {
		// const classes = useStyles();
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Alertas Tempranas</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button color="primary" variant="outlined" style={{ float: "right" }} onClick={() => this.setState({ Agregar_window: true })}>
							Agregar
						</Button>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											ID Alerta
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Título
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Tipo Alerta
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Mensaje
										</TableCell>
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Destino
										</TableCell>
										{/* <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Departamento</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Municipio</TableCell> */}
										<TableCell style={{ backgroundColor: "#a4b2b0" }} align="center">
											Estado
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.Data.map((data, index) => {
										return (
											<TableRow>
												<TableCell align="center">{data.idAlertasTempranas}</TableCell>
												<TableCell align="center">{data.textoAlerta}</TableCell>
												<TableCell align="center">{data.idTipoAlerta}</TableCell>
												<TableCell align="center">{data.descript}</TableCell>
												<TableCell align="center">{data.afectacion}</TableCell>
												{/* <TableCell align="center">{data.departamento}</TableCell>
                                            <TableCell align="center">{data.municipio}</TableCell> */}
												<TableCell align="center">{data.activo === 1 ? "Activo" : "Inactivo"}</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>

				{/* <Dialog open={this.state.Agregar_window} onClose={() => this.setState({ Agregar_window: false })} fullScreen>
					<DialogTitle>
						<Grid container spacing={2}>
							<Grid item xs={11}>
								<Typography variant="h4">Mantenimiento de Alertas Tempranas</Typography>
							</Grid>
							<Grid item xs={1}>
								<IconButton style={{ float: "right" }} color="secondary" size="small" onClick={() => this.setState({ Agregar_window: false })}>
									<CancelOutlined />
								</IconButton>
							</Grid>
						</Grid>
					</DialogTitle>
					<Divider /> */}
				{/* <DialogContent>
						<Page5 modalCloseHandler={this.modalCloseHandler} />
					</DialogContent> */}
				{/* </Dialog> */}

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

				{/* Add New / Edit*/}
				<Dialog open={this.state.Agregar_window} onClose={() => this.setState({ Agregar_window: false })} fullWidth size="lg">
					{/* <DialogTitle>{this.state.AddNew ? "Agregar" : "Editar"}</DialogTitle> */}
					<Divider />
					<DialogContent>
						<div className="customModal">
							<Page5 getData={this.getData} modalCloseHandler={this.modalCloseHandler} />
						</div>
					</DialogContent>
					<DialogActions>
						{/* <Button variant="outlined" color="secondary" onClick={() => this.setState({ Agregar_window: false })}>
							Cancelar
						</Button> */}
						{/* <Button variant="outlined" onClick={() => this.Add_and_UpdateData()}>
							{this.state.UpdateLoader ? <CircularProgress style={{ height: 16, width: 16 }} /> : "Guardar"}
						</Button> */}
					</DialogActions>
				</Dialog>
			</>
		);
	}
}
