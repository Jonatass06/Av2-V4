import GetAllData from  "@/api/api";

export default async function (turma){
    const disciplinasTemp = await GetAllData("disciplina");
    const disciplinasNaoTurma = disciplinasTemp.filter(
        disciplina => turma.disciplinas.filter(d => d.id == disciplina.id).length == 0);
    return disciplinasNaoTurma;
}