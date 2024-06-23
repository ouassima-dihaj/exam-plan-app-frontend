import React, { useState, useEffect } from "react";
import {
  addElementPedagogique,
  fetchAllElementsPedagogiques,
  fetchEnseignants,
  deleteElementPedagogique,
  updateElementPedagogique,
} from "../services/ElemPedagogieService";

const ElementPedagogiquePage = () => {
  const [elements, setElements] = useState([]);
  const [titre, setTitre] = useState("");
  const [niveau, setNiveau] = useState("");
  const [type, setType] = useState("");
  const [enseignantId, setEnseignantId] = useState("");
  const [enseignants, setEnseignants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentElementId, setCurrentElementId] = useState(null);

  useEffect(() => {
    fetchAllElementsPedagogiques()
      .then((response) => {
        setElements(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the elements!", error);
      });

    fetchEnseignants()
      .then((response) => {
        setEnseignants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the enseignants!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newElement = {
        titre,
        niveau,
        type,
        enseignant: { idPersonnel: enseignantId },
    };

    if (isEditing) {
        updateElementPedagogique(currentElementId, newElement)
            .then((response) => {
                console.log("Element Pedagogique updated successfully", response.data);
                return fetchAllElementsPedagogiques(); // Fetch updated list
            })
            .then((response) => {
                setElements(response.data);
                resetForm();
            })
            .catch((error) => {
                console.error("There was an error updating the Element Pedagogique!", error);
            });
    } else {
        addElementPedagogique(newElement)
            .then((response) => {
                console.log("Element Pedagogique added successfully", response.data);
                return fetchAllElementsPedagogiques(); // Fetch updated list
            })
            .then((response) => {
                setElements(response.data);
                resetForm();
            })
            .catch((error) => {
                console.error("There was an error adding the Element Pedagogique!", error);
            });
    }
};


  const handleDelete = (id) => {
    deleteElementPedagogique(id)
      .then((response) => {
        console.log("Element Pedagogique deleted successfully", response.data);
        const updatedElements = elements.filter(
          (element) => element.idElemPedagogique !== id
        );
        setElements(updatedElements);
      })
      .catch((error) => {
        console.error(
          "There was an error deleting the Element Pedagogique!",
          error
        );
      });
  };

  const handleEdit = (element) => {
    setTitre(element.titre);
    setNiveau(element.niveau);
    setType(element.type);
    setEnseignantId(element.enseignant.idPersonnel);
    setIsEditing(true);
    setCurrentElementId(element.idElemPedagogique);
  };

  const resetForm = () => {
    setTitre("");
    setNiveau("");
    setType("");
    setEnseignantId("");
    setIsEditing(false);
    setCurrentElementId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">{isEditing ? "Edit" : "Add"} Element Pédagogique</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Titre:</label>
          <input
            type="text"
            className="form-control"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Niveau:</label>
          <input
            type="text"
            className="form-control"
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Enseignant:</label>
          <select
            className="form-control"
            value={enseignantId}
            onChange={(e) => setEnseignantId(e.target.value)}
            required
          >
            <option value="">Select Enseignant</option>
            {enseignants.map((enseignant) => (
              <option
                key={enseignant.idPersonnel}
                value={enseignant.idPersonnel}
              >
                {enseignant.nom} {enseignant.prenom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          {isEditing ? "Update" : "Add"} Element Pedagogique
        </button>
        {isEditing && (
          <button type="button" className="btn btn-secondary btn-sm ml-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <h2 className="mb-4 text-center">Elements Pédagogiques</h2>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Titre</th>
            <th>Niveau</th>
            <th>Type</th>
            <th>Enseignant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((element) => (
            <tr key={element.idElemPedagogique}>
              <td>{element.titre}</td>
              <td>{element.niveau}</td>
              <td>{element.type}</td>
              <td>
                {element.enseignant.nom} {element.enseignant.prenom}
              </td>
              <td>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(element)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(element.idElemPedagogique)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElementPedagogiquePage;
