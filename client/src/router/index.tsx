import React from "react";
import { RouteObject } from "react-router-dom";
import AuthPage from "../features/auth/pages";
import MovieJournalPage from "../features/movieJournal/pages";
import ProfilePage from "../features/profile/pages";
import MembershipPage from "../features/membership/pages";
import HomePage from "../features/home/pages";
import AdminStatisticsPage from "../features/admin/pages";
import ProtectedRoute from "../globalComponents/ProtectedRoute";

const routes: RouteObject[] = [
  //Auth
  { path: "/login", element: <AuthPage /> },
  { path: "/register", element: <AuthPage /> },

  //User
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: "/movieJournal", element: <MovieJournalPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/membership", element: <MembershipPage /> },

  //Admin
  {
    path: "/admin",
    element: (
      <ProtectedRoute isAdmin>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: "/admin/adminStatistics", element: <AdminStatisticsPage /> },
  { path: "/admin/movieJournal", element: <MovieJournalPage /> },
  { path: "/admin/profile", element: <ProfilePage /> },
  { path: "/admin/membership", element: <MembershipPage /> },
];

export default routes;
