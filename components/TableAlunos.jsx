import contem from "@/functions/contem"
import { PostData, PutData } from "@/pages/api/hello"
import ModalCadastro from "./ModalCadastro"
import { useState } from "react";
import Image from "next/image";

export default  function TableAlunos({ alunos, turmas }) {

    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    function post(obj) {
        PostData(obj, "aluno")
    }
    function put(aluno, value) {
        aluno.turma = { "id": parseInt(value) };
        PutData(aluno, "aluno")
    }
    return (
        <div className="flex flex-col gap-1">
            <div className="titulo">
                Alunos
                <button className="botao" onClick={() => setMostrarCadastro(true)}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png"/></button>
                </div>
            <div className="flex flex-col gap-1">
                {alunos.map(aluno => {
                    return <div key={aluno.id}  className="flex gap-1">
                        <div className="linhas w-full">{aluno.nome}</div>
                        <select className="linhas w-min" value={aluno.turma ? aluno.turma.id : null} onChange={e => put(aluno, e.target.value)}>
                            <option value={null} >N/A</option>
                            {turmas.map(turma => {
                                if (contem(aluno, turma.alunos)) {
                                    return <option key={turma.id} value={turma.id}>{turma.id}</option>
                                }
                                return <option key={turma.id} value={turma.id}>{turma.id}</option>
                            })}
                        </select>
                    </div>
                })}
            </div>
            {mostrarCadastro &&
                <ModalCadastro post={obj => post(obj)} />
            }
        </div>
    )
}