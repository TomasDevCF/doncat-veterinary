import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../UserContext";

export default function BlockRoutPatient({ children }) {
  const { patient_id } = useParams();
  const navigate = useNavigate();
  const { info } = useUserContext();
  const [Authorized, setAuthorized] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL_API}/checkpatient/${patient_id}`)
      .then((res) => {
        if (res.data.user_id == info.id) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/panel");
      });
  }, [info.id, patient_id, navigate]);

  if (Authorized === null) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  } else if (Authorized) {
    return children;
  } else {
    return <Navigate to="/panel" />;
  }
}
