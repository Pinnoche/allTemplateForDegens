// import axios from "../../axios";
import { useSelector } from "react-redux";
export default function Dashboard() {
    const { token } = useSelector((state) => state.auth);
  
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-white font-bold text-4xl">Welcome to the Admin Dashboard</h1>




      <p className="text-center mt-36 text-white">{ token }</p>
    </div>
  )
}
