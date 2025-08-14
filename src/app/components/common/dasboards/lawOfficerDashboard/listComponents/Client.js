
import * as React from 'react';
import { Grid, Typography, Divider, Avatar, Button, Chip , Card, CardContent} from "@material-ui/core";
import classNames from "classnames";
import { useTheme } from "@material-ui/core/styles";
import { DashboardStyles } from "../DashboardStyles";
import { useStyles } from '../../../../assets/styles/styles';
import TableComponent from '../../../common/material/TableComponent';
import SearchComponent from "../../../common/material/SearchComponent";
// import right_arrow from "../../../../assets/images/icons/right_arrow.svg";
// import listView from "../../../../assets/images/icons/list.svg";
// import gridView from "../../../../assets/images/icons/gride.svg";  
// import plus_Icon from "../../../../assets/images/lawImages/plus_Icon.png"; 

const searchOptions = [
  // { id: "select", name: "" },
  { id: "mrn", name: "MRN" },
  { id: "patientName", name: "Patient Name" },
];

const Client = () => {
  const lawOfficerClasses = DashboardStyles();
  const theme = useTheme();
  const classes = useStyles();

  const [isAdvanceSearch, setIsAdvanceSearch] = React.useState(false);
    const [advanceSearchOptions, setAdvanceSearchOptions] = React.useState(searchOptions);
    const [searchKey, setSearchKey] = React.useState("");
    const [searchSelection, setSearchSelection] = React.useState("select");
    const [advanceSearchOption, setAdvanceSearchOption] = React.useState("");
    const [advanceSearchkey, setAdvanceSearchkey] = React.useState("");
    const [testRowData, setRowData] = React.useState([
        {client:"icd 1",noOfMatters:"noOfMatters 1", status:"Active", action:"AAA"},
        {client:"icd 2",noOfMatters:"description 2", status:"Inactive", action:"BBB"},
        {client:"icd 3",noOfMatters:"description 3", status:"Inactive", action:"CCC"},
        {client:"icd 4",noOfMatters:"description 4", status:"Active", action:"DDD"},
        {client:"icd 5",noOfMatters:"description 5", status:"Inactive", action:"EEE"},
        {client:"icd 6",noOfMatters:"description 5", status:"Active", action:"EEE"},
        {client:"icd 7",noOfMatters:"description 5", status:"Active", action:"EEE"},
        {client:"icd 8",noOfMatters:"description 5", status:"Active", action:"EEE"},
        {client:"icd 9",noOfMatters:"description 5", status:"Inactive", action:"EEE"},
        {client:"icd 10",noOfMatters:"description 5", status:"Inactive", action:"EEE"},
    ]);

  const columnData = [
    {
        id: "client",
        name: "Client",
        columnClass: classNames(lawOfficerClasses.tableColumn),
    },
    {
        id: "noOfMatters",
        name: "No.of Matters",
        columnClass: classNames(lawOfficerClasses.tableColumn),
    },
    {
      id: "status",
      name: "Status",
      template: {
          type: 'twoLineTextFields',
          fieldList: [
              {
                  id: 'status',
                  fieldClass: '',
                  options: [
                      {
                          id: "status",
                          value: "Active",
                          conditionClass: lawOfficerClasses?.tableGreenChip
                      },
                      {
                          id: "status",
                          value: "Inactive",
                          conditionClass: lawOfficerClasses?.tableRedChip
                      }
                  ]
              }
          ]
      },
  },
  {
      id: "action",
      name: "Action",
      columnClass: classNames(lawOfficerClasses.tableColumnBlock),
      template: {
        type: "clickableIconBlock",
        columnAlign: "right",
        iconClickAction: (e) => {},
        icons: [
          {
            id: "proceed",
            name: "Proceed",
            iconLink: "",
            istoolTipArrow: false,
          },
        ],
      },
      columnClass: classNames(lawOfficerClasses.tableColumn)
    },
];

const handleAdvanceSearch = checked => {
  setIsAdvanceSearch(checked);
}
    return (
        <>
        <div>
            <Grid className={lawOfficerClasses?.clientMainContainer}>
              <Grid container xs={12}>
                <Typography className={lawOfficerClasses?.headerTypo}>{"My Clients"}</Typography>
              </Grid>
              {/* <Grid container item xs={12} style={{display:"flex", padding:"5px"}}>
                <Grid container item xs={12} md={8}>
                  <SearchComponent
                        comName="quick-patient-reg"
                        isAdvancedSearch={isAdvanceSearch}
                        isAdvanceSearchHandler={""}
                        toggleSectionGridSize={2}
                        searchSectionGridSize={6}
                        hideToggle={true}
                        dropdownOptionData={""}
                        dropdownSelectValue={advanceSearchOption}
                        handleDropDownSelect={(e) => {
                            setAdvanceSearchOption(e.target.value);
                            // setsearchValue("")
                            // handlePatientData(1)
                        }}
                        searchValue={""}
                        handleSearchValue={""}
                        searchFieldSectionStyle={lawOfficerClasses.searchSection}
                        inputFieldText={isAdvanceSearch ? "" : "searchByNameOrMrn"}
                    // startText={isAdvanceSearch ? "" : "Search By Name or MRN"}
                    />

                </Grid>
                <Grid container item xs={12} md={4}  direction="row" justify="flex-end" style={{paddingRight:"5px"}}>
                <Button
                      variant="outlined"
                      className={classNames(lawOfficerClasses.FilterBtn, lawOfficerClasses.nonClinicalRegHeaderFilterBtn)}
                      onClick={""} >
                      { <img src={gridView} />}
                      <Typography className={lawOfficerClasses.outLineBtnText}>
                        {"Save"}
                      </Typography>
                  </Button>
                </Grid>
              </Grid> */}
              <Grid container xs={12} md={12} spacing={2} className={lawOfficerClasses.searchBarContainer}>
                <Grid container item xs={6} md={6} className={lawOfficerClasses.searchBoxContainer}>
                 <SearchComponent
                        comName="quick-client-search"
                        isAdvancedSearch={isAdvanceSearch}
                        isAdvanceSearchHandler={checked =>
                          handleAdvanceSearch(checked)}
                        toggleSectionGridSize={2}
                        searchSectionGridSize={10}
                        hideToggle={false}
                        dropdownOptionData={advanceSearchOptions}
                        dropdownSelectValue={advanceSearchOption}
                        handleDropDownSelect={(e) => {
                            setAdvanceSearchOption(e.target.value);
                            setSearchKey("");
                        }}
                        searchValue={searchKey}
                        handleSearchValue={e => setSearchKey(e.target.value)}
                        searchFieldSectionStyle={lawOfficerClasses.searchSection}
                        inputFieldText={isAdvanceSearch ? "" : "searchByNameOrMrn"}
                    // startText={isAdvanceSearch ? "" : "Search By Name or MRN"}
                    />
                </Grid>
                <Grid container item xs={4} md={4}/>
                  <Grid container item xs={2} md={2} >
                  <Button
                        variant="outlined"
                        className={classNames(lawOfficerClasses.FilterBtn, lawOfficerClasses.nonClinicalRegHeaderFilterBtn)}
                        onClick={""} >
                        { <img src={""} />}
                        <Typography className={lawOfficerClasses.outLineBtnText}>
                          {"Add Client"}
                        </Typography>
                    </Button>
                  </Grid>
              </Grid>
              <Grid container xs={12} >
                    <TableComponent
                      classes={classes}
                      columns={columnData}
                      rows={testRowData}
                      uniqueField="client"
                      // onClickHandler={(event) => {
                      //     tableIconClickedAction(event.target.id);
                      // }}
                      tableclass={lawOfficerClasses.tableClass}
                      tableContainer={lawOfficerClasses.tableContainer}
                      tableHeaderClass=""
                      pageNo={1}
                      pageDataCount={8}
                      isPagination={true}
                      datatotalCount={40}
                  />
              </Grid>
            </Grid>
        </div>
        </>
      );
}
 
export default Client;