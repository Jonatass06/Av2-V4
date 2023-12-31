
import alunosDaTurma from "@/data/alunosDaTurma"
import { useEffect, useState } from "react";

export default function TableMinhaTurma({ turma }) {
    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        async function getAlunos() {
            const alunos = turma == null ? [] : await alunosDaTurma(turma);
            setAlunos(alunos)
        }
        getAlunos()
    }, [turma])

    return (
        <div className="tabela">
            <div className="titulo">Minha Turma : {turma == null ? "N / A ": turma.id}</div>
            <div>
                {
                    turma != undefined &&
                    <div className="flex flex-col gap-1 scroll">
                        {alunos.map(aluno => {
                            return <div key={aluno.id} className="linhas">
                                <div>{aluno.nome}</div>
                            </div>
                        })}
                    </div>
                }
            </div>
        </div>
    )
}