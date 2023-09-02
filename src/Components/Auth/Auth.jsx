import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../UserContext";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Auth({ type }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { setInfo } = useUserContext();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() 

  

  useEffect(() => {
    setName("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    if (type == "login") {
      setError("");
      axios
        .get(
          `${import.meta.env.VITE_URL_API}/login?name=${encodeURIComponent(
            name
          )}&password=${encodeURIComponent(password)}`
        )
        .then((r) => {
          // ! PETICION A LA API
          console.log(r.data);
          setLoading(false)
          setInfo(r.data);
          toast.success('¡Sesion iniciada correctamente!', {position:"top-right"});
        })
        .catch((err) => {
          console.log(err.response.data.error);
          setLoading(false)
          setError(err.response.data.error);
        });

        
    } else {
      if (password == confirmPassword) {
        if (!(name.length > 12)) {
          if (!(password.length <= 6)) {
            setError("");
            axios
              .post(`${import.meta.env.VITE_URL_API}/newuser`, {
                // ! PETICION A LA API
                name,
                password,
              })
              .then(() =>{
                toast.success('¡Cuenta creada con exito!', {position:"top-right",duration: 1000})
                setLoading(false)
                navigate("/login")
              })
              .catch((err) => {
                console.log(err);
                setLoading(false)
                setError(err.response.data.error);
              });
          } else {
          setLoading(false)
          setError("¡La contraseña debe tener mas de 6 caracteres!");
          }
        } else {
          setLoading(false)
          setError("¡El nombre de usuario debe ser menor a 12 caracteres!");
        }
      } else {
          setLoading(false)
          setError("¡Las contraseñas no coinciden!");
      }
    }
  };

  return (
    <div className="h-100 d-flex justify-content-center py-2 pt-5 align-items-center px-lg-0 px-4">
      
      <div className="container-fluid bg-white h-auto mt-5 py-2 col-lg-9 col-12  row radius">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-center ">
          <h1>Veterinaria Doncat</h1>
          {type == "login" ? (
            <>
              <p>
                Inicia sesion con una cuenta en Veterinaria Doncat y sigue
                administrando tus pacientes!
              </p>
              <p>
                Si tienes alguna duda con el inicio de sesion de tu cuenta
                contactanos por nuestras redes sociales.
              </p>
            </>
          ) : (
            <>
              <p>
                Créate una cuenta en Veterinaria Doncat y empieza a administrar
                tus pacientes!
              </p>
              <p>
                Si tienes alguna duda con la creación de tu cuenta contactanos
                por nuestras redes sociales.
              </p>
            </>
          )}
          <div className="icons d-flex ">
            <a
              href="#"
              className="bg-dark text-decoration-none bi bi-whatsapp me-3 text-white fs-5 py-2 radius col-lg-1 d-flex justify-content-center col-2"
            ></a>
            <a
              href="#"
              className="bg-dark text-decoration-none bi bi-facebook me-3 text-white fs-5 py-2 radius col-lg-1 d-flex justify-content-center col-2 "
            ></a>
            <a
              href="#"
              className="bg-dark text-decoration-none bi bi-twitter me-3 text-white fs-5 py-2 radius col-lg-1 d-flex justify-content-center col-2"
            ></a>
            <a
              href="#"
              className="bg-dark text-decoration-none bi bi-instagram me-3 text-white fs-5 py-2 radius col-lg-1 d-flex justify-content-center col-2"
            ></a>
          </div>
        </div>
        <div className="col-lg-6 col-12 pt-3  border-black">
          {type == "login" ? (
            <>
              <h1 className="text-center">Iniciar sesion</h1>
            </>
          ) : (
            <>
              <h1 className="text-center">Crear cuenta</h1>
            </>
          )}

          <form
            className={`d-flex flex-column justify-content-center align-items-center `}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="form-group w-100">
              <fieldset>
                <label className="form-label mt-4" htmlFor="nameInput">
                  Nombre de usuario
                </label>
                <input
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-control col-9"
                  id="nameInput"
                  type="text"
                  placeholder="Nombre de usuario..."
                />
              </fieldset>
            </div>
            <div className="form-group w-100">
              <fieldset>
                <label className="form-label mt-4" htmlFor="passwordInput">
                  Contraseña
                </label>
                <input
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control col-9 mb-2"
                  id="passwordInput"
                  type="password"
                  placeholder="Contraseña..."
                />
              </fieldset>
            </div>
            {type != "login" && (
              <>
                <div className="form-group w-100">
                  <fieldset>
                    <label
                      className="form-label mt-2"
                      htmlFor="confirmPasswordInput"
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      autoComplete="off"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="form-control col-9"
                      id="confirmPasswordInput"
                      type="password"
                      placeholder="Confirmar contraseña..."
                    />
                  </fieldset>
                </div>
              </>
            )}
            <label className="text-danger mb-2 w-100" htmlFor="errorInput">
              {error}
            </label>
            <button type="submit" disabled={loading} className="btn btn-primary w-100">
              {loading ? <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> : type == "login" ? "Iniciar sesion" : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
