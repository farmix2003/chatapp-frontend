import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
