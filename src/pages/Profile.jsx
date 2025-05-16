/** @format */

import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Input, PostCard } from "../components";
import { Query } from "appwrite";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      appwriteService
        .getPosts([Query.equal("userId", userData.$id)])
        .then((myposts) => {
          if (myposts) setPosts(myposts.documents);
        });
    } else {
      
    }
  });

  const handleFilechange = async (e) => {
    const imageFile = await appwriteService.uploadFile(e.target.files[0]);
    if (imageFile && imageFile.$id) {
      try {
        await appwriteService.createProfile({
          userId: userData.$id,
          profileImage: imageFile.$id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (userData) {
      appwriteService.getProfile(userData.$id).then((profile) => {
        if (profile) setImageUrl(profile);
      });
      
    }
  });

  return (
    <div className="w-full my-4">
      <div className="w-full flex flex-wrap justify-center items-center">
        <div className="bg-gray-900  rounded-2xl flex flex-wrap max-w-7xl mx-4">
          <div className="w-full flex">
            <div className="w-full sm:min-w-2xl  px-4  py-2 flex justify-start items-center flex-col sm:flex-row  ">
              <div className=" min-w-[15rem] flex justify-center items-center text-sm p-4">
                {imageUrl && (
                  <img
                    src={appwriteService.getFilePreview(imageUrl.profileImage)}
                    alt="user_profile"
                    className="rounded-full w-[10rem] h-[10rem]"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
              <div className=" w-full flex justify-center items-center flex-col text-white text-left">
                {userData && <h1 className="text-4xl font-bold">{userData.name}</h1>}
                <h3 className="italic">{userData && userData.$id}</h3>
              </div>
              <div className="w-full flex justify-center items-center">
                <Input
                  type="file"
                  placeholder="Upload a profile picture"
                  bgColor="bg-gray-500"
                  textColor="text-gray-900"
                  className="w-60"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  onChange={handleFilechange}
                />
                </div>
                </div>
            </div>
          </div>
          <div className="bg-gray-800 m-2 p-2 rounded-2xl w-full flex">
            <div className="sm:columns-3">
              {posts.map((mypost) => (
                <div key={mypost.$id} className="p-2 w-full object-cover">
                  <PostCard {...mypost} />
                </div>
              )) || "No post available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
