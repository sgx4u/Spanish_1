import React, { Component } from "react";
import MuiAlert from "@mui/lab/Alert";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, Typography, FormControlLabel, Checkbox } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { CircleLoader } from "react-spinners";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Page17 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "",
			SnackbarTimeOut: 4000,
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

	render() {
		// const classes = useStyles();
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Mantenimiento de Usuario del APP</Typography>
					</Grid>
					<Grid item xs={12} />
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography>Nombre de Usuario del App:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
							<Grid item xs={12} sm={7}>
								<center>
									<FormControlLabel control={<Checkbox />} label="Aprobar Usuario App" />
								</center>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">DUI:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">NIT:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Dirección:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Departamento:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Municipio:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Tipo Persona:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Razón Social:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Correo Electrónico:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Clave:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Celular:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Longitud:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Latitud:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={5} sm={2}>
								<Typography variant="h6">Fecha de Registro:</Typography>
							</Grid>
							<Grid item xs={7} sm={3}>
								<TextField fullWidth />
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} />
					<Grid item xs={12}>
						<Button variant="outlined">Guardar</Button>
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
