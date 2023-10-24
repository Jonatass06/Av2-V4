export default  function Nomes ({ objs, deletar }) {
    return (
        <div  className="flex flex-col items-center w-full">
            {objs.map(obj => {
                return <div key={obj.id} className="flex font-montserrat text-[14px] w-full border-b-2 justify-between border-verde">
                    <div>{obj.nome}</div>
                    <button className="text-red-800" onClick={() => deletar(obj.id)}>X</button>
                </div>
            })}
        </div>
    )
}