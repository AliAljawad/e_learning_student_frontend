import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./data_source/redux/store";
import SignUpPage from "./pages/signup";
import LoginPage from "./pages/login";
import CoursesPage from "./pages/courses";
import DashboardPage from "./pages/dashboard";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
