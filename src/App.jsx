import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Toaster } from "@/components/ui/toaster";
import { LoadingProvider } from "./contexts/LoadingContext";
import { IntroVeil } from "./components/motion/IntroVeil";

function App() {
  return (
    <LoadingProvider>
      <IntroVeil />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
