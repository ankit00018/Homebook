import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    return (
        <div className='flex flex-col lg:flex-row'>
        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto h-screen">
        <div className="w-full p-10">
            <Feed />
            <Outlet />
          </div>
        </div>
            <RightSidebar />
        </div>
    )
}

export default Home