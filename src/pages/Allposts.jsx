import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'

function Allposts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([])
            
            .then((posts) => {
               
                if (posts) {
                    setPosts(posts.documents)
                }
       }) 
    })
  return (
      <div className='w-full'>
          <Container>
              <div className='flex w-full justify-center items-center'>
                  <div className='sm:columns-3'>
                      
                  {posts.map((post) => (
                      <div key={post.$id} className='p-2 w-full'>
                          <PostCard {...post} />
                      </div>
                  ))}
                  </div>
              </div>
      </Container>
    </div>
  )
}

export default Allposts
