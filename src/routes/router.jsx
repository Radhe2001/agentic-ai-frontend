import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import { protectedRoutes, publicRoutes } from "./routes";

const ProtectedRoutes = () => {
  const [isAuthenticated] = useState(localStorage.getItem("token") !== null);

  return isAuthenticated ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route element={<ProtectedRoutes />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
