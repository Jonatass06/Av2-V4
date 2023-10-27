import GetAllData from  "@/api/api";
import { useEffect, useState } from "react";
import TableAlunos from "./TableAlunos";
import TableDisciplinas from "./TableDisciplinas";
import TableProfessores from "./TableProfessores";
import TableSecretarios from "./TableSecretarios";
import TableTurmas from "./TableTurmas";

export default function TelaSecretario({ secretarioData }) {

    const [secretarios, setSecretarios] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const [mostrarA, setMostrarA] = useState(true)
    const [mostrarT, setMostrarT] = useState(true)
    const [mostrarD, setMostrarD] = useState(true)
    const [mostrarS, setMostrarS] = useState(true)
    const [mostrarP, setMostrarP] = useState(true)

    useEffect(() => {
        async function getUsuario() {
            if (secretarioData == undefined) return
            await setListas()
        }
        getUsuario();
    }, [secretarioData])

    async function setListas() {
        setAlunos(await GetAllData("aluno"));
        setProfessores(await GetAllData("professor"));
        setSecretarios(await GetAllData("secretario"));
        setDisciplinas(await GetAllData("disciplina"));
        setTurmas(await GetAllData("turma"))
    }

    return (
        <div className="w-screen flex justify-center mt-24">
            <div className="flex flex-col items-end w-min mr-6">
                <button className="tag" title="Alunos" onClick={() => setMostrarA(!mostrarA)}>{!mostrarA && <p className="girado">Alunos</p>}</button>
                <button className="tag" title="Turmas" onClick={() => setMostrarT(!mostrarT)}>{!mostrarT && <p className="girado">Turmas</p>}</button>
                <button className="tag" title="Professores" onClick={() => setMostrarP(!mostrarP)}>{!mostrarP && <p className="girado">Professores</p>}</button>
                <button className="tag" title="Disciplinas" onClick={() => setMostrarD(!mostrarD)}>{!mostrarD && <p className="girado">Disciplinas</p>}</button>
                <button className="tag" title="Secretários" onClick={() => setMostrarS(!mostrarS)}>{!mostrarS && <p className="girado">Secretários</p>}</button>
            </div>
                <div className="w-5/6 gap-6 flex justify-center flex-wrap">
                    {mostrarA && <TableAlunos alunos={alunos} turmas={turmas} atualizar={() => setListas()}></TableAlunos>}
                    {mostrarT && <TableTurmas turmas={turmas} atualizar={() => setListas()}></TableTurmas>}
                    {mostrarP && <TableProfessores professores={professores} atualizar={() => setListas()}></TableProfessores>}
                    {mostrarD && <TableDisciplinas disciplinas={disciplinas} atualizar={() => setListas()}></TableDisciplinas>}
                    {mostrarS && <TableSecretarios secretarios={secretarios} atualizar={() => setListas()}></TableSecretarios>}
                </div>
        </div>
    )
}