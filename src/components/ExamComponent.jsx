import React, { useState, useEffect } from "react";
import { saveExam } from "../services/ExamService";
import { getSemestres } from "../services/SemestreService";
import { getSalles } from "../services/SalleService";
import { getGroupes } from "../services/GroupeService";
import { getEnseignants } from "../services/EnseignantService";
import { getElements } from "../services/ElemPedagogieService";
import 'bootstrap/dist/css/bootstrap.min.css';

function ExamComponent() {
  const [idSemestre, setIdSemestre] = useState(null);
  const [semestres, setSemestres] = useState([]);
  const [idSession, setIdSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [type, setType] = useState("");
  const [idCoordonnateur, setIdCoordonnateur] = useState(null);
  const [coordonnateurs, setCoordonnateurs] = useState([]);
  const [idelementPedagogique, setIdElementPedagogique] = useState(null);
  const [elementPedagogiques, setElementPedagogiques] = useState([]);
  const [idSalle, setIdSalle] = useState(null);
  const [salles, setSalles] = useState([]);
  const [idGroupe, setIdGroupe] = useState(null);
  const [groupes, setGroupes] = useState([]);
  const [selectedSalles, setSelectedSalles] = useState([]);
  const [date, setDate] = useState(null);
  const [heureDebut, setHeureDebut] = useState(null);
  const [dureePrevue, setDureePrevue] = useState(null);
  const [dureeRelle, setDureeRelle] = useState(null);
  const [rapportTextuelle, setRapportTextuelle] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // New state for success message
  const [epreuve, setEpreuve] = useState(null);
  const [pv, setPv] = useState(null);
  const [surveillantCount, setSurveillantCount] = useState(null);
  const [admins, setAdmins] = useState([]);

  const handleSalleChange = (salleId, salleName) => {
    const surveillantCount = document.getElementById(
      `salle_${salleId}_invigilators`
    ).value;

    setSelectedSalles((prevSelectedSalles) => {
      const index = prevSelectedSalles.findIndex(
        (salle) => salle.idSalle === salleId
      );
      if (index === -1) {
        return [
          ...prevSelectedSalles,
          {
            idSalle: salleId,
            nom: salleName,
            surveillantCount: surveillantCount,
          },
        ];
      } else {
        const updatedSalles = [...prevSelectedSalles];
        updatedSalles[index].surveillantCount = surveillantCount;
        return updatedSalles;
      }
    });
  };

  const handleSurveillantCountChange = (salleId, surveillantCount) => {
    setSelectedSalles((prevSelectedSalles) => {
      const index = prevSelectedSalles.findIndex(
        (salle) => salle.idSalle === salleId
      );
      if (index !== -1) {
        const updatedSalles = [...prevSelectedSalles];
        updatedSalles[index].surveillantCount = surveillantCount;
        return updatedSalles;
      }
      return prevSelectedSalles;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("idSemestre", idSemestre);
    formData.append("date", date);
    formData.append("heureDebut", heureDebut);
    formData.append("dureePrevue", dureePrevue);
    formData.append("dureeRelle", dureeRelle);
    formData.append("rapportTextuelle", rapportTextuelle);
    formData.append("epreuve", epreuve);
    formData.append("pv", pv);
    formData.append("salles", JSON.stringify(selectedSalles));
    formData.append("idGroupe", idGroupe);
    formData.append("idPersonnel", idCoordonnateur);
    formData.append("idElemPedagogique", idelementPedagogique);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    saveExam(formData)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
        setSuccess("Exam created successfully!"); // Set success message
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        setError("Failed to save exam. Please check your input and try again.");
        setSuccess(null); // Clear any previous success message
      });
  };

  useEffect(() => {
    getSemestres()
      .then((response) => {
        setSemestres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching semestres:", error);
        setError("Failed to fetch semestres. Please try again later.");
      });
  }, []);

  useEffect(() => {
    getSalles()
      .then((response) => {
        setSalles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching salles:", error);
        setError("Failed to fetch salles. Please try again later.");
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
  useEffect(() => {
    getEnseignants()
      .then((response) => {
        setCoordonnateurs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groupes:", error);
        setError("Failed to fetch groupes. Please try again later.");
      });
  }, []);
  useEffect(() => {
    getElements()
      .then((response) => {
        setElementPedagogiques(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groupes:", error);
        setError("Failed to fetch groupes. Please try again later.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2 className="my-4">Exam Form</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="element">Element Pedagogique:</label>
                <select
                  className="form-select"
                  value={idelementPedagogique}
                  onChange={(e) => setIdElementPedagogique(e.target.value)}
                >
                  <option value="">Select element</option>
                  {elementPedagogiques.map((item) => (
                    <option key={item.idElemPedagogique} value={item.idElemPedagogique}>
                      {item.titre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="coordonnateur">Coordonnateur:</label>
                <select
                  className="form-select"
                  value={idCoordonnateur}
                  onChange={(e) => setIdCoordonnateur(e.target.value)}
                >
                  <option value="">Select Coordonnateur</option>
                  {coordonnateurs.map((item) => (
                    <option key={item.IdCoordonnateur} value={item.idPersonnel}>
                      {item.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="semestre">Semestre:</label>
                <select
                  className="form-select"
                  value={idSemestre}
                  onChange={(e) => setIdSemestre(e.target.value)}
                >
                  <option value="">Select Semestre</option>
                  {semestres.map((item) => (
                    <option key={item.idSemestre} value={item.idSemestre}>
                      {item.intitule}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="heure_debut">Heure de début:</label>
                <input
                  type="time"
                  id="heure_debut"
                  name="heure_debut"
                  className="form-control"
                  value={heureDebut}
                  onChange={(e) => setHeureDebut(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="duree_prevue">Durée prévue (en minutes):</label>
                <input
                  type="number"
                  id="duree_prevue"
                  name="duree_prevue"
                  className="form-control"
                  value={dureePrevue}
                  onChange={(e) => setDureePrevue(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="duree_reelle">Durée réelle (en minutes):</label>
                <input
                  type="number"
                  id="duree_reelle"
                  name="duree_reelle"
                  className="form-control"
                  value={dureeRelle}
                  onChange={(e) => setDureeRelle(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="rapport">Rapport textuel:</label>
              <textarea
                id="rapport"
                name="rapport"
                rows="4"
                cols="50"
                className="form-control"
                value={rapportTextuelle}
                onChange={(e) => setRapportTextuelle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salles">Salles:</label>
              {salles.map((item) => (
                <div key={item.idSalle} className="form-check mb-2">
                  <input
                    type="checkbox"
                    id={`salle_${item.idSalle}`}
                    name="salles[]"
                    value={item.idSalle}
                    className="form-check-input"
                    onChange={() => handleSalleChange(item.idSalle, item.nom)}
                  />
                  <label className="form-check-label" htmlFor={`salle_${item.idSalle}`}>
                    {item.nom}
                  </label>
                  <input
                    type="number"
                    id={`salle_${item.idSalle}_invigilators`}
                    name={`salle_${item.idSalle}_invigilators`}
                    className="form-control mt-1"
                    defaultValue="2"
                    min="1"
                    onChange={(e) => handleSurveillantCountChange(item.idSalle, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="groupes">Groupes:</label>
              {groupes.map((item) => (
                <div key={item.idGroupe} className="form-check mb-2">
                  <input
                    type="checkbox"
                    id={`groupe_${item.idGroupe}`}
                    name="groupes[]"
                    value={item.idGroupe}
                    className="form-check-input"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIdGroupe(e.target.value);
                      } else {
                        setIdGroupe(null);
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor={`groupe_${item.idGroupe}`}>
                    {item.nom}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="epreuve">Epreuve:</label>
              <input
                type="file"
                id="epreuve"
                name="epreuve"
                className="form-control"
                onChange={(e) => setEpreuve(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pv">PV:</label>
              <input
                type="file"
                id="pv"
                name="pv"
                className="form-control"
                onChange={(e) => setPv(e.target.files[0])}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>} {/* Success message */}
            <button type="submit" className="btn btn-primary btn-block">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExamComponent;
