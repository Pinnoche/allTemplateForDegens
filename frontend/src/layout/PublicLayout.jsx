import Footer from "../components/Footer";
import PublicNav from "../components/PublicNav";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="relative bg-black w-full min-h-screen flex flex-col">
      <PublicNav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
