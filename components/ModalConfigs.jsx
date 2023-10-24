import { useRouter } from "next/router";

export default function ModalConfigs({ id }) {
    const router = useRouter();

    function logout() {
        document.cookie ='logado=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/usuario';
        document.cookie ='logado=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        window.location.reload();
    }
    return (
        <div className="absolute top-10 right-12 bg-branco flex flex-col p-6 shadow-10b">
            <button onClick={() => logout()}>Sair</button>
            {router.pathname == "/usuario/configs/[index]" ?
                <button onClick={() => router.push("/usuario/" + id)}>Voltar</button>
                :
                <button onClick={() => router.push("/usuario/configs/" + id)}>Configurações</button>
            }
        </div>
    )
}
