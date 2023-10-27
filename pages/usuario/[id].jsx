import GetAllData, { GetDataBy } from  "@/api/api";
import Header from "@/components/Header";
import RotaPrivada from "@/components/RotaPrivada"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import contem from "@/functions/contem";
import TelaAluno from "@/components/TelaAluno";
import TelaProfessor from "@/components/TelaProfessor";
import TelaSecretario from "@/components/TelaSecretario";

export default function User() {
    const router = useRouter()
    const id = router.query.id;
    const [usuario, setUsuario] = useState({});
    const [isProf, setIsProf] = useState(false);
    const [isAluno, setIsAluno] = useState(false);
    const [isSecretario, setIsSecretario] = useState(false);

    useEffect(() => {
        async function getUsuario() {
            if (id == undefined) return
            try{
                await setListas(id)
            }catch(erro){
                router.push("/login")
            }

        }
        getUsuario();
    }, [id])

    async function setListas(id) {
        let usuarioTemp = await GetDataBy(id, "usuario")
        setUsuario(usuarioTemp)

        let secretariosTemp = await GetAllData("secretario");
        let alunosTemp = await GetAllData("aluno");
        let professoresTemp = await GetAllData("professor");

        setIsAluno(contem(usuarioTemp, alunosTemp));
        setIsProf(contem(usuarioTemp, professoresTemp));
        setIsSecretario(contem(usuarioTemp, secretariosTemp));
    }


    return (
        <RotaPrivada id={id}>
            <Header id={id}></Header>
            {
                isAluno &&
                <TelaAluno alunoData={usuario}></TelaAluno>
            }
            {
                isProf &&
                <TelaProfessor professorData={usuario}></TelaProfessor>
            }
            {
                isSecretario &&
                <TelaSecretario secretarioData={usuario}></TelaSecretario>
            }
        </RotaPrivada>
    )

}