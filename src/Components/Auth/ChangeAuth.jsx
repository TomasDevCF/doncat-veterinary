import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../UserContext";
import { toast } from "react-hot-toast";

export default function ChangePassword({ type }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { info, setInfo } = useUserContext();

  const updatePassword = (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`${import.meta.env.VITE_URL_API}/changepassword`, {
        id: info.id,
        oldPassword,
        newPassword,
      })
      .then((res) => {
        console.log(res);
        setInfo({...info, password: res.data.newPassword})
        toast.success("Contraseña actualizada con exito", {position:"top-right", duration: 1500})
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error, {position:"top-right", duration: 1500})
      })
      .finally(() => setLoading(false))
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
      <div className="bg-white col-md-6 col-11 h-75 rounded">
        <div className="back">
          <Link to="/config" className="btn btn-danger p-2 m-1">
            <i className="bi bi-box-arrow-left"></i> Regresar
          </Link>
          {type === "password" ? (
            <h1 className="text-center">Cambiar contraseña</h1>
          ) : (
            <h1 className="text-center">Cambiar nombre</h1>
          )}
        </div>
        <form onSubmit={(e) => updatePassword(e)} className="mx-5">
          <div className="form-group w-100">
            <fieldset>
              <label className="form-label mt-4" htmlFor="passwordInput">
                Contraseña antigua
              </label>
              <input
                autoComplete="off"
                required
                onChange={(e) => setOldPassword(e.target.value)}
                className="form-control col-9"
                id="passwordInput"
                type="password"
                placeholder="Contraseña antigua..."
              />
            </fieldset>
          </div>
          <div className="form-group w-100">
            <fieldset>
              <label className="form-label mt-4" htmlFor="passwordInput">
                Contraseña nueva
              </label>
              <input
                autoComplete="off"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control col-9"
                id="passwordInput"
                type="password"
                placeholder="Contraseña nueva..."
              />
            </fieldset>
          </div>
          <p className="text-danger m-0 mt-1"></p>
          <button disabled={loading} type="submit" className="btn btn-success w-100 mt-2">
            {loading ? <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> : "Cambiar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
