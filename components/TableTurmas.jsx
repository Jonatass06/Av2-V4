import { useEffect, useState } from "react"
import GetAllData, { DeleteData, PostData } from  "@/api/api";
import Turma from "./Turma";
import Image from "next/image";

export default function TableTurmas (props) {
    const professor = props.professor;
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        if (props.turmas == undefined) return
        async function getTurmas() {
            setTurmas(props.turmas)
        }
        getTurmas()
    }, [props.turmas ,props.atualizar])

    async function post() {
        await PostData({}, "turma");
        setTurmas(await GetAllData("turma"))
        props.atualizar()
    }
    async function deletar(turma) {
        await DeleteData(turma.id, "turma");
        setTurmas(await GetAllData("turma"));
        props.atualizar()
    }

    return (
        <div className="tabela ">
            <div className="titulo ">Turmas
                {!professor &&
                    <button className="botao" onClick={() => post()}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png"/></button>}
            </div>
            <div className="scroll flex flex-col gap-1 w-full ">
                {turmas.map(turma => {
                        return <div  key={turma.id} className="flex gap-1 w-full h-full">
                            <Turma turmaData={turma} atualizar={() => props.atualizar()} professor={professor} />
                            {!professor && <button className="linhas text-red-800" onClick={() => deletar(turma)}>x</button>}
                        </div>
                    })}
            </div>
        </div>
    )
}