import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Admin/Login";
import Home from "./Pages/Public/Home";
import PublicLayout from "./layout/publicLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Welcome from "./Pages/Guest/Welcome";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
