import React from "react";
import { RouteObject } from "react-router-dom";
import AuthPage from "../features/auth/pages";
import MovieJournalPage from "../features/movieJournal/pages";
import ProfilePage from "../features/profile/pages";
import MembershipPage from "../features/membership/pages";
import HomePage from "../features/home/pages";
import AdminStatisticsPage from "../features/admin/pages";
import ProtectedRoute from "../globalComponents/ProtectedRoute";
import MainLayout from "src/layouts/MainLayout";

const routes: RouteObject[] = [
  { path: "/login", element: <AuthPage /> },
  { path: "/register", element: <AuthPage /> },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", index: true, element: <HomePage /> },
          { path: "movieJournal", element: <MovieJournalPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "membership", element: <MembershipPage /> },
        ],
      },
    ],
  },

  // Admin routes
  {
    element: <ProtectedRoute isAdmin />,
    children: [
      {
        path: "/admin",
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "adminStatistics", element: <AdminStatisticsPage /> },
          { path: "movieJournal", element: <MovieJournalPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "membership", element: <MembershipPage /> },
        ],
      },
    ],
  },
];

export default routes;
