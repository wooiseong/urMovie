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
import EditJournalPage from "src/features/home/pages/EditJournalPage";
import JournalDetailsPage from "src/features/home/pages/JournalDetailsPage";

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
          { path: "journalDetails/:id", element: <JournalDetailsPage /> },
          { path: "editJournal", element: <EditJournalPage /> },
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
          { path: "journalDetails/:id", element: <JournalDetailsPage /> },
          { path: "editJournal", element: <EditJournalPage /> },
          { path: "movieJournal", element: <MovieJournalPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "membership", element: <MembershipPage /> },
        ],
      },
    ],
  },
];

export default routes;
