import React, { useEffect, useState } from 'react';
import { getSalleName, getAllAdmins, deleteAdmin } from '../services/AdminService';
import UpdateAdminComponent from './UpdateAdminComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListAdminComponent() {
    const [admins, setAdmins] = useState([]);
    const [namesMap, setNamesMap] = useState({});
    const [updateId, setUpdateId] = useState(null);

    const fetchadminWithNames = async () => {
        try {
            const adminResponse = await getAllAdmins();
            const adminData = adminResponse.data;

            const sallePromises = adminData
                .filter(admin => admin.idSalle) // Filter out null or undefined idSalle
                .map(admin => 
                    getSalleName(admin.idSalle).then(response => ({
                        id: admin.idSalle,
                        name: response.data.nom,
                        type: 'salle'
                    }))
                );

            const results = await Promise.all(sallePromises);

            const newNamesMap = results.reduce((acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = {};
                }
                acc[item.type][item.id] = item.name;
                return acc;
            }, {});

            setNamesMap(newNamesMap);
            setAdmins(adminData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchadminWithNames();
    }, []);

    const handleDelete = async (idPersonnel) => {
        try {
            await deleteAdmin(idPersonnel);
            setAdmins(admins.filter(admin => admin.idPersonnel !== idPersonnel));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleUpdateSuccess = () => {
        setUpdateId(null);
        fetchadminWithNames();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Admin List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Salle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.idPersonnel}>
                            <td>{admin.idPersonnel}</td>
                            <td>{admin.nom}</td>
                            <td>{admin.prenom}</td>
                            <td>{namesMap.salle && namesMap.salle[admin.idSalle]}</td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm mr-2" 
                                    onClick={() => handleDelete(admin.idPersonnel)}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm" 
                                    onClick={() => { 
                                        console.log('Setting updateId:', admin.idPersonnel); 
                                        setUpdateId(admin.idPersonnel); 
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {updateId && (
                <UpdateAdminComponent 
                    adminId={updateId} 
                    onUpdateSuccess={handleUpdateSuccess} 
                    onCancel={() => setUpdateId(null)} 
                />
            )}
        </div>
    );
}

export default ListAdminComponent;
