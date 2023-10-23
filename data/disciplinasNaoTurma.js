const { default: disciplinas } = require("./disciplinas");

export default async function (turma){
    const disciplinasTemp = await disciplinas;
    const disciplinasNaoTurma = disciplinasTemp.filter(
        disciplina => turma.disciplinas.filter(d => d.id == disciplina.id).length == 0);
    return disciplinasNaoTurma;
}