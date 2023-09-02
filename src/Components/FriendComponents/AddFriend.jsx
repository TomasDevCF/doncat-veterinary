import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddFriend() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { info } = useUserContext();

  const addFriend = (e) => {
    e.preventDefault();
    setLoading(true);
    if (info.id != id && info.name != name) {
      setError("");
      if (name != "" && id == "") {
        axios
          .get(`${import.meta.env.VITE_URL_API}/getuser/${name}`)
          .then((res) => {
            if (!res.data) {
              setLoading(false);
              setError("Ese usuario no existe.");
            } else {
              axios
                .post(`${import.meta.env.VITE_URL_API}/newfriendrequest`, {
                  f_id: res.data.user_id,
                  id: info.id,
                })
                .then((resp) => {
                  console.log(resp);
                  toast.success("Peticion enviada con exito.", {position:"top-right", duration: 1500})
                })
                .catch((err) => {
                  console.error(err);
                  setError(err.response.data.error);
                })
                .finally(() => {
                  setLoading(false);
                });
            }
          });
      } else {
        axios
          .post(`${import.meta.env.VITE_URL_API}/newfriendrequest`, {
            f_id: id,
            id: info.id,
          })
          .then((res) => {
            console.log(res);
            toast.success("Peticion enviada con exito.", {position:"top-right", duration: 1500})
          })
          .catch((err) => {
            console.error(err);
            setError(err.response.data.error);
          })
          .finally(() => setLoading(false));
      }
    } else {
      setError("¡No puedes agregarte a ti mismo!");
      setLoading(false);
    }
  };

  return (
    <div className="w-100 h-100 d-flex flex-column pt-5 px-4">
      <div className="navigation-friends mt-4 d-flex flex-md-row flex-column px-md-0 px-5">
        <Link to="/friends" className="btn fs-6 m-2 btn-info">
          Lista de amigos
        </Link>
        <Link to="/friends/add" className="btn fs-6 m-2 btn-success">
          Agregar amigos
        </Link>
        <Link to="/friends/requests" className="btn fs-6 m-2 btn-info">
          Solicitudes de amistad
        </Link>
      </div>
      <div className="d-flex py-3 justify-content-center align-items-center w-100 h-100">
        <form
          onSubmit={(e) => addFriend(e)}
          className="bg-white rounded py-3 col-md-6 col-12 h-100 px-3"
        >
          <h1 className="text-center">Agregar amigos</h1>
          {id == "" && (
            <div className="form-group w-100">
              <fieldset>
                <label className="form-label mt-3" htmlFor="nameInput">
                  Buscar por nombre
                </label>
                <input
                  required
                  autoComplete="off"
                  className="form-control col-9"
                  id="nameInput"
                  type="text"
                  placeholder="Buscar por nombre..."
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
              </fieldset>
            </div>
          )}
          {name == "" && id == "" && (
            <div className="or">
              <h2 className="text-secondary-emphasis m-0 my-2 p-0 text-center">
                O
              </h2>
            </div>
          )}
          {name == "" && (
            <div className="form-group w-100">
              <fieldset>
                <label className="form-label mt-" htmlFor="nameInput">
                  Buscar por ID
                </label>
                <input
                  required
                  autoComplete="off"
                  className="form-control col-9"
                  id="nameInput"
                  type="number"
                  placeholder="Buscar por ID..."
                  onChange={(e) => {
                    setId(e.target.value);
                    setError("");
                  }}
                />
              </fieldset>
            </div>
          )}
          <div className="error">
            <p className="text-danger py-2 m-0">{error}</p>
          </div>
          <div className="button">
            <button disabled={loading} className="fs-6 btn btn-success w-100">
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Enviar solicitud"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
