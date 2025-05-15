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
    appwriteService
      .getPosts([Query.equal("userId", userData.$id)])
      .then((myposts) => {
        if (myposts) setPosts(myposts.documents);
      });
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
    appwriteService.getProfile(userData.$id).then((profile) => {
      console.log(profile.profileImage);
      if (profile) setImageUrl(profile);
    });
  }, [userData]);

  return (
    <div className="w-full my-4">
      <div className="w-full flex flex-wrap justify-center items-center">
        <div className="bg-gray-900  rounded-2xl flex flex-wrap max-w-7xl mx-4">
          <div className="w-full flex">
            <div className="w-full py-2 flex relative">
              <div className="w-20 text-sm p-4">
                {imageUrl && (
                  <img
                    src={appwriteService.getFilePreview(imageUrl.profileImage)}
                    alt="user_profile"
                    className="rounded-full"
                  />
                )}
              </div>
              <div className=" text-white text-left">
                <h1 className="text-4xl font-bold">{userData.name}</h1>
                <h3 className="italic">{userData.$id}</h3>
              </div>
              <div>
                <Input
                  type="file"
                  placeholder="Upload a profile picture"
                  bgColor="bg-gray-500"
                  textColor="text-gray-900"
                  className="absolute right-4 top-8"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  onChange={handleFilechange}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-500 m-2 p-2 rounded-2xl w-full flex">
            <div className="sm:columns-3">
              {posts.map((mypost) => (
                <div key={mypost.$id} className="p-2 w-full object-cover">
                  <PostCard {...mypost} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
