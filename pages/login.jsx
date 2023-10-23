
import ModalLogin from "@/components/ModalLogin";
import LateralLogo from "@/components/LateralLogo";

export default function Login(){
  
  return(
    <div className="flex align-center w-screen h-screen bg-branco">
    <LateralLogo/>
    <div className="w-[55%] flex justify-center items-center">
    <ModalLogin/>
    </div>
    </div>
  )

}