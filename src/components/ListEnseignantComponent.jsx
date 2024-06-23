import React, { useEffect, useState } from 'react';
import { getEnseignants, getDepartmentName, getFiliereName, getGroupeName, getSalleName, deleteEnseignant } from '../services/EnseignantService';
import UpdateEnseignantComponent from './UpdateEnseignantComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function EnseignantListComponent() {
    const [enseignants, setEnseignants] = useState([]);
    const [namesMap, setNamesMap] = useState({});
    const [updateId, setUpdateId] = useState(null);

    const fetchEnseignantsWithNames = async () => {
        try {
            const enseignantsResponse = await getEnseignants();
            const enseignantsData = enseignantsResponse.data;

            const departmentPromises = enseignantsData
                .filter(enseignant => enseignant.idDepartment)
                .map(enseignant => 
                    getDepartmentName(enseignant.idDepartment).then(response => ({
                        id: enseignant.idDepartment,
                        name: response.data.nomDepartment,
                        type: 'department'
                    }))
                );

            const filierePromises = enseignantsData
                .filter(enseignant => enseignant.idFiliere)
                .map(enseignant => 
                    getFiliereName(enseignant.idFiliere).then(response => ({
                        id: enseignant.idFiliere,
                        name: response.data.nomFiliere,
                        type: 'filiere'
                    }))
                );

            const groupePromises = enseignantsData
                .filter(enseignant => enseignant.idGroupe)
                .map(enseignant => 
                    getGroupeName(enseignant.idGroupe).then(response => ({
                        id: enseignant.idGroupe,
                        name: response.data.nom,
                        type: 'groupe'
                    }))
                );

            const sallePromises = enseignantsData
                .filter(enseignant => enseignant.idSalle)
                .map(enseignant => 
                    getSalleName(enseignant.idSalle).then(response => ({
                        id: enseignant.idSalle,
                        name: response.data.nom,
                        type: 'salle'
                    }))
                );

            const allPromises = [
                ...departmentPromises,
                ...filierePromises,
                ...groupePromises,
                ...sallePromises
            ];

            const results = await Promise.all(allPromises);

            const newNamesMap = results.reduce((acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = {};
                }
                acc[item.type][item.id] = item.name;
                return acc;
            }, {});

            setNamesMap(newNamesMap);
            setEnseignants(enseignantsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchEnseignantsWithNames();
    }, []);

    const handleDelete = async (idPersonnel) => {
        try {
            await deleteEnseignant(idPersonnel);
            setEnseignants(enseignants.filter(enseignant => enseignant.idPersonnel !== idPersonnel)); //setting the enseignants with new enseignants array without the deleted enseignant
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleUpdateSuccess = () => {
        setUpdateId(null);
        fetchEnseignantsWithNames();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Enseignant List</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Filiere</th>
                        <th>Groupe</th>
                        <th>Salle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enseignants.map((enseignant) => (
                        <tr key={enseignant.idPersonnel}>
                            <td>{enseignant.idPersonnel}</td>
                            <td>{enseignant.nom}</td>
                            <td>{enseignant.prenom}</td>
                            <td>{enseignant.email}</td>
                            <td>{namesMap.department && namesMap.department[enseignant.idDepartment]}</td>
                            <td>{namesMap.filiere && namesMap.filiere[enseignant.idFiliere]}</td>
                            <td>{namesMap.groupe && namesMap.groupe[enseignant.idGroupe]}</td>
                            <td>{namesMap.salle && namesMap.salle[enseignant.idSalle]}</td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm mr-2" 
                                    onClick={() => handleDelete(enseignant.idPersonnel)}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm" 
                                    onClick={() => setUpdateId(enseignant.idPersonnel)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {updateId && (
                <UpdateEnseignantComponent 
                    enseignantId={updateId} 
                    onUpdateSuccess={handleUpdateSuccess} 
                    onCancel={() => setUpdateId(null)} //if canceled set the update id to null so the update component will not be displayed
                />
            )}
        </div>
    );
}

export default EnseignantListComponent;
