import * as React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, useScrollTrigger, Box, Container, Slide, MenuItem, Menu, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Button, CircularProgress, TextField, Divider, SwipeableDrawer, List, ListItem, ListItemText, ListItemIcon, Collapse } from "@mui/material";
import Scrollbar from "react-scrollbars-custom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { PostAddRounded, ExpandLess, ExpandMore, TrendingUpRounded, BarChartRounded, ReceiptRounded, SettingsApplicationsRounded, DashboardRounded } from "@mui/icons-material";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import { BsList } from "react-icons/bs";
import Drawer from "@mui/material/Drawer";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { GoNote, GoQuestion } from "react-icons/go";
import { GiReturnArrow, GiArtificialIntelligence } from "react-icons/gi";
import { GrTest } from "react-icons/gr";
import { MdVerifiedUser, MdArrowForward } from "react-icons/md";
import { FaSitemap, FaOpencart, FaRegBuilding, FaArrowRight } from "react-icons/fa";

import { useState, useEffect } from "react";
import axios from "axios";

import Page1 from "./Screens/Page1";
import Page2 from "./Screens/Page2";
import Page3 from "./Screens/Page3";
import Page4 from "./Screens/Page4";
import Page5 from "./Screens/Page5/Page5"; // It contains page 5 to 8
import Page9 from "./Screens/Page9";
import Page10 from "./Screens/Page10";
import Page11 from "./Screens/Page11";
import Page12 from "./Screens/Page12";
import Page13 from "./Screens/Page13"; // It contains 14 also
import Page15 from "./Screens/Page15";
import Page16 from "./Screens/Page16";
import Page17 from "./Screens/Page17";
import Page18 from "./Screens/Page18";
import Page19 from "./Screens/Page19";
import Page20 from "./Screens/Page20";
import Page21 from "./Screens/Page21"; // page 21 to 30
import Page31 from "./Screens/Page31"; // till page-33
import Page37 from "./Screens/Page37";
import Page38 from "./Screens/Page38";

function HideOnScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}
HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

export default function MainPage(props) {
	let Page = <Page1 />; //<h1>Sample Testing Page</h1>//<ProductEnquiries/>;//<ClientDetails/>; //<TSEnquiries/>//

	const [SelectedPage, SetSelectedPage] = useState(Page);
	const [selectedMenu, SetSelectedMenu] = useState();
	const [anchorEl, setAnchorEl] = useState(null);
	const [state, setState] = useState({
		left: false,
	});

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const toggleDrawer = (anchor, open) => (event) => {
		setState({ ...state, [anchor]: open });
	};

	const firstPage = () => {
		for (let a = 0; a < props.filterPages.length; a++) {
			switch (props.filterPages[a]) {
				case "Categorías": {
					SetSelectedMenu("Tipos_de_Alerta");
					break;
				}
				case "Alertas Tempranas": {
					SetSelectedMenu("Alertas_Tempranas");
					break;
				}
				case "Cadenas Productivas": {
					SetSelectedMenu("Tipos_de_Información");
					break;
				}
				case "Noticias": {
					SetSelectedMenu("Detalle_de_Información");
					break;
				}
				case "Comentarios y sugerencias": {
					SetSelectedMenu("Sugerencias");
					break;
				}
				case "Usuarios App": {
					SetSelectedMenu("Usuarios_App");
					break;
				}
				case "Usuarios CMS": {
					SetSelectedMenu("Usuarios Web");
					break;
				}
				case "Directorio de Productores": {
					SetSelectedMenu("Directorio de Productores");
					break;
				}
				case "Certificaciones de Productores": {
					SetSelectedMenu("Certificaciones");
					break;
				}
				case "Precios Internacionales": {
					SetSelectedMenu("PreciosInternacionales");
					break;
				}
				case "Informes de Precios": {
					SetSelectedMenu("InformesdePrecios");
					break;
				}
			}
			return;
		}
	};

	useEffect(() => {
		firstPage();
	}, []);

	const DrawerContent = (
		<>
			<Toolbar style={{ backgroundColor: "#d7efd2" }}>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography
							variant="h6"
							style={{
								color: "white",
								marginTop: 8,
								float: "left",
								color: "black",
							}}
						>
							Menú
						</Typography>
						<IconButton
							style={{ outline: "none", float: "right", marginRight: 0 }}
							color="inherit"
							aria-label="open drawer"
							// onClick={handleDrawerClose}
							onClick={toggleDrawer("left", false)}
							edge="start"
						>
							<CloseRounded />
						</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
			<Divider />
			<Scrollbar style={{ width: 250 }}>
				<List style={{ width: 250 }}>
					{props.filterPages.find((info) => info === "Categorías") && (
						<div>
							<ListItem
								style={{
									backgroundColor: selectedMenu === "Tipos_de_Alerta" ? "#d7efd2" : "",
								}}
								button
								key="Tipos_de_Alerta"
								onClick={() => SetSelectedMenu("Tipos_de_Alerta")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Categorías" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Alertas Tempranas") && (
						<div>
							<ListItem
								style={{
									backgroundColor: selectedMenu === "Alertas_Tempranas" ? "#d7efd2" : "",
								}}
								button
								key="Alertas_Tempranas"
								onClick={() => SetSelectedMenu("Alertas_Tempranas")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Alertas Tempranas" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Cadenas Productivas") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "Tipos_de_Información" ? "#d7efd2" : "",
								}}
								key="Tipos_de_Información"
								onClick={() => SetSelectedMenu("Tipos_de_Información")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Cadenas Productivas" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Noticias") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "Detalle_de_Información" ? "#d7efd2" : "",
								}}
								key="Detalle_de_Información"
								onClick={() => SetSelectedMenu("Detalle_de_Información")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Noticias" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Comentarios y sugerencias") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "Sugerencias" ? "#d7efd2" : "",
								}}
								key="Sugerencias"
								onClick={() => SetSelectedMenu("Sugerencias")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Comentarios y sugerencias" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Usuarios App") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "Usuarios_App" ? "#d7efd2" : "",
								}}
								key="Usuarios_App"
								onClick={() => SetSelectedMenu("Usuarios_App")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Usuarios App" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Usuarios CMS") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "Usuarios Web" ? "#d7efd2" : "",
								}}
								key="Usuarios Web"
								onClick={() => SetSelectedMenu("Usuarios Web")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Usuarios CMS" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Directorio de Productores") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "Directorio de Productores" ? "#d7efd2" : "",
								}}
								key="Directorio de Productores"
								onClick={() => SetSelectedMenu("Directorio de Productores")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Directorio de Productores" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Certificaciones de Productores") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "Certificaciones" ? "#d7efd2" : "",
								}}
								key="Certificaciones"
								onClick={() => SetSelectedMenu("Certificaciones")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Certificaciones de Productores" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Precios Internacionales") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "PreciosInternacionales" ? "#d7efd2" : "",
								}}
								key="PreciosInternacionales"
								onClick={() => SetSelectedMenu("PreciosInternacionales")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Precios Internacionales" />
							</ListItem>
							<Divider />
						</div>
					)}
					{props.filterPages.find((info) => info === "Informes de Precios") && (
						<div>
							<ListItem
								button
								style={{
									backgroundColor: selectedMenu === "InformesdePrecios" ? "#d7efd2" : "",
								}}
								key="InformesdePrecios"
								onClick={() => SetSelectedMenu("InformesdePrecios")}
							>
								<ListItemIcon>
									<MdArrowForward style={{ height: "30", width: "30" }} />
								</ListItemIcon>
								<ListItemText primary="Informes de Precios" />
							</ListItem>
							<Divider />
						</div>
					)}
				</List>
			</Scrollbar>
		</>
	);

	// Pages Integration
	const SelectedMenu = async (Menu) => {
		// Alert(Menu)
		switch (Menu) {
			case "Tipos_de_Alerta":
				SetSelectedPage(<Page1 />);
				break;
			case "Alertas_Tempranas":
				SetSelectedPage(<Page4 />);
				break;
			case "Tipos_de_Información":
				SetSelectedPage(<Page9 />); //10,11
				break;
			case "Detalle_de_Información":
				SetSelectedPage(<Page12 />); //13,14
				break;
			case "Sugerencias":
				SetSelectedPage(<Page15 />);
				break;
			case "Usuarios_App":
				SetSelectedPage(<Page16 />); //17
				break;
			case "Usuarios Web":
				SetSelectedPage(<Page18 />); // 19,20
				break;
			case "Directorio de Productores":
				SetSelectedPage(<Page21 />); // 21 to 30
				break;
			case "Certificaciones":
				SetSelectedPage(<Page31 />); // 31 to 33
				break;
			case "PreciosInternacionales":
				SetSelectedPage(<Page37 />);
				break;
			case "InformesdePrecios":
				SetSelectedPage(<Page38 />);
				break;
			default:
				await SetSelectedPage(<h1>Default Page here.....</h1>);
				break;
		}
		await setState({ left: false });
		// await SetSelectedMenu(Menu);
	};

	useEffect(() => {
		SelectedMenu(selectedMenu);
	}, [selectedMenu]);

	return (
		<React.Fragment>
			<HideOnScroll {...props}>
				<AppBar style={{ backgroundColor: "#d7efd2" }} color="inherit">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							// sx={{ mr: 2 }}
							onClick={toggleDrawer("left", true)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							SIAM CMS
						</Typography>
						<button onClick={() => props.setSuccess(false)} className="Logout_Main">
							SALIR
						</button>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar />
			<Container>
				<Box sx={{ my: 2 }}>{SelectedPage}</Box>
			</Container>

			<SwipeableDrawer
				anchor={"left"}
				open={state["left"]}
				onClose={toggleDrawer("left", false)}
				onOpen={toggleDrawer("left", true)}
				sx={{
					display: { xs: "block", sm: "none" },
				}}
			>
				{DrawerContent}
			</SwipeableDrawer>
			<Drawer
				anchor={"left"}
				open={state["left"]}
				onClose={toggleDrawer("left", false)}
				onOpen={toggleDrawer("left", true)}
				sx={{
					display: { xs: "none", sm: "block" },
				}}
			>
				{DrawerContent}
			</Drawer>
		</React.Fragment>
	);
}
