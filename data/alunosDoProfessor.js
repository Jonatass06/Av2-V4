import GetAllData from  "@/api/api";
import alunosDaTurma from "@/data/alunosDaTurma";

export default async function get(disciplina) {
    const turmas = await GetAllData("turma")
    const turmasComDisciplina = [];
     for (let turma of turmas) {
        for (let disciplinaTurma of turma.disciplinas) {
            if (disciplinaTurma.id == disciplina.id) {
                turmasComDisciplina.push(turma);
            }
        }
    }

    console.log(turmasComDisciplina)
    const alunosDoProfessor = [];
    for (let turma of turmasComDisciplina) {
        let alunos = await alunosDaTurma(turma);
        console.log(alunos)
        alunosDoProfessor.push(...alunos);
    }
    console.log(alunosDoProfessor)
    return alunosDoProfessor;
}
