import { useEffect, useState } from "react"
import alunosDoProfessor from "@/data/alunosDoProfessor"
import AlunoDaTurma from "./AlunoDaTurma"

export default  function TableAlunosProfessor({ professor, atualizar }) {
    const [alunos, setAlunos] = useState([])
    useEffect(() => {
        if (professor == undefined) return
        async function alunos() {
            let alunosData = professor.disciplina == null ? [] : await alunosDoProfessor( professor.disciplina)
            setAlunos(alunosData)
        }
        alunos()
    }, [professor , atualizar])


    return (
        <div className="tabela">
            <div className="titulo">Alunos</div>
            <div className="flex flex-col gap-1 scroll">
                {alunos.map(aluno => {
                    return <AlunoDaTurma key={aluno.id} atualizar={() => atualizar()} aluno={aluno} professor={professor} />
                })}
            </div>
        </div>
    )
}