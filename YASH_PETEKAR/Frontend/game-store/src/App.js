import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { BrowserRouter , Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Register from './components/Register';
import Login from './components/Login';


export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);

  return (
    <AppContext.Provider value={{ library, setLibrary }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
