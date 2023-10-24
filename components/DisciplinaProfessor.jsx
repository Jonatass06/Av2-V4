import { PutData } from "@/pages/api/hello";
import { useEffect, useState } from "react";

export default function DisciplinaProfessor ({professor, disciplinas}) {
    const [disciplina, setDisciplina] = useState(0);
    useEffect(() => {
        if (professor == undefined) return
        setDisciplina(professor.disciplina == null ? 0 : professor.disciplina.id)
    }, [professor]);

    async function put(professor, value){
        setDisciplina(value);
        if(value== 0){
            professor.disciplina = null;
        }
        professor.disciplina = {"id":parseInt(value)};
        await PutData(professor, "professor")
    }

    return (
        <div  className="flex gap-1">
            <div className="linhas w-full">{professor.nome}</div>
            <select className="linhas w-min" onChange={e => put(professor, e.target.value)} value={disciplina}>
                <option value={0}>N/A</option>
                {disciplinas.map(disciplina => {
                    return <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
                })}
            </select>
        </div>
    )
}