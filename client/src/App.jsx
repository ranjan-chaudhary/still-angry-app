import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StillAngry from "./pages/StillAngry";
import Messages from "./pages/Messages";
import OpenWhen from "./pages/OpenWhen";
import Letter from "./pages/Letter";
import Playlist from "./pages/Playlist";
import TalkToMe from "./pages/TalkToMe";
import Memories from "./pages/Memories";
import SpecialDays from "./pages/SpecialDays";
import Surprise from "./pages/Surprise";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/special-days" element={<SpecialDays />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/talk-to-me" element={<TalkToMe />} />
        <Route path="/" element={<Home />} />

        <Route path="/open-when" element={<OpenWhen />} />
        <Route path="/open-when/:type" element={<Letter />} />

        <Route path="/playlist" element={<Playlist />} />

        <Route path="/still-angry" element={<StillAngry />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;