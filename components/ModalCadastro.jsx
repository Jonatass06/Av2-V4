import { useState } from "react"
import Image from "next/image"
export default  function ModalCadastro({post}) {
    const[nome, setNome] = useState("")
    const[senha, setSenha] = useState("")
    const[idade, setIdade] = useState("")
    const[endereco, setEndereco] = useState("");


    return (
        <div className="w-[700px] h-[650px] bg-white shadow-10b ronded-[5px] flex flex-col justify-center items-center gap-6 relative z-[997]">
            <Image src="./logoAv2.svg"  width={100} height={100} className="absolute z-[999] shadow-10b rounded-full top-[-50px]" alt="Logo" />
            <h2 className="text-verde font-alata text-[48px] ">Cadastrar</h2>
            <div className="flex flex-col justify-center items-center gap-6">
                <input type="text" placeholder="Nome"  value={nome} onChange={e => {setNome(e.target.value)}}/>
                <input type="password" placeholder="Senha" value={senha} onChange={e => {setSenha(e.target.value)}}/>
                <input type="number" placeholder="Idade" value={idade} onChange={e => {setIdade(e.target.value)}}/>
                <input type="text" placeholder="Endereco" value={endereco} onChange={e => {setEndereco(e.target.value)}}/>
            </div>
            <button className="bg-verde w-[370px] h-[80px] text-branco text-[24px] font-alata rounded-[5px]" onClick={() => {
                post({
                    "nome": nome,
                    "senha": senha, 
                    "idade": idade == "" ? 0 : parseInt(idade),
                    "endereco": endereco
                });
            }}>Continuar</button>
        </div>
    )
}