import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function LandingSectionFour() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [yourname, setYourname] = useState("");

  const serviceId = "service_9ouw5zs";
  const templateId = "template_1gzyflj";
  const publicKey = "8tgMyK12TWZdlufdi";

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setMessage(textarea.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const templateParams = {
      from_name: yourname,
      from_email: email,
      to_name: "Sasuni Aranya",
      message: message,
      reply_to: email,
    };

    console.log(yourname);
    console.log(email);

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setYourname("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email", error);
      });
  };

  return (
    <div className="relative w-full h-[52rem] overflow-hidden">
      <div className="h-[52rem] w-full bg-black bg-opacity-80 flex flex-col items-center justify-center overflow-hidden p-40 opacity-100">
        <h1 className="text-6xl font-bold text-white">Ask me Anything</h1>

        <form
          onSubmit={handleSubmit}
          className="text-white flex flex-col items-start justify-normal w-2/3 h-full mt-20"
        >
          <div className="flex flex-row gap-10 w-full">
            <div className="w-1/2">
              <label
                htmlFor="input-group-1"
                className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-400"
              >
                Your Email
              </label>
              <div className="relative mb-6 w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@samplemail.com"
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="input-group-2"
                className="block mb-2 text-sm font-medium text-gray-400 dark:text-gray-400"
              >
                Your Name
              </label>
              <div className="relative mb-6 w-full">
                <input
                  type="text"
                  id="input-group-2"
                  value={yourname}
                  onChange={(e) => setYourname(e.target.value)}
                  className="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name here"
                  required
                />
              </div>
            </div>
          </div>

          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
          >
            Message
          </label>
          <div className="flex w-full">
            <textarea
              id="website-admin"
              className="rounded-lg bg-gray-900 border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-56 h-56"
              placeholder="Enter your message here"
              value={message}
              onInput={handleInput}
              required
            />
          </div>
          <button
            type="submit"
            className="text-gray-400 hover:text-white border border-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-lg text-sm w-44 px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 mt-10"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingSectionFour;
