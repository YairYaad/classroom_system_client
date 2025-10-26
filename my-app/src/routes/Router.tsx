import React from "react";
import { Route, Routes } from "react-router-dom";
import { Classes } from "../pages/ClassesPage/Classes";
import { Students } from "../pages/StudentsPage/Students";
import { Create } from "../pages/CreatePage/Create";

const routes = [
  { path: "/", element: <Classes /> },
  { path: "/classes", element: <Classes /> },
  { path: "/students", element: <Students /> },
  { path: "/create", element: <Create /> },
];

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRouter;