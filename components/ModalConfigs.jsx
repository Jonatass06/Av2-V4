import { useRouter } from "next/router";

export default  function ModalConfigs({ id }) {
    const router = useRouter();
    return (
        <div className="absolute top-10 right-12 bg-branco flex flex-col p-6 shadow-10b">
            <button onClick={() => router.push("/login")}>Sair</button>
            {router.pathname == "/usuario/configs/[index]" ?
                <button onClick={() => router.push("/usuario/" + id)}>Voltar</button>
                :
                <button onClick={() => router.push("/usuario/configs/" + id)}>Configurações</button>
            }
        </div>
    )
}
