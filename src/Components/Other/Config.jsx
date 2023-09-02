import axios from "axios";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import FriendConfig from "../FriendComponents/FriendConfig";
import { toast } from "react-hot-toast";

export default function Config() {
  const { info, setInfo } = useUserContext();

  const [copied, setCopied] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (copied != false) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_URL_API}/getfriends/${info.id}?accepted=1`)
      .then((res) => {
        setData(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-100 h-100 d-flex position-absolute top-header px-5 flex-column justify-content-center align-items-center">
      <div className="section-1 bg-white m-3 rounded-3 w-100 h-auto p-2">
        <div className="title text-center">
          <h1>Configuración del usuario</h1>
        </div>
        <div className="d-flex justify-content-md-around justify-content-start flex-column flex-md-row align-items-center h-50 py-2">
          <div className="d-flex flex-column my-2">
            <h3>Nombre: {info.name}</h3>
            <button
              onClick={() => {
                setInfo(null);
                localStorage.removeItem("userInfo");
              }}
              className="btn btn-danger"
            >
              Cerrar sesion
            </button>
          </div>
          <div className="d-flex flex-column my-2">
            <h3>Contraseña: *******</h3>
            <Link to="/changepassword" className="btn btn-success">
              Cambiar contraseña
            </Link>
          </div>
          <div className="d-flex flex-column my-2">
            <h3>ID: {info.id}</h3>
            <button
              onClick={() => {
                copy(info.id);
                toast.success("ID copiado correctamente", {position:"top-right", duration: 1500})
                setCopied(true);
              }}
              disabled={copied}
              className={`btn ${copied ? "btn-success" : "btn-warning"}`}
            >
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>
      </div>
      <div className="section-2 bg-white m-3 mt-1 d-flex w-100 h-75 d-flex flex-column rounded-3 px-2 align-items-center ">
        <h1>Amigos</h1>
        {loading && (
          <div
            className="spinner-border text-center text-black my-3"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {data &&
          data.map((d) => (
            <FriendConfig id={d.user_id} name={d.name} key={d.friends_id} />
          ))}
        <div className="view-more text-center w-100">
          {data && data.length >= 3 && (
            <Link to="/friends" className="btn btn-link fs-5">
              Ver todos...
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
