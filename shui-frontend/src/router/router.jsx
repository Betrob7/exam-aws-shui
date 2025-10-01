import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.jsx";
import WriteMsgPage from "../pages/WriteMsgPage/WriteMsgPage.jsx";
import FlowPage from "../pages/FlowPage/FlowPage.jsx";
import UserMessagesPage from "../pages/UserMessagesPage/UserMessagesPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/writemsg",
    element: <WriteMsgPage />,
  },
  {
    path: "/flow",
    element: <FlowPage />,
  },
  {
    path: "/user/:username",
    element: <UserMessagesPage />,
  },
]);
