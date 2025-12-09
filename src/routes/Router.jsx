import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
// import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";
import PrivateRoute from './PrivateRoute'
import DashboardLayout from "../layouts/DashboardLayout";
import AddLesson from "../pages/Dashboard/AddLesson";
import Home from "../pages/Home/Home";
import LessonDetails from "../components/LessonCard/LessonDetails";

// import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-lesson",
        Component: AddLesson
      },
      {
        path: "lessons/:id",
        Component: LessonDetails
      }
    ],
  },
]);