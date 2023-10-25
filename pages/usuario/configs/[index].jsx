import Header from "@/components/Header"
import contem from "@/functions/contem";
import GetAllData, { DeleteData, PutData } from "@/pages/api/hello";
import { GetDataId } from "@/pages/api/hello";
import RotaPrivada from "@/components/RotaPrivada"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ConfigsUser () {
    const router = useRouter();
    const { index } = router.query;
    const [usuario, setUsuario] = useState({})
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [idade, setIdade] = useState("")
    const [endereco, setEndereco] = useState("");

    useEffect(() => {
        async function getUsuario() {
            if(index == undefined) return
            let usuario = await GetDataId(index, "usuario")
            setUsuario(usuario)
            setNome(usuario.nome)
            setSenha(usuario.senha)
            setIdade(usuario.idade)
            setEndereco(usuario.endereco)
        }
        getUsuario()
    }, [index])

    async function deletar() {
        document.cookie ='logado=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/usuario';
        document.cookie ='logado=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        let tabela = await getTabela(usuario)
        await DeleteData(index, tabela)
        router.push("/login")
    }

    async function atualizar() {
        let tabela = await getTabela(usuario)
        usuario.nome = nome;
        usuario.idade = idade;
        usuario.endereco = endereco;
        await PutData(usuario, tabela)
    }

    async function getTabela() {
        if (contem(usuario, await GetAllData("aluno"))) {
            return "aluno"
        } else if (contem(usuario, await GetAllData("professor"))) {
            return "professor"
        } else if (contem(usuario, await GetAllData("secretario"))) {
            return "secretario"
        }
    }

    return (
        <RotaPrivada id={index}>
            <Header id={index}></Header>

            <section className="w-full h-[93vh] flex flex-col justify-center items-center">

                <div className="w-[650px] h-[650px] bg-green shadow-10b ronded-[5px] flex flex-col justify-center items-center gap-6 relative z-[997]">
                    <div className="bg-verde w-[100px] h-[100px] absolute z-[999] shadow-10b rounded-full top-[-50px] flex justify-center items-center">
                        <Image  width={100} height={100} src="/user-icon.png" className="border-verde border-96 invert" alt="" />
                    </div>

                    <form autoComplete="false" className="flex flex-col justify-center items-center gap-6">
                        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                        <input type="number" placeholder="Idade" value={idade} onChange={e => setIdade(e.target.value)} />
                        <input type="text" placeholder="Endereco" value={endereco} onChange={e => setEndereco(e.target.value)} />
                    </form >
                    <button className="bg-verde w-[370px] h-[80px] text-branco text-[24px] font-alata rounded-[5px]" onClick={() => atualizar()}>Continuar</button>
                    <button className="bg-red-700 w-[370px] h-[80px] text-branco text-[24px] font-alata rounded-[5px]" onClick={() => deletar()}>Deletar Conta</button>
                </div>
            </section>
        </RotaPrivada>
    )
}