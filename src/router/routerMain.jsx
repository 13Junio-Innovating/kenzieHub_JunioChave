import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RegisterPage } from "../pages/registerPage/register";
import { LoginPage } from "../pages/loginPage/login";
import { useEffect } from "react";
import { DashboardPage } from "../pages/dashboardPage/DashboardPage";
import { Error404Page } from "../pages/error404Page";

export const RouterMain = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const getToken = localStorage.getItem("@token");

    if (!getToken) {
      if (pathname !== "/login" && pathname !== "/register") {
        navigate("/login");
      }
    }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};

export default RouterMain;
