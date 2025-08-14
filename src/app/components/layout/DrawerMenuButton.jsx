import React from "react";
import {
    ListItem,
    ListItemText,
    Grid,
    ListItemIcon,
    SvgIcon,
} from "@mui/material";

import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import classNames from 'classnames';

//for nesting dropdown list item
const DrawerMenuButton = (props) => {
    const {
        id,
        classes,
        open,
        onDrawerButtonClick,
        drawerIcon,
        isNestedDrawerOpen,
        subTitle,
        listItemWrapperGridClass,
        mobileOpen,
        drawerIconViewBox,
        nestedListItemClass
    } = props;

    return (
        <Grid container item xs={12}>
            <Grid
                container
                justifyContent="flex-start" 
                className={classNames(classes.drawerMenuListItemWrapper ,listItemWrapperGridClass && listItemWrapperGridClass)}
            >
                <ListItem
                    id={id}
                    button
                    onClick={() => { onDrawerButtonClick && onDrawerButtonClick(); }}
                    className={
                        classNames(classes.expandListItem, (open || mobileOpen) && nestedListItemClass)
                    }
                >
                    <ListItemIcon style={{minWidth:!open && "auto", overflow:"hidden"}}>
                        <SvgIcon viewBox={drawerIconViewBox && drawerIconViewBox}>{drawerIcon}</SvgIcon>
                    </ListItemIcon>
                    {open && <ListItemText
                        primary={subTitle} 
                        classes={{
                            primary: classes.expandListItemText,
                        }}
                    />}
                    {isNestedDrawerOpen ? <ExpandMore className={classes.drawerMenuRightIcon}/> : <KeyboardArrowRight className={classes.drawerMenuRightIcon}/>}
                </ListItem>
            </Grid>
        </Grid>
    );

}

export default DrawerMenuButton;