import { Outlet } from "react-router-dom";
import Loading from "@/components/Loading";
import Header from "@/components/Header";


const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh">
        <Loading className='z-40' />

        <Header />
    </div>
  )
}

export default RootLayout;