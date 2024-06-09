
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Highlights from "./components/Highlights";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Categories from "./components/Categories";

export default function LandingPage() {
  

  return (
    <>
    
      <Hero />
      <Box >
        <Categories />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Divider />
        <FAQ />
        <Divider />
        <LogoCollection />
        <Divider />
        <Footer />
      </Box>
    </>
  );
}
