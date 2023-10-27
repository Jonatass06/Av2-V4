import { useEffect, useState } from "react"
import Image from "next/image"
import Disciplina from "./Disciplina"
import GetAllData, { DeleteData, PostData } from  "@/api/api"
import Erro from "./Erro"

export default function TableDisciplinas({ disciplinas, atualizar }) {
    const [materias, setMaterias] = useState([])
    const [erro, setErro] = useState(false)

    useEffect(() => {
        if (disciplinas == undefined) return
        setMaterias(disciplinas)
    }, [disciplinas, atualizar])

    async function post() {
        await PostData({}, "disciplina");
        setMaterias(await GetAllData("disciplina"))
        atualizar()
    }
    async function deletar(disciplina) {
        await DeleteData(disciplina.id, "disciplina")
        setMaterias(await GetAllData("disciplina"))
        atualizar()
    }

    return (
        <div className="tabela">
            <div className="titulo">
                Disciplinas
                <button className="botao" onClick={() => post()}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png" /></button>
            </div>
            <div className="flex flex-col gap-1 scroll scroll">
                {materias.map(disciplina => {
                    return <div key={disciplina.id} className="flex gap-1 h-min w-full">
                        <Disciplina disciplina={disciplina} atualizar={() => atualizar()} />
                        <button className="linhas text-red-800 w-min h-full items-center justify-center" onClick={() => deletar(disciplina)}>X</button>
                    </div>
                })}
            </div>
        </div>
    )
}