import { Routes, Route } from "react-router-dom";
import GetStartedPage from "./pages/GetStartedPage";
import StartFormPage from "./pages/StartFormPage";
import GamingPage from "./pages/GamingPage";
import NarrowSpecsPage from "./pages/NarrowSpecsPage";
import BuildPage from "./pages/BuildPage";
import ChatPage from "./pages/ChatPage";
import HelpPage from "./pages/HelpPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/start" element={<StartFormPage />} />
      <Route path="/gaming" element={<GamingPage />} />
      <Route path="/narrow" element={<NarrowSpecsPage />} />
      <Route path="/build" element={<BuildPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/help" element={<HelpPage />} />
    </Routes>
  );
}

