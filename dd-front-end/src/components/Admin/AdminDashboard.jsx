// AdminDashboard.js
import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import AdminSellerRequests from "./AdminSellerRequests";
import AdminTransactions from "./AdminTransactions";

const AdminDashboard = () => {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
      <div className="flex justify-between">
        <Link
          to={`${url}/products`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View Products
        </Link>
        <Link
          to={`${url}/seller-requests`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View Seller Requests
        </Link>
        <Link
          to={`${url}/transactions`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View Transactions
        </Link>
      </div>
      <Switch>
        <Route exact path={path}>
          {/* Render some default component or message */}
        </Route>
        <Route path={`${path}/products`}>
          <AdminProducts />
        </Route>
        <Route path={`${path}/seller-requests`}>
          <AdminSellerRequests />
        </Route>
        <Route path={`${path}/transactions`}>
          <AdminTransactions />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminDashboard;
