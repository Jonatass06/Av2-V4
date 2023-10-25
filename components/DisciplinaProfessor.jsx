import { GetDataId, PutData } from "@/pages/api/hello";
import { useEffect, useState } from "react";

export default function DisciplinaProfessor({ professor, disciplinas, atualizar }) {


    async function put(professor, value) {
        professor.disciplina = (value == "N/A" ? null : {"id":parseInt(value)})
        await PutData(professor, "professor")
        atualizar()
    }

    return (
        <div className="flex gap-1">
            <div className="linhas w-full">{professor.nome}</div>
            <select className="linhas w-min" defaultValue={professor.disciplina ? professor.disciplina.id : ""} onChange={e => put(professor, e.target.value)}>
                <option value={null}>N/A</option>
                {professor.disciplina &&
                    <option value={professor.disciplina.id}>{professor.disciplina.nome}</option>
                }
                {disciplinas.map(disciplina => {
                    return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                })}
            </select>
        </div >
    )
}