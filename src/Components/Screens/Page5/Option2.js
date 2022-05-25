import { Grid, Button, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Checkbox, Divider } from "@mui/material";

const Option2 = () => {
	const LeftList = [
		{
			id: 1,
			pais: "A",
		},
		{
			id: 2,
			pais: "B",
		},
		{
			id: 3,
			pais: "C",
		},
		{
			id: 4,
			pais: "D",
		},
		{
			id: 5,
			pais: "E",
		},
		{
			id: 6,
			pais: "F",
		},
		{
			id: 7,
			pais: "G",
		},
		{
			id: 8,
			pais: "H",
		},
		{
			id: 9,
			pais: "I",
		},
		{
			id: 10,
			pais: "J",
		},
	];

	const RightList = [
		{
			id: 1,
			pais: "A",
		},
		{
			id: 2,
			pais: "B",
		},
		{
			id: 3,
			pais: "C",
		},
		{
			id: 4,
			pais: "D",
		},
		{
			id: 5,
			pais: "E",
		},
		{
			id: 6,
			pais: "F",
		},
		{
			id: 7,
			pais: "G",
		},
		{
			id: 8,
			pais: "H",
		},
		{
			id: 9,
			pais: "I",
		},
		{
			id: 10,
			pais: "J",
		},
	];

	return (
		<div>
			<Grid item xs={12}>
				{/* //* Edited - Subhajit Ghosh */}
				<Paper sx={{ width: 200, height: 400 }} style={{ display: "flex", flexDirection: "column" }}>
					{/* //* Edited - Subhajit Ghosh */}
					<List dense={true} component="div" role="list" style={{ overflow: "auto" }}>
						{LeftList.map((data, Index) => {
							return (
								<>
									<Divider />
									<ListItem key={data.pais + Index} role="listitem" onClick={() => this.CheckBoxAction("Left", data.checked ? false : true, Index)}>
										<ListItemIcon>
											<Checkbox checked={data.checked} />
										</ListItemIcon>
										<ListItemText primary={data.pais} />
									</ListItem>
								</>
							);
						})}
						<ListItem />
					</List>
				</Paper>

				<Grid container direction="column" alignItems="center">
					<Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={() => this.MoveData("ToRight")} aria-label="move selected right">
						&gt;
					</Button>
					<Button sx={{ my: 0.5 }} variant="outlined" size="small" onClick={() => this.MoveData("ToLeft")} aria-label="move selected left">
						&lt;
					</Button>
				</Grid>

				{/* //* Edited - Subhajit Ghosh */}
				<Paper sx={{ width: 200, height: 400 }} style={{ display: "flex", flexDirection: "column" }}>
					{/* //* Edited - Subhajit Ghosh */}
					<List dense component="div" role="list" style={{ overflow: "auto" }}>
						{RightList.map((data, Index) => {
							const labelId = `transfer-list-item-${data.pais + Index}-label`;
							return (
								<>
									<Divider />
									<ListItem key={data.pais + Index} role="listitem" onClick={() => this.CheckBoxAction("Right", data.checked ? false : true, Index)}>
										<ListItemIcon>
											<Checkbox checked={data.checked} />
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
		</div>
	);
};

export default Option2;
