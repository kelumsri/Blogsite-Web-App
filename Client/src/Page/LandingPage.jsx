import React, { useRef } from "react";
import Topnav from "../componants/Topnav";
import LandingSectionOne from "../componants/LandingSectionOne";
import LandingSectionTwo from "../componants/LandingSectionTwo";
import LandingSectionThree from "../componants/LandingSectionThree";
import LandingSectionFour from "../componants/LandingSectionFour";
import Footer from "../componants/Footer";

function LandingPage() {
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const sectionFourRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === "Home") {
      sectionOneRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "About") {
      sectionTwoRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Writer") {
      sectionThreeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "Ask me anything") {
      sectionFourRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Topnav scrollToSection={scrollToSection} />
      <div className="">
        <div ref={sectionOneRef}>
          <LandingSectionOne />
        </div>
        <div ref={sectionTwoRef}>
          <LandingSectionTwo />
        </div>
        <div ref={sectionThreeRef}>
          <LandingSectionThree />
        </div>
        <div ref={sectionFourRef}>
          <LandingSectionFour />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
