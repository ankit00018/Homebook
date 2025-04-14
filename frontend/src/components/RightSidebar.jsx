import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';
import QuickAccessTools from './QuickAccessTools';
import ProfessionalCorner from './ProfessionalCorner';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  

  return (
    <div className="w-[400px] px-4 py-6 bg-white shadow-md border border-gray-300 hidden lg:block">
      <div className='flex items-center gap-2'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className='font-semibold text-sm'>
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className='text-gray-600 text-sm block max-w-[150px] truncate overflow-hidden whitespace-nowrap'>
            {user?.bio || 'Bio here...'}
          </span>
        </div>
      </div>

      <div className="mt-10">
        {/* <SuggestedUsers /> */}
        <QuickAccessTools />
        <ProfessionalCorner />
      </div>
    </div>
  )
}

export default RightSidebar
