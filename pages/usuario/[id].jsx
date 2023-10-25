import GetAllData, { GetDataId } from "@/pages/api/hello";
import Header from "@/components/Header";
import RotaPrivada from "@/components/RotaPrivada"
import TableAlunos from "@/components/TableAlunos";
import TableAlunosProfessor from "@/components/TableAlunosProfessor";
import TableDisciplinas from "@/components/TableDisciplinas";
import TableDisciplinasAluno from "@/components/TableDisciplinasAluno";
import TableMinhaTurma from "@/components/TableMinhaTurma";
import TableProfessores from "@/components/TableProfessores";
import TableTurmas from "@/components/TableTurmas";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import contem from "@/functions/contem";
import turmasDoProfessor from "@/data/turmasDoProfessor";
import TableSecretarios from "@/components/TableSecretarios";

export default function User() {
    const id = useRouter().query.id;
    const [secretarios, setSecretarios] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [isProf, setIsProf] = useState(false);
    const [isAluno, setIsAluno] = useState(false);
    const [isSecretario, setIsSecretario] = useState(false);

    useEffect(() => {
        async function getUsuario() {
            if (id == undefined) return
            await setListas(id)
        }
        getUsuario();
    }, [id])

    async function setListas(id) {
        let usuarioTemp = await GetDataId(id, "usuario")
        setUsuario(usuarioTemp)

        let secretariosTemp = await GetAllData("secretario");
        let alunosTemp = await GetAllData("aluno");
        let professoresTemp = await GetAllData("professor");

        setAlunos(alunosTemp);
        setProfessores(professoresTemp);
        setSecretarios(secretariosTemp);

        setDisciplinas(await GetAllData("disciplina"));

        let professor = contem(usuarioTemp, professoresTemp)
        setIsAluno(contem(usuarioTemp, alunosTemp));
        setIsProf(professor);
        setIsSecretario(contem(usuarioTemp, secretariosTemp));

        if (professor) {
            setTurmas(usuarioTemp.disciplina == null ? [] : await turmasDoProfessor(usuarioTemp.disciplina))
        }
        else {
            setTurmas(await GetAllData("turma"))
        }
    }


    return (
        <RotaPrivada id={id}>
            <Header id={id}></Header>
            {
                isAluno &&
                <div className="w-4/5 gap-6 flex justify-center">
                    <TableDisciplinasAluno aluno={usuario} ></TableDisciplinasAluno>
                    <TableMinhaTurma turma={usuario.turma} ></TableMinhaTurma>
                </div>
            }
            {
                isProf &&
                <div className="w-4/5 gap-6 flex justify-center">
                    <TableTurmas professor={usuario} turmas={turmas} atualizar={() => setListas(id)}></TableTurmas>
                    <TableAlunosProfessor professor={usuario} atualizar={() => setListas(id)}></TableAlunosProfessor>
                </div>
            }
            {
                isSecretario &&
                <div className="w-4/5 gap-6 flex justify-center">
                    <TableAlunos alunos={alunos} turmas={turmas} atualizar={() => setListas(id) }></TableAlunos>
                    <TableTurmas turmas={turmas}  atualizar={() => setListas(id) }></TableTurmas>
                    <TableProfessores professores={professores}  atualizar={() => setListas(id) }></TableProfessores>
                    <TableDisciplinas disciplinas={disciplinas}  atualizar={() => setListas(id) }></TableDisciplinas>
                    <TableSecretarios secretarios={secretarios}  atualizar={() => setListas(id) }></TableSecretarios>
                </div>
            }
        </RotaPrivada>
    )

}