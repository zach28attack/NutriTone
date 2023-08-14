import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import CoachPage from "./pages/CoachPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/stats",
        element: <StatsPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/coach",
        element: <CoachPage />,
      },
    ],
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
