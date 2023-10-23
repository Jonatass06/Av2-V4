import GetAllData from "@/pages/api/hello";

const usuario = get();

async function get(){
    return await GetAllData("professor")
}
export default usuario;
