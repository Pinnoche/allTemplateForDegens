import GuestNav from "../components/GuestNav";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="relative bg-gradient-to-tr from-black via-gray-900 to-gray-800 min-h-screen w-full flex flex-col gap-6 text-white">
      <GuestNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
