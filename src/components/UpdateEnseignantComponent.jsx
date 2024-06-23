import React, { useState, useEffect } from 'react';
import { updateEnseignant, getEnseignantById } from '../services/EnseignantService';
import { getDepartements } from "../services/DepartementService";
import { getFilieres } from "../services/FiliereService";
import { getGroupes } from "../services/GroupeService";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateEnseignantComponent({ enseignantId, onUpdateSuccess, onCancel }) {
    const [idDepartement, setIdDepartement] = useState(null);
    const [idFiliere, setIdFiliere] = useState(null);
    const [idGroupe, setIdGroupe] = useState(null);
    const [idSalle, setIdSalle] = useState(null);
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [error, setError] = useState(null);
    const [departements, setDepartements] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [groupes, setGroupes] = useState([]);

    useEffect(() => {
        getDepartements()
            .then((response) => {
                setDepartements(response.data);
            })
            .catch((error) => {
                console.error("Error fetching departements:", error);
            });
    }, []);

    useEffect(() => {
        getFilieres()
            .then((response) => {
                setFilieres(response.data);
            })
            .catch((error) => {
                console.error("Error fetching filieres:", error);
            });
    }, []);

    useEffect(() => {
        getGroupes()
            .then((response) => {
                setGroupes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching groupes:", error);
            });
    }, []);

    useEffect(() => {
        const fetchEnseignant = async () => {
            try {
                const response = await getEnseignantById(enseignantId);
                const enseignant = response.data;
                setIdDepartement(enseignant.idDepartment);
                setIdFiliere(enseignant.idFiliere);
                setIdGroupe(enseignant.idGroupe);
                setIdSalle(enseignant.idSalle);
                setEmail(enseignant.email);
                setNom(enseignant.nom);
                setPrenom(enseignant.prenom);
            } catch (error) {
                console.error('Error fetching enseignant data:', error);
                setError('Error fetching enseignant data');
            }
        };

        fetchEnseignant();
    }, [enseignantId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            idDepartment: idDepartement,
            idFiliere: idFiliere,
            idGroupe: idGroupe,
            idSalle: idSalle,
            email: email,
            nom: nom,
            prenom: prenom
        };

        console.log('Submitting form data:', formData);

        try {
            const response = await updateEnseignant(enseignantId, formData);

            if (response.status === 200) {
                onUpdateSuccess();
            } else {
                setError('Failed to update enseignant. Unexpected response from the server.');
            }
        } catch (error) {
            console.error('Error updating enseignant:', error);
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                <h3 className="mb-4">Update Enseignant</h3>
                <div className="form-group">
                    <label>Nom</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nom" 
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Prenom</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="prenom" 
                        value={prenom} 
                        onChange={(e) => setPrenom(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <select 
                        name="department_id" 
                        className="form-control" 
                        value={idDepartement || ''} 
                        onChange={(e) => setIdDepartement(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {departements.map((item) => (
                            <option key={item.idDepartment} value={item.idDepartment}>
                                {item.nomDepartment}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Filiere</label>
                    <select 
                        name="filiere_id" 
                        className="form-control" 
                        value={idFiliere || ''} 
                        onChange={(e) => setIdFiliere(e.target.value)}
                    >
                        <option value="">Select Filiere</option>
                        {filieres.map((item) => (
                            <option key={item.idFiliere} value={item.idFiliere}>
                                {item.nomFiliere}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Groupe</label>
                    <select 
                        name="groupe_id" 
                        className="form-control" 
                        value={idGroupe || ''} 
                        onChange={(e) => setIdGroupe(e.target.value)}
                    >
                        <option value="">Select Groupe</option>
                        {groupes.map((item) => (
                            <option key={item.idGroupe} value={item.idGroupe}>
                                {item.nomGroupe}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
}

export default UpdateEnseignantComponent;
