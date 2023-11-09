import GetAllData, { PostData } from  "@/api/api"
import ModalCadastro from "./ModalCadastro"
import DisciplinaProfessor from "./DisciplinaProfessor"
import { useEffect, useState } from "react";
import Image from "next/image";

export default  function TableProfessores({ professores, atualizar }) {

    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [disciplinas, setDisciplinas1] = useState([])

    useEffect(() => {
        async function setDisciplinas(){
            setDisciplinas1(await GetAllData("disciplina"));
        }
        setDisciplinas()
    }, [professores,  atualizar])

    function post(obj) {
        PostData(obj, "professor")
        setMostrarCadastro(false)
        atualizar()
    }
    return (
        <div className="tabela">
            <div className="titulo">Professores
                <button className="botao" onClick={() => setMostrarCadastro(true)}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png"/></button>
            </div>
            <div  className="flex flex-col gap-1 scroll">
                {professores.map(professor => {
                    return <DisciplinaProfessor key={professor.id} atualizar={() => atualizar()} professor={professor} disciplinas={disciplinas} />
                })}
            </div>
            {mostrarCadastro &&
                <ModalCadastro post={obj => post(obj)} fechar={() => setMostrarCadastro(false)}></ModalCadastro>}
        </div>
    )
}