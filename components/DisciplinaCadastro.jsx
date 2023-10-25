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
        <select className="p-2 border-verde border-y-2 border-x-2 top-[-16px] right-[-100px] z-[997] rounded-sm absolute" onBlur={e => {escolheDisciplina(e)}} autoFocus>
            {disciplinas.map(disciplina => {
                return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
            })}
        </select>
    )
}