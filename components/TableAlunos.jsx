import contem from "@/functions/contem"
import { PostData, PutData } from "@/pages/api/hello"
import ModalCadastro from "./ModalCadastro"
import { useEffect, useState } from "react";
import Image from "next/image";
import alunosDaTurma from "@/data/alunosDaTurma"
export default function TableAlunos({ alunos, turmas, atualizar }) {

    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    // Problemas Aqui
    useEffect(() => {
        if (turmas == undefined) return
        async function getAlunos(){
            for (let t of turmas) {
                t.alunos = await alunosDaTurma(t)
            }
        }
        getAlunos()
        console.log(turmas)
    }, [turmas, alunos, atualizar])

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
        <div className="flex flex-col gap-1 w-full">
            <div className="titulo">
                Alunos
                <button className="botao" onClick={() => setMostrarCadastro(true)}><Image className=" invert" width={16} height={16} alt="adicionar" src="/mais.png" /></button>
            </div>
            <div className="flex flex-col gap-1">
                {alunos.map(aluno => {
                    return <div key={aluno.id} className="flex gap-1">
                        <div className="linhas w-full">{aluno.nome}</div>
                        <select className="linhas w-min" defaultValue={aluno.turma ? aluno.turma.id : null} onChange={e => put(aluno, e.target.value)}>
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
                <ModalCadastro post={obj => post(obj)} fechar={() => setMostrarCadastro(false)} />
            }
        </div>
    )
}