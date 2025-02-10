import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Admin/Login";
import Home from "./Pages/Public/Home";
import PublicLayout from "./layout/publicLayout";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
