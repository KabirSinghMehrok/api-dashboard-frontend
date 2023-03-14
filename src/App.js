import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="user" element={ <UserDashboard/> } exact/>
          <Route path="admin" element={ <AdminDashboard/> } exact/>
        </Route>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="login" element={ <LoginPage/> } />
        <Route path="signup" element={ <SignupPage/> } />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
