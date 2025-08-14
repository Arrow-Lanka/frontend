import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogingPage from '../app/components/authorization/loging/NewLogin';
import Layout from "../app/components/layout/Layout";
import Supplier from "../app/components/admin/supllier/Supplier";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" component={LogingPage} />
                <Route path="/alt*" component={Layout} />
               
            </Routes>
        </Router>   
    );
};

export default AppRoutes;