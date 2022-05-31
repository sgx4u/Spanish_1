import React, { Component } from "react";
import MuiAlert from "@mui/lab/Alert";
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Badge, TextField, Fab, Backdrop, Grid, MenuItem, Button, Snackbar, InputAdornment, Typography, Divider, DialogActions, Dialog, DialogContent, DialogTitle } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { CircleLoader } from "react-spinners";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Paises extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BackDrop: false,
			SnackBar: false,
			SnackBarVariant: "warning",
			snackBarMessage: "",
			SnackbarTimeOut: 4000,
			LeftListItems: [1, 2, 3, 4, 5],
			Checked: [],
			Dropdown: [],
			LeftList: [],
			RightList: [],
			dropdownValue: 0,
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
		await axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-productores-exportaderos").then((res) => {
			let API_Response = res.data;
			console.log(API_Response);
			if (API_Response === null || API_Response === undefined) {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			} else if (API_Response.code === "OK") {
				this.setState({ Dropdown: API_Response.body });
			} else {
				this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
			}
		});
		await this.setState({ BackDrop: false });
	};

	LoadListData = async (value) => {
		await this.setState({ BackDrop: true, dropdownValue: value });
		let [Data, Data1] = await Promise.all([
			axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-paise-no-asociados/" + value),
			// axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-detalle-no-asociados/"+value)
			axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-paise-asociados/" + value),
		]);
		Data = Data.data;
		Data1 = Data1.data;
		console.log(Data, Data1);
		if (Data.code === "OK") {
			this.setState({ LeftList: Data.body });
		} else {
			this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
		}
		if (Data1.code === "OK") {
			this.setState({ RightList: Data1.body });
		} else {
			this.SnackbarActions({ key: "Open", variant: "warning", Message: "Dropdown values are not loaded", TimeOut: 1000 });
		}
		await this.setState({ BackDrop: false });
	};

	CheckBoxAction = async (Type, value, Index) => {
		if (Type === "Left") {
			let Data = this.state.LeftList;
			Data[Index].checked = value;
			await this.setState({ LeftList: Data });
		} else {
			let Data = this.state.RightList;
			Data[Index].checked = value;
			await this.setState({ RightList: Data });
		}
	};

	// onClick={()=>this.MoveData("ToRight")}

	MoveData = async (type) => {
		if (type === "ToRight") {
			let LL = this.state.LeftList;
			let Data = [];
			let RightList = this.state.RightList;
			for (let i = 0; i < this.state.LeftList.length; i++) {
				if (this.state.LeftList[i].checked) {
					let Obj = this.state.LeftList[i];
					Obj.checked = false;
					Data.push(Obj);
					LL.splice(i, 1);
				}
			}
			RightList = RightList.concat(Data);
			await this.setState({ RightList: RightList, LeftList: LL });
		} else {
			let RL = this.state.RightList;
			let Data = [];
			let LeftList = this.state.LeftList;
			for (let i = 0; i < this.state.RightList.length; i++) {
				if (this.state.RightList[i].checked) {
					let Obj = this.state.RightList[i];
					Obj.checked = false;
					Data.push(Obj);
					RL.splice(i, 1);
				}
			}
			LeftList = LeftList.concat(Data);
			await this.setState({ LeftList: LeftList, RightList: RL });
		}
		console.log(this.state.LeftList);
		console.log(this.state.RightList);
	};

	SaveData = async () => {
		await this.setState({ BackDrop: true });
		let codePais = [];
		for (let i = 0; i < this.state.RightList.length; i++) {
			codePais.push(this.state.RightList[i].codePais);
		}
		let reqData = {
			idProductores: this.state.dropdownValue,
			paises: codePais,
		};
		const config = { headers: { "content-type": "application/json" } };
		await axios
			.post("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-productores-paises-ingresar", reqData, config)
			.then((res) => {
				let API_Response = res.data;
				console.log(API_Response);
				if (API_Response === null || API_Response === undefined) {
					this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
				} else if (API_Response.code === "OK") {
					this.setState({ Add_Edit_window: false, nombre: "", SelectedFile: null, SelectedFileName: null });
					this.loadDefaultData();
				} else {
					this.SnackbarActions({ key: "Open", variant: "warning", Message: "API Not responding.....", TimeOut: 1000 });
				}
			})
			.catch((error) => {
				console.log(error);
			});
		await this.setState({ BackDrop: false });
	};

	render() {
		// const classes = useStyles();
		return (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={4}>
								<TextField fullWidth select value={this.state.dropdownValue} onChange={(e) => this.LoadListData(e.target.value)}>
									<MenuItem value={0}>Selecciones un Productor</MenuItem>
									{this.state.Dropdown.map((data, Index) => {
										return (
											<MenuItem key={"MIK" + Index} value={data.idProductores}>
												{data.nombre}
											</MenuItem>
										);
									})}
								</TextField>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						{/* <Grid container spacing={2} justifyContent="center" alignItems="center"> */}
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								{/* //* Edited - Subhajit Ghosh */}
								<Paper sx={{ width: 200, height: 400 }} style={{ display: "flex", flexDirection: "column" }}>
									<center>
										<Typography>Certifcaciones no Asociados</Typography>
									</center>
									{/* <Divider/> */}
									{/* //* Edited - Subhajit Ghosh */}
									<List dense={true} component="div" role="list" style={{ overflow: "auto" }}>
										{this.state.LeftList.map((data, Index) => {
											// const labelId = `transfer-list-item-${data.nombre+Index}-label`;
											return (
												<>
													<Divider />
													<ListItem
														key={data.pais + Index}
														role="listitem"
														// button
														onClick={() => this.CheckBoxAction("Left", data.checked ? false : true, Index)}
													>
														<ListItemIcon>
															<Checkbox
																checked={data.checked}
																// tabIndex={-1}
																// inputProps={{
																//     'aria-labelledby': labelId,
																// }}
															/>
														</ListItemIcon>
														<ListItemText primary={data.pais} />
													</ListItem>
												</>
											);
										})}
										<ListItem />
									</List>
								</Paper>
							</Grid>
							<Grid item>
								<Grid container direction="column" alignItems="center">
									<Button
										sx={{ my: 0.5 }}
										variant="outlined"
										size="small"
										onClick={() => this.MoveData("ToRight")}
										// disabled={leftChecked.length === 0}
										aria-label="move selected right"
									>
										&gt;
									</Button>
									<Button
										sx={{ my: 0.5 }}
										variant="outlined"
										size="small"
										onClick={() => this.MoveData("ToLeft")}
										// disabled={rightChecked.length === 0}
										aria-label="move selected left"
									>
										&lt;
									</Button>
								</Grid>
							</Grid>
							<Grid item>
								{/* //* Edited - Subhajit Ghosh */}
								<Paper sx={{ width: 200, height: 400 }} style={{ display: "flex", flexDirection: "column" }}>
									{/* <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}> */}
									<center>
										<Typography>Certifcaciones Asociados</Typography>
									</center>
									{/* <Divider/> */}
									{/* //* Edited - Subhajit Ghosh */}
									<List dense component="div" role="list" style={{ overflow: "auto" }}>
										{this.state.RightList.map((data, Index) => {
											const labelId = `transfer-list-item-${data.pais + Index}-label`;
											return (
												<>
													<Divider />
													<ListItem
														key={data.pais + Index}
														role="listitem"
														// button
														onClick={() => this.CheckBoxAction("Right", data.checked ? false : true, Index)}
													>
														<ListItemIcon>
															<Checkbox
																checked={data.checked}
																// tabIndex={-1}
																// inputProps={{
																//     'aria-labelledby': labelId,
																// }}
															/>
														</ListItemIcon>
														<ListItemText primary={data.pais} />
													</ListItem>
												</>
											);
										})}
										<ListItem />
									</List>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} />
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={6} sm={2}>
								{this.state.LeftList.length > 0 || this.state.RightList.length > 0 ? (
									<Button variant="outlined" color="secondary" onClick={() => this.setState({ LeftList: [], RightList: [], dropdownValue: "" })}>
										Cancelar
									</Button>
								) : (
									<></>
								)}
							</Grid>
							<Grid item xs={6} sm={2}>
								{this.state.RightList.length > 0 ? (
									<Button variant="outlined" onClick={() => this.SaveData()}>
										Guardar
									</Button>
								) : (
									<></>
								)}
							</Grid>
						</Grid>
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
