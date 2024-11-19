import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/styles.css';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Checkout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
