import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../index.css";

export function About() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>THIS IS THE ABOUT PAGE</h1>
      </div>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <About />
  </StrictMode>
);
