export default function GuestNav() {
  return (
    <nav className="fixed top-0 z-20 backdrop-blur-sm bg-transparent w-full px-10 py-4">
      <div className="flex justify-between items-center text-white">
        <div className="font-bold text-2xl animate-pulse">Degen Web App</div>
        <div className="flex gap-4">
          <a href="#" className="">
            Moderator
          </a>
          <a href="#" className="">
            Admins
          </a>
        </div>
        <div className="flex gap-4">
          <a href="/register" className="">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
