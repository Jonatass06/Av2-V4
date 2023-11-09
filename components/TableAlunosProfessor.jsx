import { useEffect, useState } from "react"
import alunosDoProfessor from "@/data/alunosDoProfessor"
import AlunoDaTurma from "./AlunoDaTurma"

export default  function TableAlunosProfessor({ professor, atualizar }) {
    const [alunos, setAlunos] = useState([])
    useEffect(() => {
        if (professor == undefined) return
        console.log("Im")
        async function alunos() {
            console.log(professor.disciplina)
            let alunosData = professor.disciplina == null ? [] : await alunosDoProfessor( professor.disciplina)
            console.log(alunosData)
            setAlunos(alunosData)
        }

        alunos()
    }, [professor, atualizar])


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