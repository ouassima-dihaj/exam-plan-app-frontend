import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">ExamPlan</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/en" className="nav-link">Enseignants Management</Link>
          </li>
          <li className="nav-item">
            <Link to="/enseignant" className="nav-link">Enseignants Creation</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admins">Admins Creation</Link>
          </li>          
          <li className="nav-item">
            <Link className="nav-link" to="/adminsm">Admins Management</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/exam">Exam Creation</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/elem">Element Creation</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/exams">Exams</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
