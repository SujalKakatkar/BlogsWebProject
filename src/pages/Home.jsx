/** @format */

import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Allposts from "./AllPosts";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length != 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <div className="text-white  *:mb-2 flex justify-center items-center flex-col">
                <div className="sm:text-3xl text-xl text-red-200">
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
                    delaySpeed={80}
                  />
                </div>
                <h1 className="sm:text-9xl text-7xl font-bold pb-5">Mega Blog</h1>
                <p className=" w-[60%]  space-x-0.5">
                  Welcome to Mega Blog – A space where ideas come to life. From
                  tech insights and creative thoughts to personal experiences
                  and helpful tutorials, this blog is a reflection of continuous
                  learning and growth. Explore the latest posts, and join me on
                  this journey of curiosity and creation.
                </p>
              </div>
              <div className="w-full flex ">
                <Allposts />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
