import * as React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
  } from "@material-ui/core";
//   import classNames from "classnames";


const CommonWidget = (props) => {
    const {
        widgetTitle,
        widgetImage,
        widgetDescription,
        widgetClick,
        lawOfficerClasses    
    } = props;
    return ( 
        <>
            <Card  elevation={0} onClick={widgetClick} className={lawOfficerClasses?.mainCardWarpper}>
                <CardContent className={lawOfficerClasses?.cardWarpper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={lawOfficerClasses?.subCardGridWrapper}>
                            <Typography className={lawOfficerClasses?.widgetTitle}>
                                {widgetTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={lawOfficerClasses?.subCardGridWrapper}>
                             <img style={{width:"71px", height:"71px"}} src={widgetImage}/>
                        </Grid>
                        <Grid item xs={12}  className={lawOfficerClasses?.subCardGridWrapper}>
                            <Typography className={lawOfficerClasses?.widgetDescription}>
                                {widgetDescription}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
     );
}
 
export default CommonWidget;
