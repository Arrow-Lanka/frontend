import React, { useEffect } from 'react';
import './LayoutStyle.css';
import { Route, Routes, Navigate } from 'react-router-dom';



import PermissionChecker from '../common/PermissionChecker';
// import ErrorBound from "../errorBoundary/ErrorBound";
import Main from "./Main";
import DashboardComponent from '../common/dasboards/DashboardComponent.js';
import SessionChecker from '../authorization/SessionChecker';



import Supplier from '../admin/supllier/Supplier.jsx';
import Customer from '../admin/customer/Customer.jsx';
import Company from '../admin/company/Company.jsx';
import Item from '../admin/itemComponant/Item.jsx';
import Stock_Location from '../admin/StockLocation/StockLocation.jsx';
import Batch from '../admin/batch/Batch.jsx';
import GRN from '../admin/grn/GRN.jsx';
import Stock from '../admin/stock/Stock.jsx';
import BOM from '../admin/bom/BOM.jsx';
import Production from '../admin/production/ProductionView.jsx';
import SalesInvoice from '../admin/sales/SalesInvoice.jsx';
import Milling from '../admin/milling/MillingProductionView.jsx';
import Steam from '../admin/steam/SteamProductionView.jsx';
import ProductionMapping from '../admin/productionMapping/ProductionMapping.jsx';
import CustomerOutstanding from '../admin/outstanding/CustomerOutStanding.jsx';


const Layout = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const [permissionsArray, setPermissionsArray] = React.useState([]);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("jwtToken") ? true : false);
        setPermissionsArray(localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : []);

        let loggedInUser = {
            id: 0
        };
        if (localStorage.getItem("userDetail")) {
            loggedInUser = JSON.parse(localStorage.getItem("userDetail"));
        }
    }, []);

    return (
        <div style={{ backgroundColor: "#E1E7F3", minHeight: "100vh" }}>
            <Main />
            {!isLoggedIn && <Navigate to="/" />}
            <SessionChecker />
            <div>
                <Routes>
                    <Route path="/dashboard" element={<DashboardComponent />} />
                    <Route
                        path="admin/company"
                        element={
                            <PermissionChecker permission={1001}>
                                <Company />
                            </PermissionChecker>
                        }
                    />
                    <Route
                        path="admin/supplier"
                        element={
                            <PermissionChecker permission={1001}>
                                <Supplier />
                            </PermissionChecker>
                        }
                    />
                    <Route
                        path="admin/customer"
                        element={
                            <PermissionChecker permission={1001}>
                                <Customer />
                            </PermissionChecker>
                        }
                    />
                    <Route
                        path="admin/item"
                        element={
                            <PermissionChecker permission={1001}>
                                <Item />
                            </PermissionChecker>
                        }
                    />
                    <Route
                        path="admin/stock-location"
                        element={
                            <PermissionChecker permission={1001}>
                                <Stock_Location />
                            </PermissionChecker>
                        }
                    />
                    <Route
                        path="admin/batch"
                        element={
                            <PermissionChecker permission={1001}>
                                <Batch />
                            </PermissionChecker>
                        }
                    />
                    <Route
                        path="admin/grn"
                        element={
                            <PermissionChecker permission={1001}>
                                <GRN />
                            </PermissionChecker>
                        }
                    />
                    <Route
                        path="admin/stock"
                        element={
                            <PermissionChecker permission={1001}>
                                <Stock />
                            </PermissionChecker>
                        }
                    />

                    <Route
                        path="admin/bom"
                        element={
                            <PermissionChecker permission={1001}>
                                <BOM />
                            </PermissionChecker>
                        }
                    />

                    <Route
                        path="admin/production"
                        element={
                            <PermissionChecker permission={1001}>
                                <Production />
                            </PermissionChecker>
                        }
                    />

                    <Route
                        path="sale/sales-invoice"
                        element={
                            <PermissionChecker permission={1001}>
                                <SalesInvoice />
                            </PermissionChecker>
                        }
                    />

                    <Route
                        path="admin/milling"
                        element={
                            <PermissionChecker permission={1001}>
                                <Milling />
                            </PermissionChecker>
                        }
                    />

                     <Route
                        path="admin/steaming"
                        element={
                            <PermissionChecker permission={1001}>
                                <Steam />
                            </PermissionChecker>
                        }
                    />

                       <Route
                        path="admin/mapping"
                        element={
                            <PermissionChecker permission={1001}>
                                <ProductionMapping />
                            </PermissionChecker>
                        }
                    />

                        <Route
                        path="admin/customer-outstanding"
                        element={
                            <PermissionChecker permission={1001}>
                                <CustomerOutstanding />
                            </PermissionChecker>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};
export default Layout;