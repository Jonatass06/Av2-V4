import alunosDaTurma from "@/data/alunosDaTurma";
import { useEffect, useState } from "react"
import ProvasDoAluno from "./ProvasDoAluno";

export default  function BoleitmProfessor({ professor, turma }) {

    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        if (professor == undefined) return
        async function alunos() {
            console.log(professor)
            let alunosData = await alunosDaTurma(turma);
            setAlunos(alunosData)
        }
        alunos()
    }, [professor, turma]);

    return (
        <div className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 backdrop-blur-[2px] bg-[rbga(0,0,0,0.25)]">
            <div className="w-2/4 rounded-md p-2 bg-branco shadow-10b">
                <div className="titulo">Boletim</div>
                <div className="h-min flex items-center justify-start p-2 border-y-2 border-x-2 border-verde 
                rounded-md font-montserrat text-verde text-[16px]">Professor: {professor.nome}</div>
                <div>
                    {
                        alunos.map(aluno => {
                            return <div key={aluno.id} className={`flex gap-6 ${alunos.indexOf(aluno) % 2 == 0 ? "bg-branco" : "bg-[#D9F0E5]"}`}>
                                <div className="w-full">
                                    Aluno: {aluno.nome}
                                </div>
                                <ProvasDoAluno aluno={aluno} disciplina={professor.disciplina}></ProvasDoAluno>
                            </div>
                        })
                    }
                </div>
            </div>

        </div >

    )
}