import { PostData } from  "@/api/api"
import { useEffect, useState } from "react"

export default  function Notas ({ prova, professor}) {

    const [nota, setNota] = useState(0)

    useEffect(() => {
        if (prova == undefined) return
        async function getNota() {
            setNota(prova.nota)
        }
        getNota()
    }, [prova])

    async function postNota() {
        prova.nota = nota;
        await PostData(prova, "prova")
    }

    return (
        <>
            {
                prova.disciplina.id == professor.disciplina.id &&
                <div className="w-full">
                    <input max={10} min={0} type="number"className="w-full border-y-2 border-x-2 border-verde text-[16px] h-8" value={nota} onChange={e => setNota(e.target.value)} onBlur={() => postNota()}/>
                </div>
            }
        </>
    )
}
