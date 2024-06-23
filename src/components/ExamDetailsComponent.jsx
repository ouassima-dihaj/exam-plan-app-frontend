import React, { useState, useEffect } from 'react';
import { getExams } from '../services/ExamService';
import { getSallesByExam } from '../services/SalleService';
import { getEnseignantByIdSalleAndAvailability } from '../services/EnseignantService';
import { getAdminByIdSalle } from '../services/AdminService';

const ExamDetailsComponent = () => {
    const [exams, setExams] = useState([]);
    const [examSalles, setExamSalles] = useState({});
    const [surveillants, setSurveillants] = useState({});
    const [admins, setAdmins] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        getExams()
            .then(response => {
                setExams(response.data);
                response.data.forEach(exam => {
                    getSallesByExam(exam.idExamen)
                        .then(sallesResponse => {
                            setExamSalles(prevExamSalles => ({
                                ...prevExamSalles,
                                [exam.idExamen]: sallesResponse.data,
                            }));
                            sallesResponse.data.forEach(salle => {
                                getEnseignantByIdSalleAndAvailability(salle.idSalle)
                                    .then(response => {
                                        setSurveillants(prevSurveillants => ({
                                            ...prevSurveillants,
                                            [salle.idSalle]: response.data.filter(person => person.type === 'Enseignant'),
                                        }));
                                    })
                                    .catch(error => {
                                        console.error("Error fetching surveillants for salle:", salle.idSalle, error);
                                        setError("Failed to fetch surveillants. Please try again later.");
                                    });

                                getAdminByIdSalle(salle.idSalle)
                                    .then(response => {
                                        setAdmins(prevAdmins => ({
                                            ...prevAdmins,
                                            [salle.idSalle]: response.data.filter(person => person.type === 'Admin'),
                                        }));
                                    })
                                    .catch(error => {
                                        console.error("Error fetching admins for salle:", salle.idSalle, error);
                                        setError("Failed to fetch admins. Please try again later.");
                                    });
                            });
                        })
                        .catch(error => {
                            console.error("Error fetching salles for exam:", exam.idExamen, error);
                            setError("Failed to fetch salles. Please try again later.");
                        });
                });
            })
            .catch(error => {
                console.error("Error fetching exams:", error);
                setError("Failed to fetch exams. Please try again later.");
            });
    }, []);

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {exams.map(exam => (
                <div key={exam.idExamen} className="card mb-3">
                    <div className="card-body">
                        <h3 className="card-title">Exam Details</h3>
                        <p><strong>Date:</strong> {new Date(exam.date).toLocaleDateString()}</p>
                        <p><strong>Duration:</strong> {exam.dureeRelle} hours</p>
                        <p><strong>Teacher:</strong> {exam.enseignant}</p>
                        <p><strong>Start Time:</strong> {exam.heureDebut}</p>
                        <h4 className="mt-3">Salles:</h4>
                        {examSalles[exam.idExamen] ? (
                            examSalles[exam.idExamen].map(salle => (
                                <div key={salle.idSalle} className="mb-2">
                                    <p><strong>Salle:</strong> {salle.nom}</p>
                                    <h5>Surveillants:</h5>
                                    {surveillants[salle.idSalle] ? (
                                        surveillants[salle.idSalle].map((surveillant, index) => (
                                            <p key={index} className="ml-3">{surveillant.nom}</p>
                                        ))
                                    ) : (
                                        <p className="ml-3">Loading surveillants...</p>
                                    )}
                                    <h5>Admins:</h5>
                                    {admins[salle.idSalle] ? (
                                        admins[salle.idSalle].map((admin, index) => (
                                            <p key={index} className="ml-3">{admin.nom}</p>
                                        ))
                                    ) : (
                                        <p className="ml-3">Loading admins...</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Loading salles...</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExamDetailsComponent;
