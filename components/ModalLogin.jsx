
import { GetUserByPasswordUsername } from "@/pages/api/hello";
import { useRouter } from "next/router";
import { useState } from "react";
export default  function ModalLogin() {

    const[nome, setNome] = useState("")
    const[senha, setSenha] = useState("")

    const router = useRouter();
    async function logar(){
        let usuario = await GetUserByPasswordUsername(nome, senha);
        if(usuario != null && usuario != undefined){
            document.cookie = "logado=" + usuario.id + ";max-age=max-age-in-seconds:"+60*60*24*3;
            router.push('/usuario/'+usuario.id);
        }
    }

    return (
        <div className="w-[700px] h-[650px] bg-white shadow-10b ronded-[5px] flex flex-col justify-center items-center  gap-12">
            <h2 className="text-verde font-alata text-[48px]">Entrar</h2>
            <div className="flex flex-col justify-center items-center gap-6">
                <input type="text" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
                <input type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)}/>
            </div>
                <button className="bg-verde w-[370px] h-[80px] text-branco text-[24px] font-alata rounded-[5px]" onClick={() => logar()}>Continuar</button>
        </div>
    )
}