import { GetDataId } from "@/pages/api/hello";
import TableAlunosProfessor from "./TableAlunosProfessor";
import TableTurmas from "./TableTurmas";
import turmasDoProfessor from "@/data/turmasDoProfessor"
import { useEffect, useState } from "react";

export default function TelaProfessor({ professorData }) {
    const [turmas, setTurmas] = useState([]);
    const [professor, setProfessor] = useState({});
    const [mostrarT, setMostrarT] = useState(true)
    const [mostrarA, setMostrarA] = useState(true)

    useEffect(() => {
        async function getUsuario() {
            if (professorData == undefined) return
            await setListas()
        }
        getUsuario();
    }, [professorData])

    async function setListas() {
        const professorTemp = await GetDataId(professorData.id, "usuario")
        setProfessor(professorTemp)
        setTurmas(professorTemp.disciplina == null ? [] : await turmasDoProfessor(professorTemp.disciplina))
    }

    return (
        <div className="w-screen flex justify-center mt-24 ">
            <div className="flex flex-col items-end w-min mr-6">
                <button className="tag" title="Turmas" onClick={() => setMostrarT(!mostrarT)}>{mostrarT && <p className="girado">Turmas</p>}</button>
                <button className="tag" title="Alunos" onClick={() => setMostrarA(!mostrarA)}>{mostrarA && <p className="girado">Alunos</p>}</button>
            </div>
            <div className="w-4/5 gap-6 flex justify-center">
                {mostrarT && <TableTurmas professor={professor} turmas={turmas} atualizar={() => setListas()}></TableTurmas>}
                {mostrarA && <TableAlunosProfessor professor={professor} atualizar={() => setListas()}></TableAlunosProfessor>}
            </div>
        </div>
    )

}
