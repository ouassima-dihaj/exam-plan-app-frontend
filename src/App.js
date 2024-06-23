import React from "react";
import ExamComponent from "./components/ExamComponent";
import ElementPedagogiquePage from "./components/ElementPadagogique";
import AdminComponent from "./components/AdminComponent";
import ExamDetailsComponent from "./components/ExamDetailsComponent";
import ListEnseignantComponent from "./components/ListEnseignantComponent";
import EnseignantComponent from "./components/EnseignantComponent";
import ListAdminComponent from "./components/ListAdminComponent";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
function App() {
  return (


      <Router>
        <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/exam" element={<ExamComponent />} /> {/* Define route for Exam component */}
        <Route path="/elem" element={<ElementPedagogiquePage/>} />
        <Route path="/admins" element={<AdminComponent/>} />
        <Route path="/examdetails" element={<ExamDetailsComponent/>} />
        <Route path="/en" element={<ListEnseignantComponent/>} />
        <Route path="/exams" element={<ExamDetailsComponent/>} />
        <Route path="/enseignant" element={<EnseignantComponent/>} />
        <Route path="/adminsm" element={<ListAdminComponent/>} />
      </Routes>
    </Router>

  );
}

export default App;
/**<ExamComponent />*/
