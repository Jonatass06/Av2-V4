import { useState } from "react";
import ModalCadastro from "./ModalCadastro"
import Image from "next/image";
import { PostData } from  "@/api/api";

export default  function TableSecretarios({ secretarios, atualizar }) {

    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    function post(obj) {
        PostData(obj, "secretario")
        setMostrarCadastro(false)
        atualizar()
    }

    return (
        <div className="tabela">
            <div className="titulo">
                Secretarios
                <button className="botao" onClick={() => setMostrarCadastro(true)}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png"/></button>
            </div>
            <div  className="flex flex-col gap-1 scroll">
                {secretarios.map(secretario => {
                    return <div key={secretario.id}  className="flex gap-1">
                        <div className="linhas h-16 w-3/5">{secretario.nome}</div>
                        <div className="linhas h-16 w-2/5">{secretario.qtdBoletins == null ? 0 : secretario.qtdBoletins}</div>
                    </div>
                })}
            </div>
            {mostrarCadastro &&
                <ModalCadastro post={obj => post(obj)} fechar={() => setMostrarCadastro(false)}></ModalCadastro>}

        </div>
    )
}