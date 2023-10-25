import { useRouter } from "next/router";

import Image from "next/image";

export default function ModalConfigs({ id, fechar }) {
    const router = useRouter();

    function logout() {
        document.cookie = 'logado=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/usuario';
        document.cookie = 'logado=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        window.location.reload();
    }
    return (
        <div className="absolute top-10 right-12 bg-branco flex flex-col p-6 shadow-10b gap-6 rounded-sm">
            <button onClick={() => fechar()} className="absolute top-3 text-[10px] right-3 text-red-800" >X</button>
            <div className="flex w-full gap-4">
                <Image className="opacity-50" src="/logout.png" width={20} height={20} alt="Logout"></Image>
                <button onClick={() => logout()}>Sair</button>
            </div>
            {router.pathname == "/usuario/configs/[index]" ?
                <div className="flex w-full gap-4 ">
                    <Image className="opacity-50" src="/voltar.png" width={20} height={20} alt="Configs"></Image>
                    <button onClick={() => router.push("/usuario/" + id)}>Voltar</button>
                </div>
                :
                <div className="flex w-full gap-4 ">
                    <Image className="opacity-50" src="/configs.png" width={20} height={20} alt="Configs"></Image>
                    <button onClick={() => router.push("/usuario/configs/" + id)}>Configurações</button>
                </div>
            }
        </div>
    )
}
