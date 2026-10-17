import AuthPage from "../pages/AuthPage";
import AgentHub from "../pages/AgentHub";
import PdfReaderAgent from "../pages/PdfReaderAgent";
import Root from "../pages/Root";

export const publicRoutes = [
  { path: "/", element: <Root /> },
  { path: "/login", element: <AuthPage mode="login" /> },
  { path: "/register", element: <AuthPage mode="register" /> },
];

export const protectedRoutes = [
  { path: "/home", element: <AgentHub /> },
  { path: "/agents/pdf-reader", element: <PdfReaderAgent /> },
];
