import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage'
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={ <HomePage/> } exact/>
        </Route>
        <Route path="login" element={ <LoginPage/> } />
        <Route path="signup" element={ <SignupPage/> } />
      </Routes>
    </div>
  );
}

export default App;
