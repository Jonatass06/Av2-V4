import professoresData from "./professores";

export default async function get(disciplina) {
  const professores = await professoresData;
  professores.map((professor) => {
    if (professor.disciplina.id == disciplina.id) {
      disciplina.professor = professor.nome;
    }
  });
}
