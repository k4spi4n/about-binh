import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Home } from "./pages/Home";
import { Toaster } from "@/components/ui/toaster";
import { IntroVeil } from "./components/motion/IntroVeil";
import { LangProvider } from "./i18n/LangProvider";

function App() {
  // reducedMotion="user": every framer animation (radar, modals, hero scroll)
  // drops its transforms for visitors who ask for reduced motion.
  return (
    <LangProvider>
    <MotionConfig reducedMotion="user">
      <IntroVeil />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
    </LangProvider>
  );
}

export default App;
