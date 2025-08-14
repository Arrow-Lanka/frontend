import * as React from 'react';
import { Grid } from "@material-ui/core";
import classNames from "classnames";
import { styled } from '@mui/material/styles';
import { DashboardStyles } from "../DashboardStyles";
import { useTheme } from "@material-ui/core/styles";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import MenuIcon from '@mui/icons-material/Menu';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreIcon from '@mui/icons-material/MoreVert';
// Icons
// import pdf_Icon1 from "../../../../assets/images/lawImages/pdf_Icon1.png";
// import doc_Icon from "../../../../assets/images/lawImages/doc_Icon.png"; 
// import message1 from "../../../../assets/images/lawImages/message1.png";  
// import Play_Icon from "../../../../assets/images/lawImages/Play_Icon.png";

const messages = [
  {
    id: 1,
    primary: 'Spencer Larson',
    secondary: "Add two files.",
    time:"2 min ago",
    person: 'data:image/jpeg;base64,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',
    type :'file'
  },
  {
    id: 2,
    primary: 'Darryl Pike',
    secondary: "Voice message record",
    time:"15 min ago",
    person: 'data:image/jpeg;base64,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',
    type : 'voice'
  },
  {
    id: 3,
    primary: 'Melinda Deleon',
    secondary: 'Sent an Image',
    time:"13:45",
    person: 'data:image/jpeg;base64,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',
    type : 'message'
  },
  {
    id: 4,
    primary: 'Rhiannan Cantu',
    secondary: 'Sent an Image',
    time:"09:21",
    person: 'data:image/jpeg;base64,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',
    type :'file'
  },
  {
    id: 5,
    primary: "Doctor's Appointment",
    secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
    time:"Yesterday",
    person: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
    type : 'voice'
  },
  {
    id: 6,
    primary: 'Discussion',
    secondary: `Menus that are generated by the bottom app bar`,
      time:"2 min ago",
    person: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww',
    type : 'message'
  },
  {
    id: 7,
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend?`,
    person: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
    type :'file'
  },
];


const SingleReminder = () => {

    const lawOfficerClasses = DashboardStyles();
    const theme = useTheme();

    return ( 
        <React.Fragment>
            <Paper square sx={{ maxHeight: 'calc(70vh - 150px)', overflowY: 'auto' }}>
                <List>
                    {messages.map(({ id, primary, secondary, time, person , type}) => (
                    <React.Fragment key={id}>
                        {/* {id === 1 && (
                        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                            Today
                        </ListSubheader>
                        )}
        
                        {id === 3 && (
                        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                            Yesterday
                        </ListSubheader>
                        )} */}
                        {/* <ListItemButton> */}
                        <ListItem style={{borderBottom:"1px solid #E1E1E1"}}>
                            <Grid container xs={12} style={{display:"flex", width:"fix-content"}}>
                                <Grid item xs={2} md={2}>
                                    <ListItemAvatar>
                                        <Avatar alt="Profile Picture" src={person} />
                                    </ListItemAvatar>
                                </Grid>
                                <Grid item xs={8} md={8}>
                                    <ListItemText primary={primary} />
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <ListItemText   sx={{ fontSize:"2px", color: "#AEAEAE" }} secondary={time} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <ListItemText 
                                        secondary={secondary}
                                     />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box>
                                        {type == "file" && 
                                        <Card sx={{ minWidth: 399 , height:"50px", backgroundColor: "#F6F6F6" }}>
                                            <CardContent sx={{ padding: 0 }}>
                                                <Grid container>
                                                    <CardHeader
                                                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                                                        avatar={
                                                            <img src={""} alt="pdf" style={{ width: "100%", height: "20%" }} />
                                                        }
                                                        title="Lorem Ipsum"
                                                        subheader="20 mb"
                                                    />
                                                    <CardHeader
                                                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                                                        avatar={
                                                            <img src={""} alt="doc" style={{ width: "100%", height: "20%" }} />
                                                        }
                                                        title="Lorem Ipsum"
                                                        subheader="20 mb"
                                                    />
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                        }
                                        {type == "voice" && 
                                        <Card sx={{ minWidth: 399 , backgroundColor: "#E8F5FF" }}>
                                            <CardHeader
                                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                                                avatar={
                                                    <img src={""} alt="Profile Picture" style={{ width: "100%", height: "20%" }} />
                                                }
                                                title="Lorem Ipsum"
                                                subheader="20 mb"
                                            />
                                        </Card>
                                        }
                                        {type == "message" && 
                                            <Card sx={{ minWidth: 399 , backgroundColor: "#F6F6F6" }}>
                                            <CardHeader
                                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                                                avatar={
                                                    <img src={""} alt="Profile Picture" style={{ width: "100%", height: "20%" }} />
                                                }
                                                title="Lorem Ipsum"
                                                subheader="20 mb"
                                            />
                                        </Card>
                                        }
                                    </Box>
                                </Grid>

                            </Grid>
                                
                        </ListItem>
                        {/* </ListItemButton> */}
                    </React.Fragment>
                    ))}
                </List>
            </Paper>
        </React.Fragment>
     );
}
 
export default SingleReminder;