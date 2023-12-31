import GetAllData from  "@/api/api";

export default async function get(disciplina) {
  const professores = await GetAllData("professor");
  professores.map((professor) => {
    if (professor.disciplina && professor.disciplina.id == disciplina.id) {
      disciplina.professor = professor.nome;
    }
  });
}
