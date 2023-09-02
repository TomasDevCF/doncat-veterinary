import axios from "axios";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";

export default function Patient({
  type,
  animalName,
  fullName,
  patientId,
  setAllPatients,
}) {
  const { info } = useUserContext();

  const deletePatientFunc = async (e) => {
    e.preventDefault();
    axios
      .delete(`${import.meta.env.VITE_URL_API}/deletepatientinfo/${patientId}`)
      .catch((err) => {
        console.error(err);
      });
    axios.delete(`${import.meta.env.VITE_URL_API}/deletepatient/${patientId}`);

    axios
      .get(`${import.meta.env.VITE_URL_API}/getpatients/${info.id}`)
      .then((res) => {
        setAllPatients(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className={`patient mb-2 border-1 border border-dark p-2 pb-0 rounded d-flex justify-content-between`}
    >
      <div className="info-patient w-100 text-black">
        <p>
          <strong>ID del paciente:</strong> {patientId}
        </p>
        <p>
          <strong>Animal:</strong> {type}
        </p>
        <p>
          <strong>Nombre del animal:</strong> {animalName}
        </p>
        <p>
          <strong>Nombre del dueño:</strong> {fullName}
        </p>
      </div>
      <div className="icons d-flex flex-column me-2">
        <a onClick={(e) => deletePatientFunc(e)} href="#">
          <i className="i-close fs-4 text-black bi bi-x-lg"></i>
        </a>
        <Link to={`/patient/${patientId}`}>
          <i className="i-edit fs-4 text-black bi bi-info-circle"></i>
        </Link>
      </div>
    </div>
  );
}
