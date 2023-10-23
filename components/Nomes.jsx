export default  function Nomes ({ objs, deletar }) {
    return (
        <div  className="flex flex-col">
            {objs.map(obj => {
                return <div key={obj.id} className="flex">
                    <div>{obj.nome}</div>
                    <button onClick={() => deletar(obj.id)}>X</button>
                </div>
            })}
        </div>
    )
}