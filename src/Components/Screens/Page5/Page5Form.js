import React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Grid, MenuItem, Button, Typography, Select } from "@mui/material";

import Option2 from "./Option2";
import axios from "axios";

const Page5Form = ({ DropDowns, modalCloseHandler }) => {
	const [tipoDeAlerta, setTipoDeAlerta] = React.useState("");
	const [textoAlerta, setTextoAlerta] = React.useState("");
	const [DescripciónDeAlerta, setDescripciónDeAlerta] = React.useState("");
	const [afectacion, setAfectacion] = React.useState("Afecta a todo el País");
	const handleChange = (event) => {
		setTipoDeAlerta(event.target.value);
	};

	const handleChangeRadio = (e) => {
		setAfectacion(e.target.value);
	};

	const saveHandler = () => {
		console.log({
			textoAlerta,
			DescripciónDeAlerta,
			tipoDeAlerta,
			afectacion,
		});
		axios.post(`https://siam-pra-1656956256760.azurewebsites.net/api/pracms/add-alertas-tempranas/${textoAlerta}/${DescripciónDeAlerta}/1/1/1%2C2%2C3%2C4`).then((result) => console.log(console.log("Response", result)));
		modalCloseHandler();
		this.props.getData();
	};
	const cancelHandler = () => {
		modalCloseHandler();
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h6">Agregar Alerta Temprana</Typography>
			</Grid>
			<Grid item xs={12} />
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Typography>Título:</Typography>
					</Grid>
					<Grid item xs={3}>
						<TextField
							fullWidth
							variant="outlined"
							value={textoAlerta}
							placeholder="Título"
							onChange={(e) => {
								setTextoAlerta(e.target.value);
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Typography>Descripción de Alerta:</Typography>
					</Grid>
					<Grid item xs={3}>
						<TextField multiline fullWidth variant="outlined" placeholder="Descripción de Alerta" value={DescripciónDeAlerta} onChange={(e) => setDescripciónDeAlerta(e.target.value)} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Typography>Tipo de Alerta:</Typography>
					</Grid>
					<Grid item xs={3}>
						{/* <TextField select fullWidth variant="outlined" value="default">
                  <MenuItem disabled value="default">
                    Selecciona Tipo Alerta
                  </MenuItem>
                  {this.state.DropDowns.map((data, Index) => {
                    return (
                      <MenuItem key={"MI" + Index}>
                        {data.nombreTipoAlerta}
                      </MenuItem>
                    );
                  })}
                </TextField> */}

						<FormControl fullWidth variant="outlined">
							<TextField select fullWidth variant="outlined" labelId="demo-simple-select-label" id="demo-simple-select" onChange={handleChange} defaultValue={DropDowns[0].nombreTipoAlerta}>
								{DropDowns.map((data, Index) => (
									<MenuItem key={"MI" + Index} value={data.nombreTipoAlerta}>
										{data.nombreTipoAlerta}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
			{/* <Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<FormControl>
							<FormLabel id="demo-row-radio-buttons-group-label">Afectacion:</FormLabel>
							<RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={afectacion} onChange={handleChangeRadio}>
								<FormControlLabel value="Afecta a todo el País" control={<Radio />} label="Afecta a todo el País" />
								<FormControlLabel value="Afecta a Departamento" control={<Radio />} label="Afecta a Departamento" />
								<FormControlLabel value="Afecta a Municipio" control={<Radio />} label="Afecta a Municipio" />
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</Grid> */}

			{/* //* Custom Options */}
			{/* <Option2 /> */}

			<Grid item xs={12} />
			<Grid item xs={12}>
				<Grid container spacing={15}>
					<Grid item xs={2}>
						<Button onClick={saveHandler} variant="outlined">
							Guardar
						</Button>
					</Grid>
					<Grid item xs={2}>
						<Button onClick={cancelHandler} variant="outlined">
							Cancelar
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Page5Form;
