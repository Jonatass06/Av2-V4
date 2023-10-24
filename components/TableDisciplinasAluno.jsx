
import { GetDataId } from "@/pages/api/hello";
import { useEffect, useState } from "react";
import professorDaDisciplina from "@/data/professorDaDisciplina"
import BoletimAluno from "./BoletimAluno";

export default function TableDisciplinasAluno({ aluno }) {
    const [disciplinas, setDisciplinas] = useState([]);
    const [mostrarNotas, setMostrarN] = useState(false);
    const [relatorio, setRelatorio] = useState(false);
    useEffect(() => {
        async function getTurma() {
            let disciplinas = aluno.turma == null ? [] : (await GetDataId(aluno.turma.id, "turma")).disciplinas
            for(let d of disciplinas){
                await professorDaDisciplina(d);
            }
            setDisciplinas(disciplinas);
        }
        getTurma()
    }, [aluno])

    return (
        <div className="flex flex-col gap-1  w-full">
            <div className="titulo gap-16">
                {console.log(disciplinas)}
                <div className="h-full">
                    Disciplinas
                </div>
                <button className="w-max h-full pl-4 border-l-2 border-branco flex items-center justify-center font-montserrat text-[16px] "
                    onClick={() => setRelatorio(true)}>
                    Gerar Relatório
                </button>
                {relatorio &&
                    <div className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0">
                        <BoletimAluno aluno={aluno}></BoletimAluno>
                    </div>
                }
            </div>
            <div className="flex flex-col gap-1">
                {disciplinas.map(disciplina => {
                    return <div key={disciplina.id} className="flex gap-1">
                        <div className="linhas w-full ">{disciplina.nome}</div>
                        <div className="linhas w-full">
                            <div onClick={() => setMostrarN(true)}>
                                Notas
                            </div>
                            {mostrarNotas &&
                                <div>
                                    {aluno.provas.map(prova => {
                                        if (prova.disciplina == disciplina) {
                                            return <div key={prova.id}>
                                                <div>{prova.nota}</div>
                                            </div>
                                        }
                                    })}
                                </div>
                            }
                        </div>
                        <div className="linhas w-min">{disciplina.cargaHoraria}</div>
                        <div className="linhas w-full">{disciplina.professor}</div>
                    </div>
                })}
            </div>
        </div>
    )
}