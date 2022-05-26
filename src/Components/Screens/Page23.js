import React,{ Component } from "react";
import MuiAlert from '@mui/lab/Alert';
import {Paper,Table,TableBody,TableCell,TableHead,TablePagination,TableRow,Badge,TextField,Fab,Backdrop,
    Grid,MenuItem,Button,Snackbar, Typography} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import {CircleLoader} from "react-spinners";


const Request = require("../API_Request");

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class Page23 extends Component{
    constructor(props){
        super(props);
        this.state = {
            BackDrop: false,
            SnackBar:false, SnackBarVariant:"warning", snackBarMessage:"", SnackbarTimeOut:4000,
            Data:[
                {Nombre_Productor:"Juan Antonio Perez Gomez",Telefono: "70707070", Dirección: "ciudad merliot", WhatsApp: "70707070", Facebook: "juan.perez", Instagram: "juan.perez", Estado:"Activo"},
                {Nombre_Productor:"Juan Carlos Gomez Gome",Telefono: "70707070", Dirección: "ciudad merliot", WhatsApp: "70707070", Facebook: "juan.perez", Instagram: "juan.perez",Estado:"Activo"},
            ],
            Add_Edit_window:false,
            AddNew:false,
            EditInfo:false
        }
    }

    async componentDidMount(){
        await this.loadDefaultData();
    }

    loadDefaultData=async()=>{
        await this.setState({BackDrop:true})
        axios.get("http://qa.mag.gob.sv/PRA/api/pantallas/get-tipos-de-alertas").then(res => {
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
    
    render(){
        // const classes = useStyles();
        return(
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Mantenimiento de Certifcaciones de Productores</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        //Put Search Bar here //Put dropdown here <Button size="small" variant="outlined" color="primary">Clear Productor</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="outlined" style={{float:"right"}}>Agregar</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Nombre\Productor</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Telefono^</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Dirección</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">WhatsApp</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Facebook</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Instagram</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center">Estado</TableCell>
                                        <TableCell style={{backgroundColor:"#a4b2b0"}} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                                {this.state.Data.map((data,index)=>{
                                    return(
                                        <TableRow>
                                            <TableCell align="center">{data.Nombre_Productor}</TableCell>
                                            <TableCell align="center">{data.Telefono}</TableCell>
                                            <TableCell align="center">{data.Dirección}</TableCell>
                                            <TableCell align="center">{data.WhatsApp}</TableCell>
                                            <TableCell align="center">{data.Facebook}</TableCell>
                                            <TableCell align="center">{data.Instagram}</TableCell>
                                            <TableCell align="center">{data.Estado}</TableCell>
                                            <TableCell align="center"><Button size="small" variant="outlined" color="primary" onClick={()=>this.setState({Add_Edit_window:true,EditInfo:true,AddNew:false})}>Editar</Button></TableCell>
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