import provasDoAluno from "@/data/provasDoAluno";
import { DeleteData, PostData } from "@/pages/api/hello";
import { useEffect, useState } from "react";
import Notas from "./Notas";
import Image from "next/image";

export default function AlunoDaTurma({ aluno, professor, atualizar }) {

    const [mostrarNotas, setMostrarN] = useState(false)
    const [provas, setProvas] = useState([])

    useEffect(() => {
        if (aluno == undefined) return
        async function getProvas() {
            let provasData = await provasDoAluno(aluno)
            setProvas(provasData)
        }
        getProvas()
    }, [aluno])

    async function postNota(aluno) {
        await PostData(
            {
                "nota": 0,
                "disciplina": { "id": professor.disciplina.id },
                "aluno": { "id": aluno.id }
            }
            , "prova")
        setProvas(await provasDoAluno(aluno))
        atualizar()
    }

    async function deletarNota(prova) {
        await DeleteData(prova.id, "prova");
        setProvas(await provasDoAluno(aluno))
    }

    return (
        <div className="flex gap-1">
            <div className="linhas w-full">{aluno.nome}</div>
            <div className="linhas w-min">{aluno.turma.id}</div>
            <div>
                <div>
                    <div className="linhas w-28 flex gap-2" onClick={() => setMostrarN(!mostrarNotas)}>
                        Notas
                        <button className="botao" onClick={() => { postNota(aluno) }}>
                            <Image className="invert" width={12} height={12} alt="adicionar" src="/mais.png" />
                        </button>
                    </div>

                    {mostrarNotas &&
                        <div className="flex flex-col">
                            {provas.map(prova => {
                                return <div key={prova.id} className="flex w-28">
                                    <Notas prova={prova} professor={professor} />
                                    <button className="border-y-2 border-x-2 rounded-full h-8 w-12 border-verde text-red-800" onClick={() => deletarNota(prova)}>x</button>
                                </div>
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}