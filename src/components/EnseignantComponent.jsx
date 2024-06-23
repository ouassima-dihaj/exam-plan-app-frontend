import React, { useState, useEffect } from 'react';
import { saveEnseignant } from "../services/EnseignantService";
import { getDepartements } from "../services/DepartementService";
import { getFilieres } from "../services/FiliereService";
import { getGroupes } from "../services/GroupeService";

function EnseignantComponent() {
    const [idDepartement, setIdDepartement] = useState(null);
    const [idFiliere, setIdFiliere] = useState(null);
    const [idGroupe, setIdGroupe] = useState(null);
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [error, setError] = useState(null);
    const [departements, setDepartements] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [groupes, setGroupes] = useState([]);
    const [creneaux, setCreneaux] = useState([{ jour: "", heure_debut_dispo: "", heure_fin_dispo: "" }]);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            idDepartment: idDepartement,
            idFiliere: idFiliere,
            idGroupe: idGroupe,
            email: email,
            nom: nom,
            prenom: prenom,
            creneaux: creneaux
        };

        saveEnseignant(formData)
        .then((response) => {
          console.log("Form data sent successfully:", response.data);
          setSuccessMessage("Enseignant added successfully!");
          setError(null);
          // Optionally, reset the form fields here
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          setError("Failed to save enseignant. Please check your input and try again.");
          setSuccessMessage(null);
        });
    };

    useEffect(() => {
        getDepartements()
        .then((response) => {
            setDepartements(response.data);
        })
        .catch((error) => {
          console.error("Error fetching departements:", error);
          setError("Failed to fetch departements. Please try again later.");
        });
    }, []);

    useEffect(() => {
        getFilieres()
        .then((response) => {
            setFilieres(response.data);
        })
        .catch((error) => {
          console.error("Error fetching filieres:", error);
          setError("Failed to fetch filieres. Please try again later.");
        });
    }, []);

    useEffect(() => {
        getGroupes()
        .then((response) => {
            setGroupes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching groupes:", error);
          setError("Failed to fetch groupes. Please try again later.");
        });
    }, []);

    const handleCreneauxChange = (index, field, value) => {
        const newCreneaux = [...creneaux];
        newCreneaux[index][field] = value;
        setCreneaux(newCreneaux);
    };

    const addCreneaux = () => {
        setCreneaux([...creneaux, { jour: "", heure_debut_dispo: "", heure_fin_dispo: "" }]);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Enseignant Form</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Nom</label>
                                <input type="text" className="form-control" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Prenom</label>
                                <input type="text" className="form-control" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Department</label>
                                <select className="form-select" name="department_id" value={idDepartement} onChange={(e) => setIdDepartement(e.target.value)}>
                                    <option value="">Select Department</option>
                                    {departements.map((item) => (
                                        <option key={item.idDepartment} value={item.idDepartment}>
                                            {item.nomDepartment}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Filiere</label>
                                <select className="form-select" name="filiere_id" value={idFiliere} onChange={(e) => setIdFiliere(e.target.value)}>
                                    <option value="">Select Filiere</option>
                                    {filieres.map((item) => (
                                        <option key={item.idFiliere} value={item.idFiliere}>
                                            {item.nomFiliere}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Availabilities</label>
                            {creneaux.map((creneau, index) => (
                                <div key={index} className="row mb-2">
                                    <div className="col-md-4">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Jour" 
                                            value={creneau.jour} 
                                            onChange={(e) => handleCreneauxChange(index, "jour", e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input 
                                            type="time" 
                                            className="form-control" 
                                            placeholder="Heure Debut" 
                                            value={creneau.heure_debut_dispo} 
                                            onChange={(e) => handleCreneauxChange(index, "heure_debut_dispo", e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input 
                                            type="time" 
                                            className="form-control" 
                                            placeholder="Heure Fin" 
                                            value={creneau.heure_fin_dispo} 
                                            onChange={(e) => handleCreneauxChange(index, "heure_fin_dispo", e.target.value)} 
                                        />
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline-primary" onClick={addCreneaux}>Add Availability</button>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <button type="submit" className="btn btn-success w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EnseignantComponent;
