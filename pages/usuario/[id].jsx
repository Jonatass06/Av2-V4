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
import alunosData from "@/data/alunos";
import professoresData from "@/data/professores";
import secretariosData from "@/data/secretarios";
import contem from "@/functions/contem";
import disciplinasData from "@/data/disciplinas";
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
            let usuarioTemp = await GetDataId(id, "usuario")
            setUsuario(usuarioTemp)

            let secretariosTemp = await secretariosData;
            let alunosTemp = await alunosData;
            let professoresTemp = await professoresData;


            setAlunos(alunosTemp);
            setProfessores(professoresTemp);
            setSecretarios(secretariosTemp);

            setDisciplinas(await disciplinasData);

            let professor = contem(usuarioTemp, professoresTemp)
            setIsAluno(contem(usuarioTemp, alunosTemp));
            setIsProf(professor);
            setIsSecretario(contem(usuarioTemp, secretariosTemp));


            console.log(usuarioTemp)
            if (professor) {
                setTurmas(usuarioTemp.disciplina == null ? [] : await turmasDoProfessor(usuarioTemp.disciplina))

            }
            else {
                setTurmas(await GetAllData("turma"))
            }
        }
        getUsuario();
    }, [id])

    return (
        <RotaPrivada id={id}>
            <Header id={id}></Header>
            {
                isAluno &&
                <div className="w-4/5 gap-6 flex justify-center">
                    <TableDisciplinasAluno aluno={usuario}></TableDisciplinasAluno>
                    <TableMinhaTurma turma={usuario.turma}></TableMinhaTurma>
                </div>
            }
            {
                isProf &&
                <div className="w-4/5 gap-6 flex justify-center">
                    <TableTurmas professor={usuario} turmas={turmas}></TableTurmas>
                    <TableAlunosProfessor professor={usuario} atualizar={() => setUsuario(usuario)}></TableAlunosProfessor>
                </div>
            }
            {
                isSecretario &&
                <div className="w-4/5 gap-6 flex justify-center">
                    <TableAlunos alunos={alunos} turmas={turmas}></TableAlunos>
                    <TableTurmas turmas={turmas}></TableTurmas>
                    <TableProfessores professores={professores} disciplinas={disciplinas}></TableProfessores>
                    <TableDisciplinas disciplinas={disciplinas}></TableDisciplinas>
                    <TableSecretarios secretarios={secretarios}></TableSecretarios>
                </div>
            }
        </RotaPrivada>
    )

}