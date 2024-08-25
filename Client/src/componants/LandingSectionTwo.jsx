import React from "react";
import secondBackground from "../assets/secondBackground.png";
import thiredBackground from "../assets/thiredBackground.png";

function LandingSectionTwo() {
  return (
    <div className="relative z-20 overflow-hidden">
      {/* Container with a fixed background */}
      <div
        className="h-screen w-full bg-fixed flex flex-row items-start justify-start overflow-hidden  bg-white"
        style={{
          backgroundImage: `url(${secondBackground})`,
          backgroundAttachment: "fixed",
          backgroundSize: "100% 100%",
          backgroundPosition: "left",
        }}
      >
        <div className="flex flex-row h-full">
          <div className="w-1/2"></div>
          <div className="w-1/2 pr-32 relative z-10 mt-10">
            <h1 className="text-6xl font-bold text-black mt-32">
              Wisdompedia is what?
            </h1>
            <p className="mt-10">
              Welcome to Wisdompedia
              <br />
              your comprehensive resource for exploring the intersection of
              Buddhist wisdom and modern psychology, counseling, and applied
              practice. As the world becomes increasingly complex, many are
              seeking holistic approaches to personal growth, mental well-being,
              and living with greater purpose. Wisdompedia is dedicated to
              bridging the profound insights of the Buddhist tradition with
              practical, evidence-based strategies for enhancing mind, body, and
              spirit. <br />
              <br />
              Whether you're a seasoned Buddhist practitioner, a mental health
              professional, or simply someone curious about integrating ancient
              teachings into everyday life, you'll find a wealth of curated
              information, tools, and community on Wisdompedia. Discover how the
              Buddhist understanding of the mind, suffering, and the path to
              liberation can revolutionize your approach to psychology,
              counseling, and personal development. Explore cutting-edge
              research on the cognitive, neurological, and behavioral
              implications of Buddhist philosophy. Gain guidance from expert
              teachers on applying mindfulness, compassion, and other core
              Buddhist principles to your personal and professional life.
              Wisdompedia is your centralized hub for unlocking the
              transformative power of the dharma. Dive in, expand your wisdom,
              and embark on a journey of enlightened living.
            </p>
            <div className=" flex justify-end items-end mr-10">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mt-10 inline-block "
              >
                Additional reading sources
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NEXT SECTION */}
      <div
        className="h-[58rem] w-full bg-fixed flex flex-row items-center justify-center overflow-hidden bg-white "
        style={{
          backgroundImage: `url(${thiredBackground})`,
          backgroundAttachment: "fixed",
          backgroundSize: "100% 100%",
          backgroundPosition: "right",
        }}
      >
        <div className="text-black flex flex-col relative ml-32">
          <div className=" w-1/2 pl-32">
            <h1 className="text-6xl font-bold text-black">Vision</h1>
            <p className=" mt-10">
              To be the leading online resource and community for integrating
              the timeless wisdom of Buddhism with modern approaches to
              psychology, counseling, and personal/professional development
            </p>
          </div>
          <div className="w-1/2 pl-56">
            <h1 className="text-6xl font-bold text-black mt-28">Mission</h1>
            <p className="mt-10">
              Wisdompedia's mission is to provide accessible resources and a
              vibrant community for integrating the timeless principles of
              Buddhism into modern approaches to mental health, wellbeing, and
              human flourishing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSectionTwo;
