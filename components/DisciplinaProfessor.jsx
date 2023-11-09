import { GetDataBy, PutData } from  "@/api/api";
import { useEffect, useState } from "react";
import disciplinasNaoProf from "@/data/disciplinasSemProfessor"
import contem from "@/functions/contem";

export default function DisciplinaProfessor({ professor, disciplinas, atualizar }) {

    const[disciplinasFilter, setDisciplinasFilter] = useState([])

    useEffect(() => {
        console.log(disciplinas)
        async function getDisciplinas (){
            setDisciplinasFilter(await disciplinasNaoProf())


        }
            getDisciplinas()
    }, [disciplinas])

    async function put(professor, value) {
        professor.disciplina = (value == "N/A" ? null : {"id":parseInt(value)})
        await PutData(professor, "professor")
        atualizar()
    }

    return (
        <div className="flex gap-1">
            <div className="linhas w-full">{professor.nome}</div>
            <select className="linhas w-min" value={professor.disciplina ? professor.disciplina.id : ""} onChange={e => put(professor, e.target.value)}>
                <option value={null}>N/A</option>
                {disciplinas.map(disciplina => {
                    return contem(disciplina, disciplinasFilter) ?
                    <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                    :
                    <option key={disciplina.id} value={disciplina.id} disabled>{disciplina.nome}</option>
                })}
            </select>
        </div >
    )
}