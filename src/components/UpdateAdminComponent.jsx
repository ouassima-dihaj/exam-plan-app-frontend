import React, { useState, useEffect } from 'react';
import { updateAdmin, getAdminById } from '../services/AdminService'; // Ensure you're using the correct service
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateAdminComponent({ adminId, onUpdateSuccess, onCancel }) { // Use adminId instead of enseignantId
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (adminId) {
            console.log('Fetching admin data for ID:', adminId); // Log the adminId
            const fetchAdmin = async () => {
                try {
                    const response = await getAdminById(adminId); // Ensure the correct API call
                    const admin = response.data;
                    setNom(admin.nom);
                    setPrenom(admin.prenom);
                } catch (error) {
                    console.error('Error fetching admin data:', error);
                    setError('Error fetching admin data');
                }
            };
            fetchAdmin();
        } else {
            console.error('Invalid admin ID:', adminId); // Log the invalid ID case
            setError('Invalid admin ID');
        }
    }, [adminId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            nom: nom,
            prenom: prenom
        };

        try {
            const response = await updateAdmin(adminId, formData); // Ensure the correct API call

            if (response.status === 200) {
                onUpdateSuccess();
            } else {
                setError('Failed to update admin. Unexpected response from the server.');
            }
        } catch (error) {
            console.error('Error updating admin:', error);
            setError('Error updating admin');
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                <h3 className="mb-4">Update Admin</h3>
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
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
}

export default UpdateAdminComponent;
