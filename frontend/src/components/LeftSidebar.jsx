import {
  Heart,
  Home,
  House,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import HomePageLogo from "@/assets/HomePageLogo.jpg";
import CreateListing from "./CreateListing";
import { clearNotifications } from "@/redux/rtnSlice";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openListing, setOpenListing] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Add this utility function to determine active state
  const getPathForItem = (text) => {
    switch (text) {
      case "Home":
        return "/";
      case "Profile":
        return `/profile/${user?._id}`;
      case "Messages":
        return "/chat";
      case "Explore":
        return "/property";
      default:
        return "";
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Add Listing") {
      setOpenListing(true);
    } else if (textType === "Explore") {
      navigate("/property");
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <House />, text: "Add Listing" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];
  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-64 h-screen bg-white text-black shadow-lg">
      <div className="flex flex-col">
        {/* <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1> */}
        <img
          className="mx-0 mt-5 w-[90%] h-[90%] rounded-xl"
          src={HomePageLogo}
          alt="Homebook Logo"
        />
        <div>
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 relative 
      hover:bg-[#2E42BF]/10 
      active:bg-[#2E42BF]/20 
      hover:text-[#2E42BF] 
      cursor-pointer rounded-lg p-3 my-3 
      transition-all duration-300
      ${
        location.pathname === getPathForItem(item.text)
          ? "bg-[#2E42BF]/10 border-l-4 border-[#9142CA]"
          : ""
      }`}
            >
              {item.text === "Notifications" ? (
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <div className="flex items-center gap-3 relative">
                      {item.icon}
                      <span>{item.text}</span>
                      {likeNotification.length > 0 && (
                        <div className="absolute top-1 right-2">
                          <Button
                            size="icon"
                            className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 text-xs"
                          >
                            {likeNotification.length}
                          </Button>
                        </div>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    side="right"
                    className="w-[300px] p-4 z-[1000]"
                    onInteractOutside={() => {
                      dispatch(clearNotifications());
                    }}
                    onEscapeKeyDown={() => {
                      dispatch(clearNotifications());
                    }}
                  >
                    <div className="max-h-[60vh] overflow-y-auto">
                      {/* Add header with clear button */}
                      <div className="flex items-center justify-between mb-4 mt-1 px-1 transition-all duration-200">
                        <h3 className="font-semibold">Notifications</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dispatch(clearNotifications())}
                        >
                          Clear All
                        </Button>
                      </div>

                      {likeNotification.length === 0 ? (
                        <p className="text-gray-500">No new notifications</p>
                      ) : (
                        likeNotification.map((notification) => (
                          <div
                            key={notification.userId}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={notification.userDetails?.profilePicture}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {notification.userDetails?.username}
                              </p>
                              <p className="text-xs text-gray-500">
                                Liked your post
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div
                  className="flex items-center gap-3 w-full"
                  onClick={() => sidebarHandler(item.text)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {open && <CreatePost open={open} setOpen={setOpen} />}
      {openListing && (
        <CreateListing open={openListing} setOpen={setOpenListing} />
      )}
    </div>
  );
};

export default LeftSidebar;
