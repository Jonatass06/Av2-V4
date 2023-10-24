import { PostData } from "@/pages/api/hello"
import ModalCadastro from "./ModalCadastro"
import DisciplinaProfessor from "./DisciplinaProfessor"
import { useState } from "react";
import Image from "next/image";

export default  function TableProfessores({ professores, disciplinas }) {

    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    function post(obj) {
        PostData(obj, "professor")
    }
    return (
        <div className="flex flex-col gap-1">
            <div className="titulo">Professores
                <button className="botao" onClick={() => setMostrarCadastro(true)}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png"/></button>
            </div>
            <div  className="flex flex-col gap-1">
                {professores.map(professor => {
                    return <DisciplinaProfessor key={professor.id} professor={professor} disciplinas={disciplinas} />
                })}
            </div>
            {mostrarCadastro &&
                <ModalCadastro post={obj => post(obj)}></ModalCadastro>}
        </div>
    )
}