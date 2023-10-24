import { useEffect, useState } from "react"
import disciplinasNaoTurma from "@/data/disciplinasNaoTurma"

export default  function DisciplinaCadastro({turma, postDisciplina}) {

    const[disciplinas, setDisciplinas] = useState([])

    useEffect(() => {
        if (turma == undefined) return
        async function getTurma() {
            setDisciplinas(await disciplinasNaoTurma(turma))
        }
        getTurma()
    }, [turma, postDisciplina])

    async function escolheDisciplina (e) {
        postDisciplina(e.target.value)
        setDisciplinas(await disciplinasNaoTurma(turma))  
    }

    return(
        <select className="p-2 border-verde rounded-sm absolute" onBlur={e => {escolheDisciplina(e)}}>
            {disciplinas.map(disciplina => {
                return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
            })}
        </select>
    )
}