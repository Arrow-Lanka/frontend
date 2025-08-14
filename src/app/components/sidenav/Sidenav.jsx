import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./Sidenav.css";

export default function Sidenav() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [usrMgtOpen, setUsrMgtOpen] = useState(false);

  const toggleAdmin = () => setAdminOpen(!adminOpen);
  const toggleUsrMgt = () => setUsrMgtOpen(!usrMgtOpen);

  return (
    <nav className="sidenav">
      <h2 className="nav-title">ERP System</h2>
      <ul>

        <li>
          <div onClick={toggleAdmin} className="nav-toggle">
            <AdminPanelSettingsIcon className="nav-icon" />
            <span className="nav-text">Admin</span>
            {adminOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>

          {adminOpen && (
            <ul className="submenu">
              <li>
                <div onClick={toggleUsrMgt} className="nav-toggle">
                  <AdminPanelSettingsIcon className="nav-icon" />
                  <span className="nav-text">User Management</span>
                  {usrMgtOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>

                {usrMgtOpen && (
                  <ul className="submenu">
                    <li>
                      <Link to="/admin/usermgt/supplier">
                        <ManageAccountsIcon className="nav-icon" />
                        <span className="nav-text">Supplier</span>
                      </Link>
                    </li>

               
                    <li>
                        <Link to="/admin/usermgt/customer">
                        <ManageAccountsIcon className="nav-icon" />
                        <span className="nav-text">Customer</span>
                        </Link>
                    </li>

                  </ul>

                )

                }

              </li>
              <li>
                <Link to="/admin/roles">Role Management</Link>
              </li>
              <li>
                <Link to="/admin/settings">Settings</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/dashboard">
            <DashboardIcon className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/sales">
            <PointOfSaleIcon className="nav-icon" />
            <span className="nav-text">Sales</span>
          </Link>
        </li>
        <li>
          <Link to="/inventory">
            <InventoryIcon className="nav-icon" />
            <span className="nav-text">Inventory</span>
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <AssessmentIcon className="nav-icon" />
            <span className="nav-text">Reports</span>
          </Link>
        </li>
      </ul>
      <div className="sidenav-arrow">
        <ChevronRightIcon />
      </div>
    </nav>
  );
}
