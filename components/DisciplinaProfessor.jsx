import { GetDataId, PutData } from "@/pages/api/hello";
import { useEffect, useState } from "react";

export default function DisciplinaProfessor({ professor, disciplinas }) {
    const [disciplina, setDisciplina] = useState(null);
    useEffect(() => {
        async function getDisciplina(){
            if (professor == undefined) return
            setDisciplina(professor.disciplina == null ? null : await GetDataId(professor.disciplina.id, "disciplina"))
        } 
        getDisciplina()
    }, [professor, disciplinas]);

    async function put(professor, value) {
        setDisciplina(await GetDataId(value, "disciplina"));
        if (value == 0) {
            professor.disciplina = null;
        } else {
            professor.disciplina = { "id": parseInt(value) };
        }
        await PutData(professor, "professor")
    }

    return (
        <div className="flex gap-1">
            <div className="linhas w-full">{professor.nome}</div>
            <select className="linhas w-min" onChange={e => put(professor, e.target.value)}>
                <option value={0}>N/A</option>
                {disciplina &&
                    <option value={disciplina.id} selected>{disciplina.nome}</option>
                }
                {disciplinas.map(disciplina => {
                    return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                })}
            </select>
        </div >
    )
}