import provasDoAluno from "@/data/provasDoAluno"
import { useEffect, useState } from "react"

export default  function ProvasDoAluno ({ aluno, disciplina }) {
    const [provas, setProvas] = useState([])
    useEffect(() => {
        if (aluno == undefined) return
        async function getProvas() {
            let provasData = await provasDoAluno(aluno)
            setProvas(provasData.filter(prova => prova.disciplina.id == disciplina.id))
        }
        getProvas()
    }, [aluno, disciplina.id])

    function getSoma(provas) {
        let soma = 0;
        provas.map(prova => {
            soma += prova.nota
        })
        return soma
    }

    return (
        <div  className="flex flex-col">
            {provas.map(prova => {
                return <div key={prova.id}>{prova.nota}</div>
            })}
            <div>
                {
                    provas.length > 1 ?
                        (getSoma(provas) / provas.length).toFixed(2) :
                        provas.map(prova => {prova.nota})
                }
            </div>
        </div>
    )
}