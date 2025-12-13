import React from "react";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import { NavLink, Outlet } from "react-router";
import { FaRegCalendarCheck, FaTicketAlt } from "react-icons/fa";
import { MdAirplaneTicket, MdOutlineAirplaneTicket, MdOutlineShowChart, MdShowChart } from "react-icons/md";
import { FaTicketSimple } from "react-icons/fa6";
import { LuReplace } from "react-icons/lu";

const DashboardLayout = () => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">
              <img className="w-28" src={logo2} alt="" />
            </div>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                  to={"/"}
                >
                  <img className="w-6" src={logo} alt="" />

                  <span className="is-drawer-close:hidden">TicketBari</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/dashboard/user-profile"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="User Profile"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">User Profile</span>
                </NavLink>
              </li>

              {/* user */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Bookings"
                  to={"/dashboard/my-bookings"}
                >
                  <FaTicketSimple />

                  <span className="is-drawer-close:hidden">My Bookings</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Transaction History"
                  to={"/dashboard/transaction-history"}
                >
                  <LuReplace />

                  <span className="is-drawer-close:hidden">Transaction History</span>
                </NavLink>
              </li>

              {/* vendor */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Ticket"
                  to={"/dashboard/add-ticket"}
                >
                  <FaTicketAlt />

                  <span className="is-drawer-close:hidden">Add Ticket</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Added Tickets"
                  to={"/dashboard/my-added-tickets"}
                >
                  <MdOutlineAirplaneTicket />

                  <span className="is-drawer-close:hidden">
                    My Added Tickets
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Requested Bookings"
                  to={"/dashboard/requested-bookings"}
                >
                  <FaRegCalendarCheck />

                  <span className="is-drawer-close:hidden">
                    Requested Bookings
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Revenue Overview"
                  to={"/dashboard/revenue-overview"}
                >
                  <MdShowChart />

                  <span className="is-drawer-close:hidden">
                   Revenue Overview
                  </span>
                </NavLink>
              </li>


              {/* admin */}

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Tickets"
                  to={"/dashboard/manage-tickets"}
                >
                  <MdAirplaneTicket />

                  <span className="is-drawer-close:hidden">
                   Manage Tickets
                  </span>
                </NavLink>
              </li>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
