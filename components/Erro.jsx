export default  function Erro({ mensagem }) {
    return (
        <div className="fixed flex justify-center items-center top-0 bottom-0 right-0 left-0">
            <div >
                <h3>{mensagem}</h3>
            </div>
        </div>
    )
}