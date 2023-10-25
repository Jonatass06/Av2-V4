import { useEffect, useState } from "react"
import BoletimAluno from "./BoletimAluno";

export default  function BoletinsSecrectario({ alunosData, fechar }) {
    const [alunos, setAlunos] = useState([])
    useEffect(() => {
        if (alunosData == undefined) return
        setAlunos(alunosData)
    }, [alunosData]);

    return (
        <div className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0">
            {alunos.map(aluno => {
                return <BoletimAluno key={aluno.id} fechar={() => fechar()} aluno={aluno}></BoletimAluno>
            })}
        </div >
    )
}