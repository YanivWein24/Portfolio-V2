import Providers from "./Providers";
import Header from "@components/Layout/Header";
import Hero from "@components/Sections/Hero";
import About from "@components/Sections/About";
import Skills from "@components/Sections/Skills";
import Experience from "@components/Sections/Experience";
import Projects from "@components/Sections/Projects";
import Contact from "@components/Sections/Contact";
import Footer from "@components/Layout/Footer";
import PdfViewerModal from "@components/UI/PdfViewerModal";

function App() {
  return (
    <Providers>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <PdfViewerModal />
    </Providers>
  );
}

export default App;
