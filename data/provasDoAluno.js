import GetAllData from "@/pages/api/hello";

export default async function provasDoAluno(aluno) {
    const provas = await GetAllData("prova");
    const provasDoAluno = provas.filter(prova => prova.aluno.id == aluno.id);
    return provasDoAluno;
}

