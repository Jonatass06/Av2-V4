
import axios from "axios";


//10.4.96.35:8082
export async function GetDataBy(paramether, tabela) {
  try {
    const response = await axios.get("http://10.4.96.2:8082/"+tabela+"/"+paramether);
    console.log("sou o response"+response.data)
    return response.data;

  } catch (error) {
    console.log(error)
    throw error
  }
}

export default async function GetAllData(tabela) {
  try {
    const response = await axios.get("http://10.4.96.2:8082/"+tabela);
    return response.data;
  } catch (error) {
    throw error
  }
}
// 
export async function PostData(object, tabela) {
  try {
    const response = await axios.post("http://10.4.96.2:8082/"+ tabela , object);
  } catch (error) {
    throw error
  }
}

export async function DeleteData(id, tabela) {
  const result = await axios.delete("http://10.4.96.2:8082/" + tabela +"/"+ id);
  const dados = await result.data;
  return dados;
}

export async function PutData(object, tabela) {
  try {
    await axios.put("http://10.4.96.2:8082/"+ tabela , object);
  } catch (error) {
    throw error
  }
}