import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";

export default function Header() {
  const { info } = useUserContext();

  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-primary bg-dark position-fixed z-1 w-100"
        data-bs-theme="dark"
      >
        <div className="container-fluid flex-nowrap">
          <Link className="navbar-brand" to="/">
            Veterinaria Doncat
          </Link>
          <div
            className="collapse navbar-collapse justify-content-end d-sm-flex d-none"
            id="navbarColor01"
          >
            {!info ? (
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <Link className="nav-link active" to="/signup">
                    Ingresar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Iniciar sesion
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <Link className="nav-link active" to="/panel">
                    Pacientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/friends">
                    Amigos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/config">
                    Configuración
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="nav-responsive d-block d-sm-none">
            <i
              onClick={() => setIsOpened(!isOpened)}
              className="fs-1 bi bi-list text-white"
            ></i>
          </div>
        </div>
      </nav>
      <div
        className={`navbar-responsive z-2 bg-opacity-50 d-block d-sm-none position-fixed w-50 bg-black h-100 top-0 ${
          isOpened ? "right-0" : "right-100"
        }`}
      >
        <div className="d-flex flex-column align-items-center pt-5">
          {info ? (
            <>
              <Link
                onClick={() => setIsOpened(false)}
                to="/panel"
                className="my-3 nav-link active text-white"
              >
                Pacientes
              </Link>
              <Link
                onClick={() => setIsOpened(false)}
                to="/friends"
                className="my-3 nav-link active text-white"
              >
                Amigos
              </Link>
              <Link
                onClick={() => setIsOpened(false)}
                to="/config"
                className="my-3 nav-link active text-white"
              >
                Configuración
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => setIsOpened(false)}
                to="/signup"
                className="my-3 nav-link active text-white"
              >
                Ingresar
              </Link>
              <Link
                onClick={() => setIsOpened(false)}
                to="/login"
                className="my-3 nav-link active text-white"
              >
                Iniciar sesion
              </Link>
            </>
          )}
        </div>
      </div>
      {isOpened && (
        <div
          onClick={() => setIsOpened(false)}
          className="navbar-responsive z-1 bg-opacity-25 position-fixed w-100 bg-black h-100 top-0 right-0 d-block d-sm-none"
        ></div>
      )}
    </>
  );
}
