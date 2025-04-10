import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import Login from "./Pages/Admin/Login";
import Signup from "./Pages/Admin/Signup";
import Home from "./Pages/Public/Home";
import PublicLayout from "./layout/publicLayout";
import Welcome from "./Pages/Guest/Welcome";
import GuestLayout from "./layout/GuestLayout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./store/reducers/authSlice";
import { LottiePlay } from "./components/LottiePlay";
import { Toaster } from "sonner";
function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
    console.log("Current user:", user);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Routes>
        <Toaster
          duration={5000}
          position="top-center"
          z-index= {100}
          // closeButton={true}
          // expand
          icons={{
            success: <LottiePlay />,
          }}
          toastOptions={{
            unstyled: true,
            classNames: {
              closeButton:
                "absolute top-2 right-2 bg-primary text-white rounded-full p-1 cursor-pointer",
              toast:
                "text-text bg-white rounded-[5px] font-thin text-sm flex gap-3 shadow-md shadow-[#B63B562B] p-6 border-[0.1px] border-text-xtralight-alt min-w-[200px] max-w-[350px]",
              error:
                "text-text bg-white rounded-[5px] font-thin text-sm flex gap-3 shadow-md shadow-[#B63B562B] p-6 border-[0.1px] border-text-xtralight-alt min-w-[200px] max-w-[350px]",
              success:
                "text-text bg-white rounded-[5px] font-thin text-sm flex gap-3 shadow-md shadow-[#B63B562B] p-6 border-[0.1px] border-text-xtralight-alt min-w-[200px] max-w-[350px]",
            },
          }}
          pauseWhenPageIsHidden
        />
      </Router>
    </div>
  );
}

export default App;
