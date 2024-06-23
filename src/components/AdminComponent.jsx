import React, { useState } from "react";
import { saveAdmin } from "../services/AdminService";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminComponent() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [error, setError] = useState(null);
    const [creneaux, setCreneaux] = useState([{ jour: "", heure_debut_dispo: "", heure_fin_dispo: "" }]);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nom: nom,
            prenom: prenom,
            creneaux: creneaux
        };

        saveAdmin(formData)
        .then((response) => {
          console.log("Form data sent successfully:", response.data);
          setSuccessMessage("Admin added successfully!");
          setError(null);
          // Optionally, reset the form fields here
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          setError("Failed to save admin. Please check your input and try again.");
          setSuccessMessage(null);
        });
    };

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
            <h2 className="mb-4">Admin Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prenom</label>
                    <input type="text" className="form-control" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AdminComponent;
