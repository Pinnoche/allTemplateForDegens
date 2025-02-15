import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Admin/Login";
import Home from "./Pages/Public/Home";
import PublicLayout from "./layout/publicLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Welcome from "./Pages/Guest/Welcome";
import GuestLayout from "./layout/GuestLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/reducers/authSlice";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector( state => state.auth)
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={user ? <PublicLayout /> : <Login/ >}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
