import axios from "axios";
import { useState } from "react";

export default function Info({
  patient_id,
  setIsCreating,
  setInfoData,
  patientInfoId,
  date = "",
  veterinary = "",
  cause = "",
  age = "",
  height = "",
  weight = "",
  medicines = "",
  each = "",
  for_ = "",
}) {
  const defaultNewInfo = {
    patient_id: patientInfoId,
    date,
    veterinary,
    cause,
    age,
    height,
    weight,
    medicines,
    each,
    for_,
  };

  const [newInfo, setNewInfo] = useState(defaultNewInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [isProccessing, setIsProccessing] = useState(false);

  const deleteInfo = (e) => {
    e.preventDefault;
    axios.delete(`${import.meta.env.VITE_URL_API}/deleteinfo/${patientInfoId}`);
    axios
      .get(`${import.meta.env.VITE_URL_API}/getpatientinfo/${patient_id}`)
      .then((r) => setInfoData(r.data))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsCreating(false);
      });
  };

  const handleDate = (e) => {
    const mydate = new Date(e.target.value + "T00:00:00").toLocaleDateString(
      "es-AR",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    setNewInfo({ ...newInfo, date: mydate });
  };

  const editInfo = (e) => {
    e.preventDefault();
    if (newInfo !== defaultNewInfo) {
      console.log(patientInfoId);
      console.log(newInfo);
      setIsProccessing(true);
      axios
        .put(`${import.meta.env.VITE_URL_API}/updateinfo`, newInfo)
        .then((r) => {
          console.log(r);
          axios
            .get(`${import.meta.env.VITE_URL_API}/getpatientinfo/${patient_id}`)
            .then((res) => {
              setInfoData(res.data);
              setIsEditing(false);
            })
            .catch((err) => console.error(err))
            .finally(() => {
              setIsProccessing(false);
            });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={(e) => submitAddInfo(e)}
          className="border-bottom border-black d-flex justify-content-between p-2 flex-md-row flex-column"
        >
          <div className="container- w-100">
            <div className="1-row d-flex ">
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Altura: </strong>
                <input
                  defaultValue={newInfo.height}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setNewInfo({ ...newInfo, height: e.target.value });
                  }}
                  className="w-75 h-100"
                  type="text"
                  name="heightInfo"
                  id="Infoheight"
                />
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Peso: </strong>
                <input
                  defaultValue={newInfo.weight}
                  required
                  autoComplete="off"
                  onChange={(e) =>
                    setNewInfo({ ...newInfo, weight: e.target.value })
                  }
                  className="w-75 h-100"
                  type="weight"
                  name="weightInfo"
                  id="Infoweight"
                />
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Edad: </strong>
                <input
                  defaultValue={newInfo.age}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setNewInfo({ ...newInfo, age: e.target.value });
                  }}
                  className="w-75 h-100"
                  type="number"
                  name="ageInfo"
                  id="Infoage"
                />
              </p>
            </div>
            <div className="2-row d-flex ">
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Fecha de cita: </strong>
                <input
                  defaultValue={newInfo.date}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    handleDate(e);
                  }}
                  className="w-75 h-100"
                  type="date"
                  name="dateInfo"
                  id="Infodate"
                />
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Veterinario: </strong>
                <input
                  defaultValue={newInfo.veterinary}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setNewInfo({ ...newInfo, veterinary: e.target.value });
                  }}
                  className="w-75 h-100"
                  type="text"
                  name="veterinaryInfo"
                  id="InfoVeterinary"
                />
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Causa de cita: </strong>
                <input
                  defaultValue={newInfo.cause}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setNewInfo({ ...newInfo, cause: e.target.value });
                  }}
                  className="w-75 h-100"
                  type="text"
                  name="causeInfo"
                  id="Infocause"
                />
              </p>
            </div>
            <div className="3-row d-flex ">
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Medicamentos: </strong>
                <input
                  defaultValue={newInfo.medicines}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setNewInfo({ ...newInfo, medicines: e.target.value });
                  }}
                  className="w-75 h-100"
                  type="text"
                  name="medicinesInfo"
                  id="Infomedicines"
                />
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Cada: </strong>
                <input
                  defaultValue={newInfo.each}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setNewInfo({ ...newInfo, each: e.target.value });
                  }}
                  className="w-75 h-100"
                  type="text"
                  name="forInfo"
                  id="Infofor"
                />
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4">
                <strong className="fs-65">Por: </strong>
                <input
                  defaultValue={newInfo.for_}
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setNewInfo({ ...newInfo, for_: e.target.value });
                  }}
                  className="w-75 h-100"
                  type="text"
                  name="veterinaryInfo"
                  id="InfoVeterinary"
                />
              </p>
            </div>
          </div>
          <div className="4-row icons d-flex justify-content-center justify-content-md-start flex-row flex-md-column">
            <a
              href="#"
              onClick={(e) => {
                if (!isProccessing) {
                  editInfo(e);
                }
              }}
            >
              <i
                className={`mx-1 fs-4 text-black bi bi-check-lg${
                  isProccessing ? " text-secondary-emphasis" : " i-finish"
                }`}
              ></i>
            </a>
            <a
              href="#"
              onClick={(e) => {
                if (!isProccessing) {
                  e.preventDefault();
                  setIsEditing(false);
                }
              }}
            >
              <i
                className={`mx-1 fs-4 text-black bi bi-x-circle${
                  isProccessing ? " text-secondary-emphasis" : " i-close"
                }`}
              ></i>
            </a>
          </div>
        </form>
      ) : (
        <form className="border-bottom border-black d-flex justify-content-between p-2">
          <div className="container- w-100">
            <div className="1-row d-flex ">
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Altura: </strong>
                <span className="fs-7">{height}</span>
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Peso: </strong>
                <span className="fs-7">{weight}</span>
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Edad: </strong>
                <span className="fs-7">{age}</span>
              </p>
            </div>
            <div className="2-row d-flex ">
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Fecha de cita: </strong>
                <span className="fs-7">{date}</span>
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Veterinario: </strong>
                <span className="fs-7">{veterinary}</span>
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Causa de cita: </strong>
                <span className="fs-7">{cause}</span>
              </p>
            </div>
            <div className="3-row d-flex ">
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Medicamentos: </strong>
                <span className="fs-7">{medicines}</span>
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Cada: </strong>
                <span className="fs-7">{each}</span>
              </p>
              <p className="my-1 d-flex flex-column align-items-center col-4 fs-6 text-center">
                <strong className="fs-65">Por: </strong>
                <span className="fs-7">{for_}</span>
              </p>
            </div>
          </div>
          <div className="4-row icons d-flex flex-column ">
            <a href="#" onClick={(e) => deleteInfo(e)}>
              <i className="i-close fs-4 text-black bi bi-dash-lg"></i>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              <i className="i-edit fs-4 text-black bi bi-pencil-square"></i>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
