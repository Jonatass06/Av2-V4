
import ModalLogin from "@/components/ModalLogin";
import LateralLogo from "@/components/LateralLogo";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {

  const router = useRouter()

  useEffect(() => {
    for (let cookie of document.cookie.split(';')) {
      const [name, value] = cookie.trim().split('=');
      if (name == 'logado') {
        router.push("/usuario/" + value)
      }
    }
  }, [1000])

  return (
    <div className="flex align-center w-screen h-screen bg-branco">
      <LateralLogo />
      <div className="w-[55%] flex justify-center items-center">
        <ModalLogin />
      </div>
    </div>
  )

}