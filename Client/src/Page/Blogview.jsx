import React from "react";
import Blogcard from "../componants/Blogcard";
import BlogpageHeader from "../componants/BlogpageHeader";
import Topnav from "../componants/Topnav";
import { useParams } from "react-router-dom";
import content from "../componants/textContent/blogviewdiscription.json";
import Footer from "../componants/Footer";

function Blogview() {
  const { title } = useParams();

  const blogContent = content[title];

  return (
    <>
      <div>
        <Topnav />
      </div>

      <div className="mt-32">
        <div className=" flex flex-col items-start justify-start ml-96 mr-96 mb-20">
          <div className=" flex flex-col justify-start items-start ">
            <h1 className="font-medium text-4xl mb-5">
              {title.replace(/-/g, " ")}
            </h1>
            <p className="">{blogContent}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Blogcard currentBlogTitle={title} />
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default Blogview;
