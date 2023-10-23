import provasDoAluno from "@/data/provasDoAluno";
import { DeleteData, PostData } from "@/pages/api/hello";
import { useEffect, useState } from "react";
import Notas from "./Notas";

export default  function AlunoDaTurma({aluno, professor, atualizar}) {

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
        <div  className="flex">
            <div className="linha">{aluno.nome}</div>
            <div className="linha">{aluno.turma.id}</div>
            <div>
                <div>
                    <div className="linha"  onClick={() => setMostrarN(!mostrarNotas)}>
                        Notas
                        <button className="botao" onClick={() => { postNota(aluno) }}>+</button>
                    </div>

                    {mostrarNotas &&
                        <div className="flex flex-col">
                            {provas.map(prova => {
                                return <div key={prova.id} className="flex">
                                    <Notas prova={prova} professor={professor} />
                                    <button className="text-red-800" onClick={() => deletarNota(prova)}>x</button>
                                </div>
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
        )
}