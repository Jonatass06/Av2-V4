export default  function Nomes ({ objs, deletar }) {
    return (
        <div  className="flex flex-col items-center w-1/3 gap-1 bg-branco rounded-md min-h-full border-2  border-verde justify-center">
            {objs.map(obj => {
                return <div key={obj.id} className="flex gap-4 font-montserrat text-[14px] w-full p-2 justify-between">
                    <div>{obj.nome}</div>
                    <button className="text-red-800" onClick={() => deletar(obj.id)}>X</button>
                </div>
            })}
        </div>
    )
}