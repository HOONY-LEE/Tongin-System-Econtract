import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loading-screen";
import ProtectedRouteUser from "./components/protected-route-user";
import Admin from "./routes/admin";
import ProtectedRouteAdmin from "./components/protected-route-admin";
import AdminLayout from "./components/adminLayout";
import "./static/fonts/font.css";
import Detail from "./routes/detail";
import "react-day-picker/dist/style.css";
import LandingPage from "./routes/landingPage";
import SiteTabPage from "./components/site/main/siteTabComponent";
import Signature from "./routes/signature";
import ContractImage from "./components/home/contractImage";
import DrawingComponent from "./components/detail/drawingComponent";
import DrawPanelComponent from "./components/detail/drawPanelComponent";
import Terms from "./routes/terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouteUser>
        <Layout></Layout>
      </ProtectedRouteUser>
    ),
    children: [
      {
        path: "",
        element: <LandingPage></LandingPage>,
      },
      {
        path: "onsitecontract",
        element: <SiteTabPage></SiteTabPage>,
      },
      {
        path: "contractlist",
        element: <Home></Home>,
      },

      {
        path: "contractlist/detail/:id",
        element: <Detail></Detail>,
        // children: [
        //   {
        //     path: "drawingpanel",
        //     element: <DrawingComponent></DrawingComponent>,
        //   },
        // ],
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRouteAdmin>
        <AdminLayout></AdminLayout>
      </ProtectedRouteAdmin>
    ),
    children: [
      {
        path: "",
        element: <Admin></Admin>,
      },
      {
        path: "create-account",
        element: <CreateAccount></CreateAccount>,
      },
    ],
  },
  {
    path: "/signature/:id",
    element: <Signature></Signature>,
  },
  {
    path: "/drawing/:id",
    element: <DrawingComponent></DrawingComponent>,
  },
  {
    path: "/contractImage/:id",
    element: <ContractImage></ContractImage>,
  },
  {
    path: "/terms",
    element: <Terms></Terms>,
  },
]);

const GlobalStyles = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
  }
body {
  background-color: #fafafa;
  color: black;
  font-family: 'Pretendard';
}
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <RouterProvider router={router}></RouterProvider>
      )}
    </>
  );
}
export default App;
