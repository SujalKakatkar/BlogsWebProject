/** @format */

import React from "react";
import Container from "../components/container/Container";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <div className="text-white *:mb-2 flex justify-center items-center flex-col">
              <div className="sm:text-3xl text-xl text-white">
                <Typewriter
                  words={[
                    "Exploring new topics...",
                    "Creating with purpose...",
                    "Stories worth telling...",
                    "One post at a time...",
                    "Blogging my experiences...",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  cursorBlinking={false}
                  typeSpeed={120}
                  deleteSpeed={80}
                  delaySpeed={1500}
                />
              </div>
                <h1 className="sm:text-9xl text-7xl font-bold pb-5">Mega Blog</h1>
              <p className="lg:w-[60%] space-x-0.5 text-wrap">
                Welcome to Mega Blog –  A space where ideas come to life.
                From tech insights and creative thoughts to personal experiences
                and helpful tutorials, this blog is a reflection of continuous
                learning and growth. Explore the latest posts, and join me on
                this journey of curiosity and creation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <button onClick={()=>navigate('/signup')} className="px-10 py-3 text-xl text-white  bg-blue-500 rounded-2xl">Get started</button>
              <button onClick={()=>navigate('/login')} className="px-10 py-3 text-xl text-white  bg-blue-500 rounded-2xl">LogIn</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
