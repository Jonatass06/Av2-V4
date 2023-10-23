import GetAllData from "@/pages/api/hello";

let disciplinas = setDisciplinasData();

export async function setDisciplinasData(){
    disciplinas = await GetAllData("disciplina");
    return disciplinas;
}

export default disciplinas;

