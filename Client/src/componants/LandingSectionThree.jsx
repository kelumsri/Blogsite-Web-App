import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoMailOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import profilePic from "../assets/profpic2.jpeg";

function LandingSectionThree() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden z-40">
      <div className="bg-white flex flex-row items-start justify-start w-full h-full">
        <div className="w-1/2 h-full flex items-center justify-center">
          <img
            src={profilePic}
            alt="Description of image"
            className="w-3.5/5 h-3/5"
          />
        </div>

        <div className="w-1/2 h-full flex-col flex items-start justify-center pr-52">
          <h1 className="text-6xl font-bold text-black">About Writer</h1>
          <span className=" mt-10">
            Sasuni Arannya is a highly accomplished young scholar with a deep
            passion for integrating Buddhist wisdom and contemporary psychology.
            Sasuni has an impressive academic and professional background,
            including a Diploma in Counseling, training in Buddhist psychology
            and psychotherapy. In addition to her scholarly pursuits, Sasuni has
            gained valuable practical experience through internships and
            programs in psychiatric counseling at the Gampaha District General
            Hospital. Her interdisciplinary expertise and dedication to
            combining ancient Buddhist insights with modern approaches to mental
            health and wellbeing make her a valuable contributor to the field of
            integrative psychology.
          </span>
          <div>
            <div className="mt-10 flex justify-center items-center ">
              <CgProfile size={20} />
              <p className=" ml-5">SASUNI ARANNYA</p>
            </div>
            <p className="ml-10 text-gray-600 font-thin fon">
              BA (Hons) MA Kel'ya
            </p>
          </div>
          <div className="mt-2 flex justify-center items-center ">
            <IoMailOutline size={20} />
            <p className=" ml-5">sasuniaranya@gmail.com</p>
          </div>
          <div className="mt-5 flex justify-center items-center ">
            <IoCallOutline size={20} />
            <p className=" ml-5">077 5864523</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LandingSectionThree;
