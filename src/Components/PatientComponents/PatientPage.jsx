import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Info from "./Info";

export default function PatientPage() {
  const { patient_id } = useParams();
  const [isCreating, setIsCreating] = useState(false);
  const [infoData, setInfoData] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  const defaultNewInfo = {
    patient_id,
    date: "",
    veterinary: "",
    cause: "",
    age: "",
    height: "",
    weight: "",
    medicines: "",
    each: "",
    for_: "",
  };

  const [newInfo, setNewInfo] = useState(defaultNewInfo);

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

  const submitAddInfo = (e) => {
    e.preventDefault();
    if (newInfo.age >= 0) {
      axios
        .post(`${import.meta.env.VITE_URL_API}/newinfo`, newInfo)
        .then((res) => {
          console.log(res);
          setNewInfo(defaultNewInfo);
          setIsCreating(true);
          axios
            .get(`${import.meta.env.VITE_URL_API}/getpatientinfo/${patient_id}`)
            .then((r) => setInfoData(r.data))
            .catch((err) => console.error(err))
            .finally(() => {
              setIsCreating(false);
            });
        })
        .catch((err) => console.error(err))
        .finally(() => setIsCreating(false));
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL_API}/getpatient/${patient_id}`)
      .then((r) => {
        setPatientInfo(r.data);
        axios
          .get(`${import.meta.env.VITE_URL_API}/getpatientinfo/${patient_id}`)
          .then((res) => {
            setInfoData(res.data);
          })
          .catch((err) => console.error(err))
          .finally(() => {
            setIsCreating(false);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center px-2">
      <div className="col-12 col-md-10 d-flex flex-column align-items-center pt-5  h-100">
        <div className="title-page pt-4 ">
          <h2 className="text-white text-center">
            <i className="fs-3 bi bi-info-circle"></i> Historial médico del
            paciente {patient_id} ({patientInfo && patientInfo.type})
          </h2>
        </div>
        <div className="pb-3 w-100 h-100">
          <div className="infos bg-white col-12 mb-2">
            {infoData &&
              infoData.map((d) => {
                return (
                  <Info
                    setInfoData={setInfoData}
                    patient_id={patient_id}
                    setIsCreating={setIsCreating}
                    patientInfoId={d.patient_info_id}
                    age={d.age}
                    cause={d.cause}
                    date={d.date_patient}
                    each={d.each_medicines}
                    for_={d.for_medicines}
                    height={d.height}
                    medicines={d.medicines}
                    veterinary={d.veterinary}
                    weight={d.weight}
                    key={d.patient_info_id}
                  />
                );
              })}
            {isCreating && (
              <form
                onSubmit={(e) => submitAddInfo(e)}
                className="border-bottom border-black d-flex justify-content-between p-2 flex-md-row flex-column"
              >
                <div className="container- w-100">
                  <div className="1-row d-flex ">
                    <p className="my-1 d-flex flex-column align-items-center col-4">
                      <strong>Altura: </strong>
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
                      <strong>Peso: </strong>
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
                      <strong>Edad: </strong>
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
                      <strong>Fecha de cita: </strong>
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
                      <strong>Veterinario: </strong>
                      <input
                        defaultValue={newInfo.veterinary}
                        required
                        autoComplete="off"
                        onChange={(e) => {
                          setNewInfo({
                            ...newInfo,
                            veterinary: e.target.value,
                          });
                        }}
                        className="w-75 h-100"
                        type="text"
                        name="veterinaryInfo"
                        id="InfoVeterinary"
                      />
                    </p>
                    <p className="my-1 d-flex flex-column align-items-center col-4">
                      <strong>Causa de cita: </strong>
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
                      <strong>Medicamentos: </strong>
                      <input
                        defaultValue={newInfo.medicines}
                        required
                        autoComplete="off"
                        min={0}
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
                      <strong>Cada: </strong>
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
                      <strong>Por: </strong>
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
                <div className="4-row icons d-flex justify-content-center justify-content-md-start flex-md-column">
                  <button type="submit" className="btn p-0 m-0">
                    <i className="i-finish fs-4 text-black bi bi-check-lg"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="btn p-0 m-0"
                  >
                    <i className="i-close fs-4 text-black bi bi-x-lg"></i>
                  </button>
                </div>
              </form>
            )}
            <div className="add-button p-2">
              <button
                className={`btn btn-success fs-6 d-block w-100 ${
                  isCreating && "disabled"
                }`}
                onClick={() => {
                  if (!isCreating) {
                    setIsCreating(true);
                  }
                }}
              >
                Agregar nuevo registro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
