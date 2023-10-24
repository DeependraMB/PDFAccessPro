import "./App.css";
import HomePage from "./Pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import UserHomePage from "./Pages/UserHomePage";
import PaymentPage from "./Pages/PaymentPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
