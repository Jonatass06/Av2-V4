import { PutData } from  "@/api/api";
import { useEffect, useState } from "react";

export default function Disciplina({ disciplina, atualizar }) {
    const [nome, setNome] = useState("");
    const [carga, setCarga] = useState("");

    useEffect(() => {
        if (disciplina == undefined) ReadableStreamDefaultController
        setNome("")
        setCarga("")
        disciplina.cargaHoraria != null && setCarga(disciplina.cargaHoraria)
        disciplina.nome != null && setNome(disciplina.nome)
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
        <div className="flex gap-1 w-full">
            <input className="linhas w-full"
                type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} onBlur={() => put()} value={nome} />
            <input className="linhas w-24 "
                type="number" onChange={e => setCarga(e.target.value)} onBlur={() => put()} placeholder="Carga" value={carga} />
        </div>)
}  