import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import { Query } from 'appwrite';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData)
    
    
    useEffect(() => {
        appwriteService.getPosts([Query.equal("userId", userData.$id)]).then((myposts) => {
            
            
            if(myposts) setPosts(myposts.documents)
        })
    })
    
  return (
    <div className='w-full py-8'>
          <Container>
              <div className='flex w-full justify-center items-center'>
                  <div className='sm:columns-3'>
                  { posts.map((mypost) => (
                      <div key={mypost.$id} className='p-2 w-full'>
                          <PostCard {...mypost} />
                      </div>
                  ))}
                  </div>
              </div>
      </Container>
    </div>
  )
}

export default MyPosts
