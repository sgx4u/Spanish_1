import React,{ Component } from "react";
import MuiAlert from '@mui/lab/Alert';
import {Box,Tab} from '@mui/material';
import {TabContext,TabList,TabPanel} from '@mui/lab';

import GeneralMainPage from "./Page21Files/General/GeneralMainPage"; // page-21 to page-25
import ProductsMainPage from "./Page21Files/General/ProductsMainPage"; // page-26
import CertificationMainPage from "./Page21Files/General/CertificationMainPage"; // page-17 to 30
import Paises from "./Page21Files/General/Paises"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Page21 extends Component{
    constructor(props){
        super(props);
        this.state = {
            BackDrop: false,
            SnackBar:false, SnackBarVariant:"warning", snackBarMessage:"", SnackbarTimeOut:4000,
            SelectedTab:"General",
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

    async SelectedTabValueChanges(event, newValue){
        await this.setState({SelectedTab:newValue});
    };
    
    render(){
        // const classes = useStyles();
        return(
            <>
                <TabContext value={this.state.SelectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={this.SelectedTabValueChanges.bind(this)} aria-label="lab API tabs example">
                            <Tab label="General" value="General" />
                            <Tab label="Productos" value="Productos" />
                            <Tab label="Certificaciones" value="Certificaciones" />
                            <Tab label="Países" value="Paises" />
                        </TabList>
                    </Box>
                    <TabPanel value="General"><GeneralMainPage/></TabPanel>
                    <TabPanel value="Productos"><ProductsMainPage/></TabPanel>
                    <TabPanel value="Certificaciones"><CertificationMainPage/></TabPanel>
                    <TabPanel value="Paises"><Paises/></TabPanel>
                </TabContext>
            </>
        )
    }
}
