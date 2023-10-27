import GetAllData from  "@/api/api";

const usuario = get();

async function get(){
    return await GetAllData("aluno");
}

export default usuario;

