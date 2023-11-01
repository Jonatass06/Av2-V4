import { useEffect, useState } from "react"
import alunosDoProfessor from "@/data/alunosDoProfessor"
import AlunoDaTurma from "./AlunoDaTurma"

export default  function TableAlunosProfessor({ professor, atualizar }) {
    const [alunos, setAlunos] = useState([])
    useEffect(() => {
        if (professor == undefined) return
         function alunos() {
            let alunosData = professor.disciplina == null ? [] : alunosDoProfessor( professor.disciplina)
            setAlunos(alunosData)
        }
        alunos()
    }, [])


    return (
        <div className="tabela">
            <div className="titulo">Alunos</div>
            <div className="flex flex-col gap-1 scroll">
                {alunos.map(aluno => {
                    return <AlunoDaTurma atualizar={() => atualizar()} aluno={aluno} professor={professor} />
                })}
            </div>
        </div>
    )
}