import { useEffect, useState } from "react"
import alunosDaTurma from "@/data/alunosDaTurma"
import Nomes from "./Nomes";
import DisciplinaCadastro from "./DisciplinaCadastro";
import { GetDataBy, PutData } from  "@/api/api";
import disciplinasNaoTurma from "@/data/disciplinasNaoTurma";
import BoletimProfessor from "./BoletimProfessor";
import BoletinsSecretario from "./BoletinsSecretario";
import { useRouter } from "next/router";
import Image from "next/image";
import Erro from "./Erro";

export default function Turma({ turmaData, professor, atualizar }) {
    const [alunos, setAlunos] = useState([])
    const id = useRouter().query.id;

    const [turma, setTurma] = useState(turmaData)
    const [mostrarAlunos, setMostrarA] = useState(false);
    const [mostrarCadastroD, setMostrarCD] = useState(false);
    const [mostrarDisciplinas, setMostrarD] = useState(false);
    const [disciplinas, setDisciplinas] = useState([])
    const [relatorio, setRelatorio] = useState(false)

    useEffect(() => {
        async function getAlunos() {
            setTurma(turmaData)
            const alunosTemp = await alunosDaTurma(turmaData);
            setAlunos(alunosTemp)
            setDisciplinas(await disciplinasNaoTurma(turmaData))
        }
        getAlunos()
    }, [turmaData, atualizar]);

    async function postDisciplina(id) {
        turma.disciplinas.push({ "id": id });
        await PutData(turma, "turma");
        setTurma(await GetDataBy(turma.id, 'turma'))
        setDisciplinas(await disciplinasNaoTurma(turma))
        setMostrarCD(false)
        atualizar()
    }

    async function deletar(id, tabela) {
        if (tabela == "disciplina") {
            turma.disciplinas = turma.disciplinas.filter(disciplina => {
                return disciplina.id != id
            })
            await PutData(turma, "turma");
        } else {
            const aluno = await GetDataBy(id, tabela);
            aluno.turma = null;
            await PutData(aluno, tabela);
        }
        setTurma(await GetDataBy(turma.id, 'turma'))
        setAlunos(await alunosDaTurma(turma))
        setDisciplinas(await disciplinasNaoTurma(turma))
        atualizar()
    }

    async function verRelatorio() {
        if (!professor) {
            const user = await GetDataBy(id, "usuario");
            user.qtdBoletins = user.qtdBoletins + 1;
            await PutData(user, "secretario");
        }
        setRelatorio(true);
    }

    return (
        <div className="flex h-full w-full gap-1">
            <div className="linhas w-1/12">{turma.id}</div>
            <div className="w-full relative flex">
                <div className="linhas w-full" onClick={() => setMostrarA(!mostrarAlunos)}>
                    Alunos
                </div>
                {mostrarAlunos && <Nomes objs={alunos} deletar={id => deletar(id, "aluno")}></Nomes>}
            </div>
            {
                !professor &&
                <div className="flex w-min">
                    <div id="mostrar" onClick={e => e.target.id == "mostrar" && setMostrarD(!mostrarDisciplinas)} className="linhas gap-1 w-36">
                        Disciplinas
                        {
                            disciplinas.length > 0 &&
                            <div className="relative">
                                <button className="botao" id="adicionar" onClick={() => setMostrarCD(!mostrarCadastroD)}>
                                    <Image className="invert" width={12} height={12} alt="adicionar" src="/mais.png" />
                                </button>
                                {mostrarCadastroD &&
                                    <DisciplinaCadastro turma={turma} postDisciplina={id => postDisciplina(id)}></DisciplinaCadastro>
                                }
                            </div>
                        }
                    </div>
                    {mostrarDisciplinas && <Nomes objs={turma.disciplinas} deletar={id => deletar(id, "disciplina")}></Nomes>}
                </div>
            }
            <button className="relatorio min-h-full flex justify-center items-center w-32" onClick={() => verRelatorio()}>
                <Image className="invert" width={32} height={32} alt="relatorio" src="/relatorio.png" />
            </button>
            {relatorio && (alunos.length > 0 ? professor ? <BoletimProfessor professor={professor} turma={turma} fechar={() => setRelatorio(false)}></BoletimProfessor>
                : <div className="h-3/4 gap-6 overflow-clip">
                    <BoletinsSecretario alunosData={alunos} fechar={() => setRelatorio(false)} />
                </div>
                :
                <Erro mensagem={"Essa turma não tem alunos vinculados!"} condicao={alunos.length == 0} fechar={() => setRelatorio(false)} />)
            }

        </div>
    )
}
