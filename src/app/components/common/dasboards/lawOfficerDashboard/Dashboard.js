// import * as React from 'react';
// import { Grid, Typography, Divider, Avatar, Button, Chip , Card, CardContent, Badge, Box } from "@material-ui/core";
// import classNames from "classnames";
// import CommonWidget from './common/CommonWidget';
// import { useTheme } from "@material-ui/core/styles";
// import { DashboardStyles } from "./DashboardStyles";
// import { useStyles } from '../../../assets/styles/styles';
// import CustomDonutChart from "../../common/material/CustomDonutChart";
// import Donutchart from '../lawOfficerDashboard/charts/Donutchart';
// import Highcharts from 'highcharts';
// import TableComponent from '../../common/material/TableComponent';
// import SearchComponent from "../../common/material/SearchComponent";
// // Icons
// import right_arrow from "../../../assets/images/icons/right_arrow.svg";

// //pagesDashboardStyles
// import Client from './listComponents/Client';
// import SingleReminder from './common/SingleReminder'

// const searchOptions = [
//     // { id: "select", name: "" },
//     { id: "mrn", name: "MRN" },
//     { id: "patientName", name: "Patient Name" },
//   ];
//   const shapeStyles = { bgcolor: 'error', width: 50, height: 80 }; 
//   const shapeCircleStyles = { borderRadius: '50%' };
//   const badgeContainer = {height: "28px", width:"28px"}

//   const circle = (
//     <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles, ...badgeContainer }} />
//   );

// const Dashboard = () => {

//     const lawOfficerClasses = DashboardStyles();
//     const theme = useTheme();
//     const classes = useStyles();

//     // States
//     const [isAdvanceSearch, setIsAdvanceSearch] = React.useState(false);
//     const [advanceSearchOptions, setAdvanceSearchOptions] = React.useState(searchOptions);
//     const [searchKey, setSearchKey] = React.useState("");
//     const [searchSelection, setSearchSelection] = React.useState("select");
//     const [advanceSearchOption, setAdvanceSearchOption] = React.useState("");
//     const [advanceSearchkey, setAdvanceSearchkey] = React.useState("");
//     const [testRowData, setRowData] = React.useState([
//         {client:"icd 1",noOfMatters:"noOfMatters 1", status:"condition 1", action:"AAA"},
//         {client:"icd 2",noOfMatters:"description 2", status:"condition 2", action:"BBB"},
//         {client:"icd 3",noOfMatters:"description 3", status:"condition 3", action:"CCC"},
//         {client:"icd 4",noOfMatters:"description 4", status:"condition 4", action:"DDD"},
//         {client:"icd 5",noOfMatters:"description 5", status:"condition 6", action:"EEE"}
        
//     ]);
//   /**
//   |--------------------------------------------------
//   | PieChart palettes as Design colors
//   |--------------------------------------------------
//   */
//   const pieChartPalettes = {
//     todaysOPD:[ theme.palette.doughnutCharts.purple,  theme.palette.doughnutCharts.yellow,  theme.palette.doughnutCharts.lightblue],
//     todaysSession:[ theme.palette.doughnutCharts.purple,  theme.palette.doughnutCharts.lightblue]
//   }

//   const columnData = [
//     {
//         id: "client",
//         name: "Client",
//         columnClass: classNames(lawOfficerClasses.tableColumn),
//     },
//     {
//         id: "noOfMatters",
//         name: "No.of Matters",
//         columnClass: classNames(lawOfficerClasses.tableColumn),
//     },
//     {
//         id: "status",
//         name: "Status",
//         columnClass: classNames(lawOfficerClasses.tableColumn),
//     },
//     {
//         id: "action",
//         name: "Action",
//         columnClass: classNames(lawOfficerClasses.tableColumnBlock),
//         width: "10%",
//         template: {
//           type: "clickableIconBlock",
//           columnAlign: "right",
//           iconClickAction: (e) => {},
//           icons: [
//             {
//               id: "proceed",
//               name: "Proceed",
//               iconLink: right_arrow,
//               istoolTipArrow: false,
//             },
//           ],
//         },
//         columnClass: classNames(lawOfficerClasses.tableColumn)
//       },
// ];


//     const [clickedWidget, setClickedWidget] = React.useState("");

//     const handleClickWidgetHandler =(clickedtype)=> {
//         setClickedWidget(clickedtype);
//     }

//     return ( 
//         <>
//         <div className={lawOfficerClasses.dashboardContainer}>
//             <Grid container xs={12} md={12} >
//                 <Grid item md={8} >
//                     <Grid container spacing={2} item   xs={12} >
//                         <Grid item xs={12} md={4} lg={4} className={clickedWidget === "employmentWidget" && lawOfficerClasses.clickedWidget} >
//                             <CommonWidget
//                                 widgetTitle={"My Employment"}
//                                 widgetImage={require("")}
//                                 widgetDescription={"Last update 30 Days"}
//                                 widgetClick={()=> handleClickWidgetHandler("employmentWidget")}
//                                 clickedWidget={clickedWidget}
//                                 lawOfficerClasses={lawOfficerClasses}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={4}  className={clickedWidget === "marketingWidget" && lawOfficerClasses.clickedWidget}>
//                             <CommonWidget
//                                 widgetTitle={"My Marketing Task"}
//                                 widgetImage={require("")}
//                                 widgetDescription={"Last update 30 Days"}
//                                 widgetClick={()=> handleClickWidgetHandler("marketingWidget")}
//                                 clickedWidget={clickedWidget}
//                                 lawOfficerClasses={lawOfficerClasses}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={4}  className={clickedWidget === "billingWidget" && lawOfficerClasses.clickedWidget}>
//                             <CommonWidget
//                                 widgetTitle={"My Billing"}
//                                 widgetImage={require(".")}
//                                 widgetDescription={"Last update 30 Days"}
//                                 widgetClick={()=> handleClickWidgetHandler("billingWidget")}
//                                 clickedWidget={clickedWidget}
//                                 lawOfficerClasses={lawOfficerClasses}
//                             />
//                         </Grid>
//                     </Grid>
//                     {/* <Grid item container style={{paddingTop:"10px"}}> */}
//                         <Client/>
//                     {/* </Grid> */}
                 
//                 </Grid>
//                 <Grid item container md={4} xs={12} className={lawOfficerClasses.mainContentContainer}>
//                     <Grid container item >
//                         {/* <Donutchart/> */}
//                         <Grid  container  xs={12} md={12}  className={lawOfficerClasses?.borderBottom}>
//                             <Grid item xs={4} md={4}  >
//                                 <Typography className={lawOfficerClasses.notificationTypo}>{"Notifications"}</Typography>
//                             </Grid>
//                             <Grid item xs={4} md={4}>
//                                 <Badge color="error" overlap="circular" badgeContent="50" >
//                                     {circle}
//                                 </Badge>
//                             </Grid>
//                         </Grid>
//                         <Grid  container  xs={12} md={12} className={lawOfficerClasses.reminderGridWrapper}>
//                            <SingleReminder/>
//                         </Grid>
//                     </Grid>
//                     {/* <Divider /> */}
//                     <Grid  container xs={12} md={12}  className={lawOfficerClasses.donutGridWrapper}>
//                         <Grid item >
//                             <Donutchart/>
//                         </Grid>
//                     </Grid>

//                 </Grid>
                
//             </Grid>
//         </div>
//         </>
//      );
// }
 
// export default Dashboard;



// // import * as React from 'react';
// // import { styled } from '@mui/material/styles';
// // // import {Box} from '@mui/material/Box';
// // // import Paper from '@mui/material/Paper';
// // // import Grid from '@mui/material/Grid';
// // import { Grid, Typography, Divider, Avatar, Button, Chip , Card, CardContent, Badge, Box , Paper} from "@material-ui/core";
// // // import classNames from "classnames";
// // import { DashboardStyles } from "./DashboardStyles";
// // import CommonWidget from './common/CommonWidget';

// // //pagesDashboardStyles
// // import Client from './listComponents/Client';
// // import SingleReminder from './common/SingleReminder';
// // import Donutchart from '../lawOfficerDashboard/charts/Donutchart';

// // const Item = styled(Paper)(({ theme }) => ({
// //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
// //   ...theme.typography.body2,
// //   padding: theme.spacing(1),
// //   textAlign: 'center',
// //   color: theme.palette.text.secondary,
// // }));

// //  const searchOptions = [
// //         // { id: "select", name: "" },
// //         { id: "mrn", name: "MRN" },
// //         { id: "patientName", name: "Patient Name" },
// //       ];

// //   const shapeStyles = { bgcolor: 'error', width: 70, height: 70 }; 
// //   const shapeCircleStyles = { borderRadius: '50%' };

// //   const circle = (
// //     <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
// //   );

// // export default function Dashboard() {
// //     const lawOfficerClasses = DashboardStyles();

// //         // States
// //     const [isAdvanceSearch, setIsAdvanceSearch] = React.useState(false);
// //     const [advanceSearchOptions, setAdvanceSearchOptions] = React.useState(searchOptions);
// //     const [searchKey, setSearchKey] = React.useState("");
// //     const [searchSelection, setSearchSelection] = React.useState("select");
// //     const [advanceSearchOption, setAdvanceSearchOption] = React.useState("");
// //     const [advanceSearchkey, setAdvanceSearchkey] = React.useState("");
// //     const [testRowData, setRowData] = React.useState([
// //         {client:"icd 1",noOfMatters:"noOfMatters 1", status:"condition 1", action:"AAA"},
// //         {client:"icd 2",noOfMatters:"description 2", status:"condition 2", action:"BBB"},
// //         {client:"icd 3",noOfMatters:"description 3", status:"condition 3", action:"CCC"},
// //         {client:"icd 4",noOfMatters:"description 4", status:"condition 4", action:"DDD"},
// //         {client:"icd 5",noOfMatters:"description 5", status:"condition 6", action:"EEE"}
// //     ]);


// //     const [clickedWidget, setClickedWidget] = React.useState("");

// //     const handleClickWidgetHandler =(clickedtype)=> {
// //         setClickedWidget(clickedtype);
// //     }

// //   return (
// //     <Box sx={{ flexGrow: 1 }} className={lawOfficerClasses.dashboardContainer}>
// //       <Grid container spacing={2}>
// //         <Grid item xs={8}>
// //           <Item>
// //             <Grid container spacing={2} item   xs={12} >
// //                             <Grid item xs={12} md={4} lg={4} className={clickedWidget === "employmentWidget" && lawOfficerClasses.clickedWidget} >
// //                                 <CommonWidget
// //                                     widgetTitle={"My Employment"}
// //                                     widgetImage={require("../../../assets/images/lawImages/employment-widget-image.png")}
// //                                     widgetDescription={"Last update 30 Days"}
// //                                     widgetClick={()=> handleClickWidgetHandler("employmentWidget")}
// //                                     clickedWidget={clickedWidget}
// //                                     lawOfficerClasses={lawOfficerClasses}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} md={4} lg={4}  className={clickedWidget === "marketingWidget" && lawOfficerClasses.clickedWidget}>
// //                                 <CommonWidget
// //                                     widgetTitle={"My Marketing Task"}
// //                                     widgetImage={require("../../../assets/images/lawImages/marketingTask-widget-image.png")}
// //                                     widgetDescription={"Last update 30 Days"}
// //                                     widgetClick={()=> handleClickWidgetHandler("marketingWidget")}
// //                                     clickedWidget={clickedWidget}
// //                                     lawOfficerClasses={lawOfficerClasses}
// //                                 />
// //                             </Grid>
// //                             <Grid item xs={12} md={4} lg={4}  className={clickedWidget === "billingWidget" && lawOfficerClasses.clickedWidget}>
// //                                 <CommonWidget
// //                                     widgetTitle={"My Billing"}
// //                                     widgetImage={require("../../../assets/images/lawImages/billing-widget-image.png")}
// //                                     widgetDescription={"Last update 30 Days"}
// //                                     widgetClick={()=> handleClickWidgetHandler("billingWidget")}
// //                                     clickedWidget={clickedWidget}
// //                                     lawOfficerClasses={lawOfficerClasses}
// //                                 />
// //                             </Grid>
// //             </Grid>
// //           </Item>
// //         </Grid>
// //         <Grid item xs={4}>
// //         <Item style={{ height: '100%' }}> {/* Ensure the height here is 100% to fill the parent */}
// //             <Grid container direction="column" style={{ height: '100%' }}> {/* This will also need to be 100% */}
// //                 <Grid item style={{ flexGrow: 1, overflow: 'auto' }}> {/* flexGrow will make the items share the space equally */}
// //                 <SingleReminder/>
// //                 </Grid>
// //                 <Grid item style={{ flexGrow: 1, overflow: 'auto' }}> {/* overflow auto added if content is larger than container */}
// //                 <Donutchart/>
// //                 </Grid>
// //             </Grid>
// //         </Item>
// //     </Grid>
// //     <Grid item xs={8}>
// //       <Item style={{ marginTop:"-300px"}}> {/* Adjust height here */}
// //         <Client/>
// //       </Item>
// //     </Grid>

// //       </Grid>
// //     </Box>
// //   );
// // }