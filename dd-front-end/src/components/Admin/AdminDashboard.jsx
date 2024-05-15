// AdminDashboard.js
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import AdminSellerRequests from "./AdminSellerRequests";
import AdminTransactions from "./AdminTransactions";

const AdminDashboard = () => {
  // let { path, url } = useRouteMatch();
  const url = "/admin/dashboard";
  return (
    <div>
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
      <div className="flex justify-between">
        <Link
          to={`/products`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View Products
        </Link>
        <Link
          to={`./seller-requests`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View Seller Requests
        </Link>
        <Link
          to={`/transactions`}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          View Transactions
        </Link>
      </div>
      {/* <Routes> */}
      {/* <Route exact path={path}> */}
      {/* Render some default component or message */}
      {/* </Route> */}
      {/* <Route path={`/products`}>
          <AdminProducts />
        </Route>
        <Route path={`/seller-requests`}>
          <AdminSellerRequests />
        </Route>
        <Route path={`/transactions`}>
          <AdminTransactions />
        </Route>
      </Routes> */}
    </div>
  );
};

export default AdminDashboard;
