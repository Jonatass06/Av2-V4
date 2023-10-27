import { PostData, PutData } from  "@/api/api"
import ModalCadastro from "./ModalCadastro"
import Image from "next/image";
import { useEffect, useState } from "react";
export default function TableAlunos({ alunos, turmas, atualizar }) {

    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    function post(obj) {
        PostData(obj, "aluno")
        setMostrarCadastro(false)
    }
    function put(aluno, value) {
        aluno.turma = value == "N/A" ? null : { "id": parseInt(value) };
        PutData(aluno, "aluno")
        atualizar()
    }
    return (
        <div className="tabela">
            <div className="titulo">
                Alunos
                <button className="botao" onClick={() => setMostrarCadastro(true)}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png" /></button>
            </div>
            <div className="flex flex-col gap-1 scroll">
                {alunos.map(aluno => {
                    return <div key={aluno.id} className="flex gap-1">
                        <div className="linhas w-full">{aluno.nome}</div>
                        <select className="linhas w-min" value={aluno.turma == null ? "" : aluno.turma.id } onChange={e => put(aluno, e.target.value)}>
                            <option value={null} >N/A</option>
                            {turmas.map(turma => {
                                return <option key={turma.id} value={turma.id}>{turma.id}</option>
                            })}
                        </select>
                    </div>
                })}
            </div>
            {mostrarCadastro &&
                <ModalCadastro post={obj => post(obj)} fechar={() => setMostrarCadastro(false)} />
            }
        </div>
    )
}