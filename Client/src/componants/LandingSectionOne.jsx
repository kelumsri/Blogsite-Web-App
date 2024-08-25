import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackVideo from "../assets/Back_video_01.mp4";

export function LandingSectionOne() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    const formattedTitle = title.replace(/\s+/g, "-");
    navigate(`/blogview/${formattedTitle}`);
  };

  const slogans = [
    {
      title: "Bridging Ancient Wisdom with Modern Healing",
      description:
        "Discover how Buddhist teachings and modern psychology converge to foster holistic well-being, guiding you towards a balanced mind, body, and spirit.",
    },
    {
      title: "Mindfulness Meets Science",
      description:
        "Unlock the synergy between time-honored Buddhist practices and evidence-based psychological strategies, offering a path to mental clarity and personal growth.",
    },
    {
      title: "Your Journey to Enlightened Living Starts Here",
      description:
        "Embark on a transformative journey where the ancient wisdom of the dharma meets cutting-edge research, helping you cultivate a purposeful and mindful life.",
    },
    {
      title: "Wisdom for the Modern Mind",
      description:
        "Explore the intersection of Buddhist philosophy and contemporary counseling, providing you with the tools to navigate life's complexities with grace and insight.",
    },
    {
      title: "Integrating Tradition with Transformation",
      description:
        "Wisdompedia blends Buddhist insights with modern therapeutic practices, offering practical approaches to enhance your mental and spiritual well-being.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [slogans.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="fixed inset-0 w-full h-full object-cover"
        src={BackVideo}
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="pt-32 w-full flex flex-col overflow-hidden relative h-screen">
        <div className="text-stone-100 flex justify-center items-center font-black text-9xl h-1/2">
          WISDOMPEDIA
        </div>

        <div className="relative h-1/2 bg-white grid grid-rows-2">
          {/* 1st div */}
          <div className="relative flex justify-center items-center">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-80 h-32 w-3/5 flex justify-center items-center rounded-b-xl gap-20">
              <button
                onClick={() => handleClick("Buddhist Psychology")}
                type="button"
                className="text-white hover:text-white border border-gray-400 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm w-44 px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Buddhist Psychology
              </button>
              <button
                onClick={() => handleClick("Applied Buddhism")}
                type="button"
                className="text-white hover:text-white border border-gray-400 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm w-44 px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
              >
                Applied Buddhism
              </button>
              <button
                onClick={() => handleClick("Research Paper")}
                type="button"
                className="text-white hover:text-white border border-gray-400 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm w-44 px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
              >
                Research Paper
              </button>
              <button
                onClick={() => handleClick("Indexed Journals")}
                type="button"
                className="text-white hover:text-white border border-gray-400 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm w-44 px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Indexed Journals
              </button>
            </div>
          </div>
          {/* 2nd div */}
          <div className="flex justify-center items-start pt-2">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {slogans[currentIndex].title}
              </h2>
              <p className="text-lg text-gray-600">
                {slogans[currentIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSectionOne;
