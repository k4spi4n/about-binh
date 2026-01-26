import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Toaster } from "@/components/ui/toaster";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <LoadingProvider>
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
