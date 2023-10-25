import GetAllData, { PostData } from "@/pages/api/hello"
import ModalCadastro from "./ModalCadastro"
import DisciplinaProfessor from "./DisciplinaProfessor"
import { useEffect, useState } from "react";
import Image from "next/image";
import disciplinasNaoProfData from "@/data/disciplinasSemProfessor";

export default  function TableProfessores({ professores, atualizar }) {

    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [disciplinas, setDisciplnas] = useState([]);

    useEffect(() => {
        async function setDisciplinas(){
            let discipinasTemp = await GetAllData("disciplina");
            setDisciplnas(discipinasTemp)
        }
        setDisciplinas(0)
    }, [professores,  atualizar])

    function post(obj) {
        PostData(obj, "professor")
        setMostrarCadastro(false)
        atualizar()
    }
    return (
        <div className="flex flex-col gap-1  w-full">
            <div className="titulo">Professores
                <button className="botao" onClick={() => setMostrarCadastro(true)}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png"/></button>
            </div>
            <div  className="flex flex-col gap-1">
                {professores.map(professor => {
                    return <DisciplinaProfessor key={professor.id} atualizar={() => atualizar()} professor={professor} disciplinas={disciplinas} />
                })}
            </div>
            {mostrarCadastro &&
                <ModalCadastro post={obj => post(obj)} fechar={() => setMostrarCadastro(false)}></ModalCadastro>}
        </div>
    )
}