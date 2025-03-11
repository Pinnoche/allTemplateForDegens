
import { useSelector } from "react-redux";

export default function Dashboard() {
  // Fetch user and loading state from Redux store
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">No user data available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-white font-bold text-4xl">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-center mt-36 text-white">
        Hello, {user.name || user.email}!
      </p>
    </div>
  );
}