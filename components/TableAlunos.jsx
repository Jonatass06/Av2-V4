import contem from "@/functions/contem"
import { PostData, PutData } from "@/pages/api/hello"
import ModalCadastro from "./ModalCadastro"
import { useState } from "react";

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
                <button className="botao" onClick={() => setMostrarCadastro(true)}>+</button>
                </div>
            <div className="flex flex-col">
                {alunos.map(aluno => {
                    return <div key={aluno.id}  className="flex ">
                        <div className="linhas w-full">{aluno.nome}</div>
                        <select className="linhas w-min" onChange={e => put(aluno, e.target.value)}>
                            <option value={null} >N/A</option>
                            {turmas.map(turma => {
                                if (contem(aluno, turma.alunos)) {
                                    return <option key={turma.id} value={turma.id} selected>{turma.id}</option>
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