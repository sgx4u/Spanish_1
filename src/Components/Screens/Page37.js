import React,{ Component } from "react";
import MuiAlert from '@mui/lab/Alert';
import {Paper,Table,TableBody,TableCell,TableHead,TablePagination,TableRow,Badge,TextField,Fab,Backdrop,
    Grid,MenuItem,Button,Snackbar, Typography,DialogActions,Dialog,DialogContent,DialogTitle,Divider, CircularProgress} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import {CircleLoader} from "react-spinners";
import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Page31 extends Component{
    constructor(props){
        super(props);
        this.state = {
            BackDrop: false,
            SnackBar:false, SnackBarVariant:"warning", snackBarMessage:"", SnackbarTimeOut:4000,
            Data:[],
            DropdownData:[],
            ModifiedData:{},
            SelectedFile:null,
            SelectedFileName:""

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

    // async componentDidMount(){
    //     this.loadDefaultData();
    // }

    // loadDefaultData=async()=>{
    //     await this.setState({BackDrop:true})
    //     await axios.get("http://qa.mag.gob.sv/PRA/api/pantallas/get-tipo-precios").then(res => {
    //         let API_Response = res.data;
    //         console.log(API_Response)
    //         if(API_Response === null || API_Response === undefined){
    //             this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
    //         }else if(API_Response.code==="OK"){
    //             this.setState({DropdownData:API_Response.body});
    //         }else{
    //             this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
    //         }
    //     })
    //     await this.setState({BackDrop:false})
    // }
    // TextFeildValueChanges=async(value, key)=>{
    //     let Data = this.state.ModifiedData;
    //     Data[key]= value;
    //     await this.setState({ModifiedData:Data});
    //     console.log(this.state.ModifiedData);
    // }

    SaveData=async()=>{
        await this.setState({BackDrop:true})
        const formData = new FormData();
        if(this.state.SelectedFileName!==null){
            formData.append('file', this.state.SelectedFile);
        }
        const config = {headers: {'content-type': 'multipart/form-data'}}
        await axios.post("http://qa.mag.gob.sv/PRA/api/pantallas/add-precios-internacional",formData,config).then(res => {
            let API_Response = res.data;
            console.log(API_Response)
            if(API_Response === null || API_Response === undefined){
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }else if(API_Response.code==="OK"){
                // this.SnackbarActions({key:"Open",variant:"success",Message:"Uploaded!",TimeOut:1000});
                this.setState({SelectedFileName:"",SelectedFile:null})
            }else{
                this.SnackbarActions({key:"Open",variant:"warning",Message:"API Not responding.....",TimeOut:1000});
            }
        }).catch(error => {
            console.log(error);
        });
        await this.setState({BackDrop:false})
    }
    
    onChangeFiles=async(e)=>{
        console.log(e.target.files)
        if(e.target.files.length>0){
            // var allowedExtensions =  /(\.csv)$/i;
            // var filePath = e.target.files[0].name;
            // console.log(filePath)
            // if (!allowedExtensions.exec(filePath)) {
            //     this.SnackbarActions({key:"Open",variant:"warning",Message:"Please Select CSV file.....",TimeOut:1000});
            // }else{
                await this.setState({
                    SelectedFile: e.target.files[0],
                    SelectedFileName: e.target.files[0].name
                })
            // }
        }
    }
    
    render(){
        // const classes = useStyles();
        return(
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Subir Archivo de Precios Internacionales</Typography>
                    </Grid>

                        {/* <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <Typography variant="h6">Tipo de Precio:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField variant="outlined" select fullWidth value={this.state.ModifiedData.nombre} onChange={(e)=>this.DropDownValueChanges(e.target.value)}>
                                        <MenuItem>Select</MenuItem>
                                        {this.state.DropdownData.map((data,Index)=>{
                                            return(
                                                <MenuItem key={"MI"+Index} value={data.idTipoPrecio}>{data.nombre}</MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <Typography variant="h6">Título:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField variant="outlined" value={this.state.ModifiedData.Title} fullWidth onChange={(e)=>this.TextFeildValueChanges(e.target.value, "Título")}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <Typography variant="h6">Descripción:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField variant="outlined" multiline value={this.state.ModifiedData.Description} fullWidth onChange={(e)=>this.TextFeildValueChanges(e.target.value, "Descripción")}/>
                                </Grid>
                            </Grid>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <Typography variant="h6">Subir Archivo:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField variant="outlined" id="FileElement" fullWidth type="file" onChange={(e)=>this.onChangeFiles(e)}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}/>
                    <Grid item xs={12}>
                        <center><Button color="primary" variant="outlined" onClick={()=>this.SaveData()}>Guardar</Button></center>
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