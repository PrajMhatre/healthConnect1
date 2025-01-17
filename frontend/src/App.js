// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import './App.css';
import DiseasePredictionForm from "./components/DiseasePrediction/DiseaseForm";
import DiseasePredictionResult from "./components/DiseasePrediction/DiseaseResult";
import DoctorList from "./components/DoctorRecommendation/DoctorList";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/disease-prediction" element={<DiseasePredictionForm />} />
                <Route path="/disease-prediction/result" element={<DiseasePredictionResult />} />
                <Route path="/doctor-recommendation" element={<DoctorList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
