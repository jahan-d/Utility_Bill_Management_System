import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "../components/Layout";

// Pages
import Home from "../pages/Home/Home";
import Bills from "../pages/Bills/Bills";
import BillDetails from "../pages/Bills/BillDetails";
import MyBills from "../pages/MyBills/MyBills";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddBill from "../pages/AddBill/AddBill";

// Private Route
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // cleaner than path:"/"
      { path: "bills", element: <Bills /> },

      {
        path: "add-bill",
        element: (
          <PrivateRoute>
            <AddBill />
          </PrivateRoute>
        ),
      },

      {
        path: "bills/:id",
        element: (
          <PrivateRoute>
            <BillDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "my-bills",
        element: (
          <PrivateRoute>
            <MyBills />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Auth pages (No Layout)
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // 404 Page
  {
    path: "*",
    element: <Error />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
