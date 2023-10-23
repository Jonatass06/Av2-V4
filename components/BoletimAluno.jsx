import { useEffect, useState } from "react"
import ProvasDoAluno from "./ProvasDoAluno";
import { GetDataId } from "@/pages/api/hello";

export default function BoletimDoAluno({ aluno }) {
    const [disciplinas, setDisciplinas] = useState([])

    useEffect(() => {
        if (aluno == undefined) return
        async function alunos() {
            console.log(aluno)
            let turma = aluno.turma == null ? null : await GetDataId(aluno.turma.id, "turma");
            setDisciplinas(turma == null ? [] : turma.disciplinas)
        }
        alunos()
    }, [aluno]);

    return (
        <div>
            <div>Boletim</div>
            <div>Aluno: {aluno.nome}</div>
            <div>
                {
                    disciplinas.map(disciplina => {
                        return <div key={disciplina.id} className={`flex gap-6 ${disciplinas.indexOf(disciplina) % 2 == 0 ? "bg-branco" : "bg-[#D9F0E5]"}`}>
                            <div>
                                Disciplina: {disciplina.nome}
                            </div>
                            <ProvasDoAluno aluno={aluno} disciplina={disciplina}></ProvasDoAluno>
                        </div>
                    })
                }
            </div>
        </div>

    )
}