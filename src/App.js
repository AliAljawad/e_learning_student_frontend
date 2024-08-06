// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { Provider } from "react-redux";
import store from './data_source/redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
