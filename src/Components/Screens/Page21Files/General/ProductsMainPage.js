import React,{ Component } from "react";
import MuiAlert from '@mui/lab/Alert';
import {Paper,Table,TableBody,TableCell,TableHead,TablePagination,TableRow,Badge,TextField,Fab,Backdrop,
    Grid,MenuItem,Button,Snackbar, InputAdornment, Typography, Divider, DialogActions,Dialog,DialogContent,DialogTitle} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import {CircleLoader} from "react-spinners";
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class ProductsMainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            BackDrop: false,
            SnackBar:false, SnackBarVariant:"warning", snackBarMessage:"", SnackbarTimeOut:4000,
            Data:[],
            Dropdown1:[],
            Dropdown2:[],
            Dropdown3:[],
            Cantidad:0,Peso:""
        }
    }

    // Alert Messages Trigger function
    SnackbarActions = async(Data) =>{
        if(Data.key === "Open"){
            await this.setState({
                SnackBar: true,
                SnackBarVariant: Data.variant,
                snackBarMessage: Data.Message,
                SnackbarTimeOut: Data.TimeOut
            });
        }else{
            await this.setState({SnackBar: false,SnackbarTimeOut: 10000});
        }
    }

    async componentDidMount(){
        this.loadDefaultData();
    }

    loadDefaultData=async()=>{
        await this.setState({BackDrop:true})
        let [Data, Data1] = await Promise.all([
            axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-productores-lista"),
            axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/categoris_lista")
        ]);
        Data=Data.data;
        Data1=Data1.data;
        console.log(Data, Data1)
        if(Data.code==="OK"){
            this.setState({Dropdown1:Data.body});
        }else{
            this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
        }
        if(Data1.code==="OK"){
            this.setState({Dropdown2:Data1.body});
        }else{
            this.SnackbarActions({key:"Open",variant:"warning",Message:"Dropdown values are not loaded",TimeOut:1000});
        }
        await this.setState({BackDrop:false})
    }

    loaddropdown3=async(value)=>{
        await this.setState({BackDrop:true,dropdown2Value:value})
        await axios.get("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-detalle-productos-categoria/"+value).then(res => {
            let API_Response = res.data;
            console.log(API_Response)
            if(API_Response === null || API_Response === undefined){
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }else if(API_Response.code==="OK"){
                this.setState({Dropdown3:API_Response.body});
            }else{
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }
        })
        await this.setState({BackDrop:false})
    }

    // Products dropdowns
    // 1=>https://siam-mag-dev.azurewebsites.net/api/pantallas/get-productores-lista
    // 2=>https://siam-mag-dev.azurewebsites.net/api/pantallas/categoris_lista
    // 3=>https://siam-mag-dev.azurewebsites.net/api/pantallas/get-detalle-productos-categoria/'string'(2nd API)
    // Save API Not there
    // Default page load API is not there(not need to show at the time of page load)
    // Delete API Not there
    
    AddData=async()=>{
        await this.setState({BackDrop:true})
        let Cantidad = parseInt(this.state.Cantidad)
        await axios.post("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-Detalle-productores-ingresar/"+this.state.dropdown1Value+"/"+this.state.dropdown3Value+"/"+Cantidad+"/"+this.state.Peso).then(res => {
            let API_Response = res.data;
            console.log(API_Response)
            if(API_Response === null || API_Response === undefined){
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }else if(API_Response.code==="OK"){
                this.setState({Data:API_Response.body});
            }else{
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }
        })
        await this.setState({BackDrop:false})
    }
    DeleteData=async(idProductores)=>{
        await this.setState({BackDrop:true})
        await axios.post("https://siam-mag-dev.azurewebsites.net/api/pantallas/get-Detalle-productores-actualizar/"+idProductores).then(res => {
            let API_Response = res.data;
            console.log(API_Response)
            if(API_Response === null || API_Response === undefined){
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }else if(API_Response.code==="OK"){
                this.setState({Data:API_Response.body});
            }else{
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }
        })
        await this.setState({BackDrop:false})
    }
    ClearData=async()=>{
        await this.setState({
            dropdown3Value:"Selecciona Producto",
            dropdown2Value:"Selecciona Categoría de Productos",
            dropdown1Value:"Selecciona Productor",
            Cantidad:0, Peso:""
        })
    }
    
    render(){
        // const classes = useStyles();
        return(
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth select defaultValue={"Selecciona Productor"} value={this.state.dropdown1Value} onChange={(e)=>this.setState({dropdown1Value:e.target.value})}>
                                <MenuItem value={"Selecciona Productor"}>Selecciona Productor</MenuItem>
                                    {this.state.Dropdown1.map((data,Index)=>{
                                        return(
                                            <MenuItem key={"1MIN"+Index} value={data.idProdctores}>{data.nombre}</MenuItem>
                                        )
                                    })}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth select defaultValue={"Selecciona Categoría de Productos"} value={this.state.dropdown2Value} onChange={(e)=>this.loaddropdown3(e.target.value)}>
                                    <MenuItem value={"Selecciona Categoría de Productos"}>Selecciona Categoría de Productos</MenuItem>
                                    {this.state.Dropdown2.map((data,Index)=>{
                                        return(
                                            <MenuItem key={"2MIN"+Index} value={data.nombre}>{data.nombre}</MenuItem>
                                        )
                                    })}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth select defaultValue={"Selecciona Producto"} value={this.state.dropdown3Value} onChange={(e)=>this.setState({dropdown3Value:e.target.value})}>
                                        <MenuItem value={"Selecciona Producto"}>Selecciona Producto</MenuItem>
                                        {this.state.Dropdown3.map((data,Index)=>{
                                            return(
                                                <MenuItem key={"3MIN"+Index} value={data.idProducto}>{data.nombre}</MenuItem>
                                            )
                                        })}
                                    {/* // :
                                    //     <MenuItem key={"2MIN"+Index} value="Empty">Empty</MenuItem>
                                    // } */}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="Cantidad" value={this.state.Cantidad} onChange={(e)=>this.setState({Cantidad:e.target.value})} type="number"/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField fullWidth label="Capacidad de Producción" value={this.state.Peso} onChange={(e)=>this.setState({Peso:e.target.value})}/>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Button variant="outlined" style={{marginTop:10,float:"right"}} onClick={()=>this.AddData()}>Guardar</Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Button variant="outlined" color="secondary" style={{marginTop:10,float:"right"}} onClick={()=>this.ClearData()}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Producto</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">cantidad</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">peso</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                                {this.state.Data.map((data,index)=>{
                                    return(
                                        <TableRow>
                                            <TableCell align="center">{data.nombre}</TableCell>
                                            <TableCell align="center">{data.produccionCantidad}</TableCell>
                                            <TableCell align="center">{data.produccionPeso}</TableCell>
                                            <TableCell align="center"><Button size="small" variant="outlined" color="primary" onClick={()=>this.DeleteData(data.idProductores)}>Eliminar</Button></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

                
                {/* Alert Messages */}
                <Snackbar open={this.state.SnackBar} autoHideDuration={this.state.SnackbarTimeOut} onClose={()=>this.SnackbarActions({key:"Close",variant:"warning"})} anchorOrigin={{vertical: 'top',horizontal: 'center'}}>
                    <Alert onClose={()=>this.SnackbarActions({key:"Close"})} severity={this.state.SnackBarVariant} variant="filled">
                        {this.state.snackBarMessage}
                    </Alert>
                </Snackbar>

                {/* Backdrop When Data Loading */}
                <Backdrop style={{zIndex: 2, color: '#fff'}} open={this.state.BackDrop}>
                    <CircleLoader color="white" size={100}/>
                </Backdrop>
            </>
        )
    }
}