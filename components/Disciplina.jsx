import { PutData } from "@/pages/api/hello";
import { useEffect, useState } from "react";

export default  function Disciplina({ disciplina, atualizar }) {
    const [nome, setNome] = useState("");
    const [carga, setCarga] = useState("");

    useEffect(() => {
        if (disciplina == undefined) return
        setNome(disciplina.nome)
        setCarga(disciplina.cargaHoraria)
    }, [disciplina, atualizar])

    async function put() {
        let obj = {
            "id": disciplina.id,
            "nome": nome,
            "cargaHoraria": parseFloat(carga)
        }
        await PutData(obj, "disciplina")
        atualizar()
    }

    return (
        <div className="flex gap-1 w-min">
            <input className="linhas w-min" 
            type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} onBlur={() => put()} value={nome} />
            <input className="linhas w-24 " 
            type="number" onChange={e => setCarga(e.target.value)} onBlur={() => put()} placeholder="Carga Horária" value={carga} />
        </div>)
}  