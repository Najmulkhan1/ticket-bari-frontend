import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/Dashboard/UserProfile";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AddTicket from "../pages/Dashboard/VendorDashboard/AddTicket";
import MyAddedTickets from "../pages/Dashboard/VendorDashboard/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/VendorDashboard/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/VendorDashboard/RevenueOverview";
import AllTickets from "../pages/AllTickets/AllTrickts";
import TicketsDetails from "../pages/TicketsDetails/TicketsDetails";
import MyBookedTickets from "../pages/Dashboard/UserDashboard/MyBookedTickets";
import TransactionHistory from "../pages/Dashboard/UserDashboard/TransactionHistory";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/all-tickets",
        Component: AllTickets,
      },
      {
        path: '/tickets-details/:id',
        Component: TicketsDetails
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "user-profile",
        Component: UserProfile,
      },

      {
        path: "payment-success",
        Component: PaymentSuccess,
      },

      // user Dashboard
      {
        path: "my-bookings",
        Component: MyBookedTickets,
      },
      {
        path: "transaction-history",
        Component: TransactionHistory,
      },

      // vendor Dashboard **only see the vendor it not working
      // it also private to se the only vendor
      {
        path: "add-ticket",
        element: <AddTicket></AddTicket>,
      },
      {
        path: "my-added-tickets",
        element: <MyAddedTickets></MyAddedTickets>
      },
      {
        path: 'requested-bookings',
        element: <RequestedBookings></RequestedBookings>
      },
      {
        path: 'revenue-overview',
        element: <RevenueOverview></RevenueOverview>
      }
    ],
  },
]);
