/** @format */
//post form
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input,Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbpost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")   // Remove non-word characters except space and hyphen
      .replace(/\s+/g, "-")       // Replace spaces with -
      .replace(/-+/g, "-")        // Replace multiple hyphens with one
      .replace(/^-+|-+$/g, ""); 
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
      return () => {
        subscription.unsubscribe();
      };
    });
  }, [watch, slugTransform, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="sm:w-2/3 w-full py-2 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4 w-full"
                bgColor="bg-gray-900"
            textColor="text-white"
          placeholderTextColor="text-white"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
            className="mb-4 w-full"
            bgColor="bg-gray-900"
            textColor="text-white"
          placeholderTextColor="text-white"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" textColor="text-white" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="sm:w-1/3 w-full py-2 px-2">
            <Input
                label="Featured Image :"
                type="file"
            className="mb-4 w-full"
            textColor="text-white"
            bgColor="bg-gray-900"
            placeholderTextColor="text-white"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
            className="mb-4"
            bgColor="bg-gray-900"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  );
}

export default PostForm;
