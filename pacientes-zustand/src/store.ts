import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { v4 as uuidv4  } from "uuid"
import type { DraftPatient, Patient } from "./types"

type PatientState = {
    patients: Patient[]
    patientId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return { ...patient, id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools(persist((set) => ({
            patients: [],
            patientId: '',
            addPatient: data => {
                set(state => ({
                    patients: [...state.patients, createPatient(data)]
                }))
            },
            deletePatient: id => {
                set(state => ({
                    patients: state.patients.filter(patient => patient.id !== id)
                }))
            },
            getPatientById: id => {
                set(() => ({
                    patientId: id
                }))
            },
            updatePatient: data => {
                set(state => ({
                    patients: state.patients.map(patient => patient.id === state.patientId ? {id: state.patientId, ...data} : patient),
                    patientId: ''
                }))
            }
        }), {
            name: 'patient-storage',
            storage: createJSONStorage(() => localStorage)
        })
    ))