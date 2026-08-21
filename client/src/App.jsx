import { BrowserRouter, Routes, Route } from "react-router-dom";
import StillAngry from "./pages/StillAngry";
import Messages from "./pages/Messages";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StillAngry />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;