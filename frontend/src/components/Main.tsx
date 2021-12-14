import { useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Box, Button, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@mui/material';
import useSWR from 'swr';
import CreateOrder from './CreateOrder';
import Detail from './Detail';


interface iOrder{
	name: string
  	priority: string
  	deadline: string
  	comment: string
	id: number
}

const theme = createTheme({
    palette: {
		neutral: {
			main: '#000000',
			contrastText: '#fff',
		},
    },
});
  
declare module '@mui/material/styles' {
    interface Palette {
    	neutral: Palette['primary'];
    }
  
    interface PaletteOptions {
    	neutral?: PaletteOptions['primary'];
    }
}
  
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		neutral: true;
	}
}

const deleteOrder = (id:number) => {
	if(!id) return console.log("error");
	
	fetch("/api/delete", {
		method:"POST",
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({id})
	}).then(res => {
		if(res.ok){
			window.location.reload();
		}else{
			console.log("Server error");
		}
	})
	
}



const Main = () => {
	const options = { day: 'numeric' as const , month: 'numeric' as const , year: 'numeric' as const };	

	const [openCreate, setOpenCreate] = useState(false);
	const [edit, setEdit] = useState(false);

	const [openDetail, setOpenDetail] = useState(false);
	
	const [detailName, setDetailName] = useState("");
	const [detailPriority, setDetailPriority] = useState("");
	const [detailDeadline, setDetailDeadline] = useState("");
	const [detailComment, setDetailComment] = useState("");

	const [editDeadline, setEditDeadline] = useState(new Date());
	const [editId, setEditId] = useState(0);

	const setOffer = (name:string, priority:string, deadline:string, comment:string) => {
		setDetailName(name); 
		setDetailPriority(priority); 
		setDetailDeadline(deadline); 
		setDetailComment(comment);
	}

	const { data, error } = useSWR('/api/orders', {fetcher:(link:string) => fetch(link, {method:"POST"}).then(e => e.json())})
	const rows:iOrder[] = data?.data;

	if(error) return <div>{error}</div>
	if(!data) return <div>Loading...</div>	

	return (
		<>
			<CreateOrder edit={edit} isOpen={openCreate} name={detailName} priority={detailPriority} deadline={editDeadline} comment={detailComment} id={editId}/>
			<Detail isOpen={openDetail} name={detailName} priority={detailPriority} deadline={detailDeadline} comment={detailComment}/>
			<ThemeProvider theme={theme}>
			<Container>
				<Box component="h1" sx={{width: 1, display: 'inline-flex', justifyContent: 'center'}}>Company Orders</Box>
				<Box sx={{width: 1, mb:2, display: 'inline-flex', justifyContent: 'center'}}><Button variant="contained" color='neutral' onClick={() => {setEdit(false); setOpenCreate(true)}}>Create Order</Button></Box>
				<TableContainer component={Paper} sx={{ border: 1 }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							hover={true}
							
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell sx={{cursor: 'pointer'}} component="th" scope="row" onClick={() => {
								setOpenDetail(true);
								setOffer(row.name, row.priority, new Date (row.deadline).toLocaleDateString(undefined, options), row.comment);
							}}>
								<Box component="h3">{row.name}</Box>
							</TableCell>
							
							<TableCell sx={{cursor: 'pointer'}} align="right" onClick={() => {
								setOpenDetail(true);
								setOffer(row.name, row.priority, new Date (row.deadline).toLocaleDateString(undefined, options), row.comment);
							}}>
								<Box sx={{display: 'inline-flex', borderRadius: 16, p: 0.5, px: 1, bgcolor: 'text.disabled', width: '120px', justifyContent: "center" }}>Priority - {row.priority}</Box>
							</TableCell>
							
							<TableCell sx={{cursor: 'pointer'}} align="right" onClick={() => {
								setOpenDetail(true);
								setOffer(row.name, row.priority, new Date (row.deadline).toLocaleDateString(undefined, options), row.comment);
							}}>
								<Box sx={{display: 'inline-flex', borderRadius: 16, p: 0.5, px: 1, bgcolor: 'text.disabled', width: '150px', justifyContent: "center" }}>Deadline - {new Date (row.deadline).toLocaleDateString(undefined, options)}</Box>
							</TableCell>
							
							{/* EDIT */}
							<TableCell align="right">
								<Button variant="outlined" color='inherit' onClick={() => {
									setEdit(true); 
									setOpenCreate(true)
									setOffer(row.name, row.priority, row.deadline, row.comment)
									setEditDeadline(new Date (row.deadline))
									setEditId(row.id)
									}}>Edit
								</Button>
							</TableCell>

							{/* DELETE */}
							<TableCell align="right"><Button onClick={() => deleteOrder(row.id)} variant="outlined" color='inherit'>Delete</Button></TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
				</TableContainer>
			</Container>
			</ThemeProvider>
		</>
	);
}

export default Main
