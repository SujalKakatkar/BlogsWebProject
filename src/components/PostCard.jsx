//post card
import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
      <Link to={`/Post/${$id}`}>
          <div className="w-full bg-gray-900 text-white rounded-2xl p-4">
              <div className='w-full justify-center mb-6 relative'>
                  <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-2xl ' />
              <h2 className='text-xl font-bold absolute pt-1'>{ title}</h2>
              </div>
          </div>
      </Link>
  )
}

export default PostCard