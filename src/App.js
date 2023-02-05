import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="login" element={ <LoginPage/> } />
        <Route path="signup" element={ <SignupPage/> } />
      </Routes>
    </div>
  );
}

export default App;
