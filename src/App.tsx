import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/AuthPage";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound";
import ChatScreen from "./components/ChatScreen";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/:type/:id" element={<ChatScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
