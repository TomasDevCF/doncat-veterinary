import { useEffect, useState } from "react";
import Patient from "./Patient";
import axios from "axios";
import { useUserContext } from "../../UserContext";

export default function Panel() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [animalName, setAnimalName] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientsLoading, setPatientsLoading] = useState(false);

  const [allPatients, setAllPatients] = useState(null);

  const { info } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_URL_API}/newpatient`, {
        user_id: info.id,
        type,
        full_name: name + " " + fullName,
        animal_name: animalName,
      })
      .then((res) => {
        console.log(res);
        setError(null);
        axios
          .get(`${import.meta.env.VITE_URL_API}/getpatients/${info.id}`)
          .then((res) => {
            setAllPatients(res.data);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => setLoading(false));
  };

  const fullNameEdit = (e, typee) => {
    if (typee === "name") {
      setName(e.target.value);
    } else {
      setFullName(e.target.value);
    }
  };

  useEffect(() => {
    setPatientsLoading(true);
    axios
      .get(`${import.meta.env.VITE_URL_API}/getpatients/${info.id}`)
      .then((res) => {
        setAllPatients(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setPatientsLoading(false);
      });
  }, []);

  return (
    <div className="pt-5 py-2 h-100 w-100">
      <div className="title mt-3">
        <h1 className="text-white ms-3">
          <i className="fs-2 bi bi-tools"></i> <span>Panel de pacientes</span>
        </h1>
      </div>
      <div className="panels mt-5">
        <div className="main-panels d-flex justify-content-center justify-content-md-around w-100 flex-column flex-md-row align-items-center">
          <div className="patients-list text-white col-md-6 col-11 ">
            <h2 className="text-white text-center">
              <i className="text-warning bi bi-card-list"></i> Lista de
              pacientes
            </h2>
            <div className="w-100 my-2 p-2 overflow-y-auto bg-white rounded list">
              {allPatients &&
                allPatients.map((patient) => {
                  return (
                    <Patient
                      setAllPatients={setAllPatients}
                      patientId={patient.patient_id}
                      animalName={patient.animal_name}
                      key={patient.patient_id}
                      type={patient.type}
                      fullName={patient.full_name}
                    />
                  );
                })}
              {patientsLoading && (
                <div className="d-flex justify-content-center align-items-center h-100 ">
                  <div
                    className="spinner-border text-black"
                    style={{ width: "4rem", height: "4rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="add-patient col-md-5 col-11">
            <h2 className="text-white text-center">
              <i className="text-success bi bi-bag-plus-fill"></i> Agregar
              paciente
            </h2>
            <div className="w-100 my-2 p-2 bg-white rounded list">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className=" d-flex flex-column h-100"
              >
                <h5 className="text-center">Vista previa:</h5>
                <div className="patient mb-2 border-1 border border-dark p-2 pb-0 rounded d-flex justify-content-between">
                  <div className="info-preview text-black">
                    <p>
                      <strong>Animal:</strong> {type}
                    </p>
                    <p>
                      <strong>Nombre del animal:</strong> {animalName}
                    </p>
                    <p>
                      <strong>Nombre del dueño:</strong> {name} {fullName}
                    </p>
                  </div>
                </div>
                <div className="form-group w-100">
                  <fieldset>
                    <label className="form-label mt-2" htmlFor="typeInput">
                      Animal
                    </label>
                    <input
                      maxLength={17}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      required
                      className="form-control col-9"
                      id="typeInput"
                      type="text"
                      autoComplete="off"
                      placeholder="Animal..."
                    />
                  </fieldset>
                </div>
                <div className="form-group w-100">
                  <fieldset>
                    <label className="form-label mt-2" htmlFor="nameInput">
                      Nombre del animal
                    </label>
                    <input
                      maxLength={17}
                      onChange={(e) => {
                        setAnimalName(e.target.value);
                      }}
                      required
                      className="form-control col-9"
                      id="animalNameInput"
                      type="text"
                      autoComplete="off"
                      placeholder="Nombre del animal..."
                    />
                  </fieldset>
                </div>
                <div className="form-group w-100">
                  <fieldset>
                    <label className="form-label mt-2" htmlFor="nameInput">
                      Nombre del dueño
                    </label>
                    <div className="inputs-info d-flex">
                      <input
                        maxLength={17}
                        required
                        className="form-control me-1 w-50"
                        id="nameInput"
                        type="text"
                        lang="es"
                        onChange={(e) => {
                          fullNameEdit(e, "name");
                        }}
                        autoComplete="off"
                        placeholder="Nombre..."
                      />
                      <input
                        maxLength={17}
                        required
                        className="form-control ms-1 w-50"
                        id="lastNameInput"
                        type="text"
                        lang="es"
                        onChange={(e) => {
                          fullNameEdit(e, "lastName");
                        }}
                        autoComplete="off"
                        placeholder="Apellido..."
                      />
                    </div>
                  </fieldset>
                </div>
                <div className="button my-1">
                  <p className="text-danger p-0 mb-1">{error && error}</p>
                  <button type="submit" className="btn btn-success w-100">
                    {loading ? (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Agregar paciente"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
