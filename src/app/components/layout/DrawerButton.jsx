import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { ListItem, ListItemText, Grid } from "@mui/material";
const DrawerButton = (props) => {
  const {
    id,
    classes,
    open,
    active,
    setActive,
    subTitle,
    linkPath,
    selectButton,
    drawerIcon,
    nestedPadding,
    mobileOpen,
    mobileWidth
  } = props;

  return (
    <Grid container justifyContent="flex-start" item xs={12}>
      <ListItem
        id={id}
        button
        style={{ width: open ? "90%" : mobileWidth && mobileOpen? mobileWidth : "3.5rem", padding:(open||mobileOpen) && nestedPadding && nestedPadding, marginRight:"1rem" }}
        component={ReactLink}
        to={linkPath}
        onClick={() => setActive(selectButton)}
        className={
          open && active === selectButton
            ? classes.activeListItem
            : open
            ? classes.listItem
            : !open && active === selectButton
            ? classes.closedListItemActive
            : classes.closedListItem
        }
      >
        <div className={!open ? classes.listItemCloseIcon : null}>
          {drawerIcon}
        </div>

        {open ? (
          <ListItemText
            classes={{
              primary: classes.listItemText,
            }}
            primary={subTitle}
          />
        ) : null}
      </ListItem>
    </Grid>
  );
};

export default DrawerButton;
