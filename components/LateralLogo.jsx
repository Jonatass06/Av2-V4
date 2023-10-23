import Image from "next/image"
export default  function LateralLogo() {
    return (
        <div className="bg-gradient-to-br from-green-600 via-green-600 to-blue-500 opacity-[0.8] h-screen w-[45%] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-8">
                    <Image height={300} width={300} src="./logoAv2.svg" alt="Logo" />
                    <h1 className="text-branco font-chivo text-[50px] text-center">ARNALDO VIEIRA II</h1>
            </div>
        </div>
    )
}