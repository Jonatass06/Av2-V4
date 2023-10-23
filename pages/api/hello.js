
import axios from "axios";
import { NextResponse } from "next/server";

export async function GetDataId(id, tabela) {
  try {
    const response = await axios.get("http://10.4.96.35:8082/"+tabela+"/"+id);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}


export async function GetUserByPasswordUsername(username, password) {
  let a = await GetAllData("usuario");
  for(let dado of await a){
    if(dado.nome == username && dado.senha == password){
      return dado;
    }
  }
  return null;
}

export default async function GetAllData(tabela) {
  try {
    const response = await axios.get("http://10.4.96.35:8082/"+tabela);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}
// 
export async function PostData(object, tabela) {
  try {
    const response = await axios.post("http://10.4.96.35:8082/"+ tabela , object);
  } catch (error) {
    throw error
  }
}

export async function DeleteData(id, tabela) {
  const result = await axios.delete("http://10.4.96.35:8082/" + tabela +"/"+ id);
  const dados = await result.data;
  return dados;
}

export async function PutData(object, tabela) {
  console.log(object)
  try {
    await axios.put("http://10.4.96.35:8082/"+ tabela , object);
  } catch (error) {
    throw error
  }
}