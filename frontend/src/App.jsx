import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
          <Route
            path="/home"
            element={ <PublicLayout />}
          >
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
              <Route path="/admin" element={ <Dashboard /> } />
           
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
