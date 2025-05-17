//post component
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Button } from '../components'
import { Link } from 'react-router-dom'

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();

    

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log(post);
                
                if (post) setPost(post)
                else navigate('/')
            });
            
        } else
            navigate('/')
    }, [slug, navigate]);
    console.log();
    

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate('/')
            }
        });
    };

    
    return post ? (
        <div className="w-full flex justify-center items-center py-8 ">
            <div className='w-[50%] px-4'>
                <div className=" flex justify-center rounded-t-xl p-4 bg-gray-900 ">
                     <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl object-center"
                    />   
                </div>
                <div className="pt-4 pb-2 text-center  bg-gray-900">
                    <h1 className="text-4xl text-white font-bold">{post.title}</h1>
                </div>
                
                <div className={`browser-css  pb-4  text-center text-white bg-gray-900 ${!isAuthor? "rounded-b-xl":"rounded-b-none"}`}>
                    {parse(post.content) || "content not found"}
                </div>
                {isAuthor && (
                        <div className="bg-gray-900 rounded-b-xl flex justify-center items-center py-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" textColor='text-gray-900' className="mr-3 ">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-400" textColor='text-gray-900' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    ) : null;
}

 
