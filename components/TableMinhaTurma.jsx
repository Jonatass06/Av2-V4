
import alunosDaTurma from "@/data/alunosDaTurma"
import { useEffect, useState } from "react";

export default  function TableMinhaTurma({ turma }) {
    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        async function getAlunos() {
            const alunos = await alunosDaTurma(turma);
            console.log(alunos)
            setAlunos(alunos)
        }
        getAlunos()
    }, [turma])

    return (
        <div>
            <div className="titulo">Minha Turma</div>
            <div>
                {
                    turma != undefined &&
                    <div className="flex flex-col">
                        <div className="titulo bg-branco text-verde border-verde rounded-sm">{turma.id}</div>
                        <div  className="flex flex-col">
                            {alunos.map(aluno => {
                                return <div key={aluno.id} className="linha">
                                    <div>{aluno.nome}</div>
                                </div>
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}