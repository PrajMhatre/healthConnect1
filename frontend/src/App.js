// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import './App.css';
import DiseaseForm from "./components/DiseasePrediction/DiseaseForm";
import DiseasePredictionResult from "./components/DiseasePrediction/DiseaseResult";
import DoctorList from "./components/DoctorRecommendation/DoctorList";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DoctorDetails from "./components/Auth/DoctorDetails";
import UserPreferences from "./components/DoctorRecommendation/UserPreferences";
import AuthCheck from "./AuthCheck";
import UserProfile from './components/Profile/UserProfile';


const App = () => {
    return (
        <Router>
            <AuthCheck />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/disease-prediction" element={<DiseaseForm />} />
                <Route path="/disease-prediction/result" element={<DiseasePredictionResult />} />
                <Route path="/doctor-list" element={<DoctorList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/doctor-details" element={<DoctorDetails />} />
                <Route path="/userPreferences" element={<UserPreferences />} />
                <Route path="/user-profile" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
