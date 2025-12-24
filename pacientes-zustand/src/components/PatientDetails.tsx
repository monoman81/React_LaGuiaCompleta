import { toast } from "react-toastify"
import type { Patient } from "../types"
import PatientDetailsItem from "./PatientDetailsItem"
import { usePatientStore } from "../store.ts"

type PatientDetailsProp = {
    patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProp) {

    const deletePatient = usePatientStore(state => state.deletePatient)
    const getPatientById = usePatientStore(state => state.getPatientById)

    const handleClick = () => {
        deletePatient(patient.id)
        toast.error('Paciente Eliminado Correctamente')
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailsItem label={'ID'} data={patient.id} />
            <PatientDetailsItem label={'Nombre'} data={patient.name} />
            <PatientDetailsItem label={'Propietario'} data={patient.caretaker} />
            <PatientDetailsItem label={'Email'} data={patient.email} />
            <PatientDetailsItem label={'Fecha Alta'} data={patient.date.toString()} />
            <PatientDetailsItem label={'Sintomas'} data={patient.symptoms} />
            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button type="button" onClick={() => getPatientById(patient.id)}
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">
                    Editar
                </button>
                <button type="button" onClick={handleClick}
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg">
                    Eliminar
                </button>
            </div>
        </div>
    )
}
