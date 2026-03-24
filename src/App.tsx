import ThemeProvider from "./context/ThemeProvider";
import PdfViewerProvider from "./context/PdfViewerProvider";
import GlobalStyles from "@styles/GlobalStyles";
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
    <ThemeProvider>
      <PdfViewerProvider>
        <GlobalStyles />
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
      </PdfViewerProvider>
    </ThemeProvider>
  );
}

export default App;
