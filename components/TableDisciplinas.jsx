import { useEffect, useState } from "react"
import Disciplina from "./Disciplina"
import GetAllData, { DeleteData, PostData } from "@/pages/api/hello"

export default  function TableDisciplinas ({ disciplinas }) {
    const [materias, setMaterias] = useState([])

    useEffect(() => {
        if (disciplinas == undefined) return
        setMaterias(disciplinas)
    }, [disciplinas])

    async function post() {
        await PostData({}, "disciplina");
        setMaterias(await GetAllData("disciplina"))
    }
    async function deletar(disciplina) {
        await DeleteData(disciplina.id, "disciplina")
        setMaterias(await GetAllData("disciplina"))
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="titulo">
                Disciplinas
                <button className="botao" onClick={() => post()}>+</button>
            </div>
            <div  className="flex flex-col gap-1">
                {materias.map(disciplina => {
                    return <div  key={disciplina.id} className="flex gap-1 h-min w-full">
                        <Disciplina disciplina={disciplina} />
                        <button className="linhas text-red-800 w-min h-full items-center justify-center" onClick={() => deletar(disciplina)}>X</button>
                    </div>
                })}
            </div>
        </div>
    )
}