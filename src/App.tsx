import React, { useContext } from 'react';

import './styles/globals.scss';
import styles from './styles/app.module.scss';

import Header from './components/Header';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Users from './components/Users';
import Posts from './components/Posts';

function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Users/>} />
          <Route path="/posts" element={<Posts/>} />
      </Routes>
    </Router>
  );
}

export default App;
