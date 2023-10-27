import { useState } from "react";
import TableDisciplinasAluno from "./TableDisciplinasAluno";
import TableMinhaTurma from "./TableMinhaTurma";

export default function TelaAluno({ alunoData }) {

    const [mostrarD, setMostrarD] = useState(true)
    const [mostrarMT, setMostrarMT] = useState(true)

    return (
        <div className="w-screen flex justify-center mt-24">
            <div className="flex flex-col items-end w-min mr-6">
                <button className="tag" title="Disciplinas" onClick={() => setMostrarD(!mostrarD)}>{!mostrarD && <p className="girado">Disciplinas</p>}</button>
                <button className="tag" title="Minha Turma" onClick={() => setMostrarMT(!mostrarMT)}>{!mostrarMT && <p className="girado">Minha Turma</p>}</button>
            </div>
            <div className="w-4/5 gap-6 flex justify-center">
                {mostrarD && <TableDisciplinasAluno aluno={alunoData} ></TableDisciplinasAluno>}
                {mostrarMT && <TableMinhaTurma turma={alunoData.turma} ></TableMinhaTurma>}
            </div>
        </div>
    )
}