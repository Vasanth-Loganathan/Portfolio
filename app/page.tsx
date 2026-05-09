import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import CurrentlySection from '@/components/currently-section';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <CurrentlySection />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
