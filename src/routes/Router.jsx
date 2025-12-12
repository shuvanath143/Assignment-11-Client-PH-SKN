import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
// import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";
import PrivateRoute from './PrivateRoute'
import DashboardLayout from "../layouts/DashboardLayout";
import AddLesson from "../pages/Dashboard/Users/AddLesson";
import Home from "../pages/Home/Home";
import Pricing from "../pages/Pricing/Pricing";
import LessonDetails from "../components/LessonCard/LessonDetails";
import PaymentSuccess from "../pages/Pricing/PaymentSuccess";
import PaymentCancelled from "../pages/Pricing/PaymentCancelled";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import MyLessons from "../pages/Dashboard/Users/MyLessons";
import AdminRoute from "./AdminRoute";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import LessonsManagement from "../pages/Dashboard/Admin/LessonsManagement";

// import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/public-lessons",
        Component: PublicLessons,
      },
      {
        path: "lessons/:id",
        Component: LessonDetails,
      },
      {
        path: "/pricing",
        Component: Pricing,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
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
        Component: AddLesson,
      },
      {
        path: "lessons/:id",
        Component: LessonDetails,
      },
      {
        path: "my-lessons",
        Component: MyLessons,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "admin",
        Component: AdminOverview
      },
      {
        path: "admin/manage-users", 
        Component: ManageUsers
      },
      {
        path: "admin/lesson-management",
        Component: LessonsManagement
      }
    ]
  },
]);