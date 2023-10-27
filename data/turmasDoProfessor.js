import GetAllData from  "@/api/api";

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
    return turmasComDisciplina;
}
