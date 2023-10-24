
import ModalConfigs from "./ModalConfigs";
import { useState } from "react";
import Image from "next/image";

export default  function Header({id}) {

    const [mostrarModal, setMostrarModal] = useState(false);


    return (
        <>

            <header className="w-full bg-verde h-[60px] flex justify-between items-center mb-24">
                <div className="w-[88%] h-full flex ml-5 justify-start gap-5 items-center">
                    <Image width={48} height={48} alt="Logo" src="/logoAv2.svg" />
                    <h2 className="text-branco font-chivo font-bold">Arnaldo Vieira II</h2>
                </div>
                <Image alt="Usuario"  width={48} height={48} className="flex justify-end mr-5 invert" src="/user-icon.png"  onClick={()=>setMostrarModal(!mostrarModal)}/>
                { mostrarModal && <ModalConfigs id={id}></ModalConfigs>}
            </header>
        </>
    )

}