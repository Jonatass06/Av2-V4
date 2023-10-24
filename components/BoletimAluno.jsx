import { useEffect, useState } from "react"
import ProvasDoAluno from "./ProvasDoAluno";
import { GetDataId } from "@/pages/api/hello";

export default function BoletimDoAluno({ aluno, fechar }) {
    const [disciplinas, setDisciplinas] = useState([])

    useEffect(() => {
        if (aluno == undefined) return
        async function alunos() {
            let turma = aluno.turma == null ? null : await GetDataId(aluno.turma.id, "turma");
            setDisciplinas(turma == null ? [] : turma.disciplinas)
        }
        alunos()
    }, [aluno, fechar]);

    return (
        <div onClick={e => e.target.id == "fundo" && fechar()} id="fundo"
        className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 backdrop-blur-[2px] bg-[rbga(0,0,0,0.25)]">

            <div className="w-2/4 rounded-md p-2 bg-branco shadow-10b" >
                <div className="titulo">Boletim</div>
                <div className="h-min flex items-center justify-start p-2 border-y-2 border-x-2 border-verde 
                rounded-md font-montserrat text-verde text-[16px]">Aluno: {aluno.nome}</div>
                <div>
                    {
                        disciplinas.map(disciplina => {
                            return <div key={disciplina.id} className={`flex gap-6 ${disciplinas.indexOf(disciplina) % 2 == 0 ? "bg-branco" : "bg-[#D9F0E5]"}`}>
                                <div className="w-full">
                                    Disciplina: {disciplina.nome}
                                </div>
                                <ProvasDoAluno aluno={aluno} disciplina={disciplina}></ProvasDoAluno>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}