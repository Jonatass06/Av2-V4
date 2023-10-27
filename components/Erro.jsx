export default function Erro({ mensagem, condicao, fechar }) {
    return (
        <>
            {condicao && <div className="fixed flex justify-center backdrop-blur-[2px] bg-[rgba(0,0,0,0.25)] items-center top-0 
            bottom-0 right-0 left-0 z-[999]" id="fundo" onClick={e => e.target.id == "fundo" && fechar()}>
                <div className="bg-branco w-1/4 h-1/3 rounded-md shadow-10b flex border-verde
                 justify-center items-center border-2 font-alata text-[180%] text-center p-6">
                    <h3>{mensagem}</h3>
                </div>
            </div>}
        </>
    )
}