import GetAllData from  "@/api/api";

export default async function get(turma) {
    const alunos = await GetAllData("aluno")
    const alunosDaTurma = alunos.filter(aluno => {
        if(aluno.turma == null) return
        return aluno.turma.id == turma.id})
    return alunosDaTurma;
}
