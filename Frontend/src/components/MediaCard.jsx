import React, { useRef, useState } from "react";
import Wrapper from "./Wrapper.jsx";
import { Heart, Send, MessageCircle, ChevronLeft, ChevronRight, SendHorizontal  } from 'lucide-react';
import axios from "axios";

const MediaCard = ({ name, caption, comments, media, likes, photoURL, postId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const apiUrl= import.meta.env.VITE_API_URL;
    const [isLiked, setIsLiked] = useState(false);
    const commentText = useRef();
    const [commentInput, setCommentInput] = useState(false);
    const [commentVisibility, setCommentVisibility]= useState(false);

    const mediaArray = Array.isArray(media) ? media : [media];
    const totalImages = mediaArray.length;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
    };

    const handleComment=()=>{
        setCommentInput((prev)=> !prev);
    }

    const postComment = async () => {
        const comment = commentText.current?.value?.trim();
    
        if (!comment) {
            alert("Please enter a comment.");
            return;
        }
    
        const body = {
            like: !!isLiked,
            comment,
            postId
        };
    
        try {
            const res = await axios.post(`${apiUrl}/application/api/post-comments`, body, {
                withCredentials: true
            });
    
            if (res.data?.ok) {
                alert("Comment added successfully");
                commentText.current.value = "";
                window.location.reload(); // Clear the input
                // Optional: Call a function to refresh comments UI
            } else {
                alert("Something went wrong. Please try again.");
            }
    
        } catch (err) {
            console.error("Error posting comment:", err);
            alert("Failed to post comment. Please check your connection.");
        }
    };
    


    const CommentComponent = ({ text, user }) => {
        return (
            <div className="flex items-start gap-4 py-1 px-4 mb-2">
               {
                user?.photoURL ? (
                    <img 
                        src={user?.photoURL} 
                        alt="user avatar" 
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                            />
                        </svg>
                    </div>
                )
            }
                <div className="flex flex-col ">
                    <div className="flex items-start flex-col gap-2">
                        <div className="font-semibold text-sm text-black dark:text-white">
                            {user?.Name || "Anonymous"}
                        </div>
                        <div className="text-sm font-normal text-gray-600 dark:text-gray-200">
                            {text}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    };
    




    return (
        mediaArray &&
        <div className="box-border">
            {/* Top: User Info */}
            <div className="flex gap-3 items-center py-1 px-1 text-black dark:text-white">
                <img src={photoURL} alt="user_img" className="size-9 rounded-full border-2 border-pink-200 dark:border-pink-800" />
                <div>
                    <h3 className="font-medium text-black dark:text-white font-roboto text-sm">{name}</h3>
                    <p className="text-[12px] text-black dark:text-white">Jai Shree Ram</p>
                </div>
            </div>

            {/* Media Carousel */}
            <div className="relative mb-2 border-t border-b border-gray-100 dark:border-gray-800">
                <div className="overflow-hidden max-h-[400px] w-full flex justify-center items-center bg-white transition-colors duration-300 dark:bg-black">
                    <img
                        src={mediaArray[currentIndex]}
                        alt={`Media ${currentIndex + 1}`}
                        className="object-contain w-full max-h-[400px] transition-transform duration-300"
                    />
                </div>

                {totalImages > 1 && (
                    <>
                        <button
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/80 p-1 cursor-pointer rounded-full"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="text-black dark:text-white" />
                        </button>
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/80 p-1 cursor-pointer rounded-full"
                            onClick={handleNext}
                        >
                            <ChevronRight className="text-black dark:text-white" />
                        </button>
                    </>
                )}
            </div>

            {/* Action Icons */}
            <div className="flex gap-2 px-3 py-1 text-black dark:text-white">
                <Heart className={`${isLiked && "text-red-500" } cursor-pointer`} onClick={()=>setIsLiked((prev)=>!prev)}/>
                <MessageCircle className="rotate-270" />
                <Send className="rotate-20" />
            </div>

            {/* Post Details */}
            <div className="px-4 py-1 text-[16px] font-medium text-black dark:text-white transition-colors duration-300">
                {`${likes} likes`}
                <div className="font-medium text-black dark:text-white font-roboto text-sm">
                    {name}{" "}
                    <span className="font-normal text-gray-800 dark:text-gray-400">{caption}</span>
                </div>
                <h4 className="font-normal text-[14px] text-gray-500 cursor-pointer" onClick={()=>setCommentVisibility((prev)=>!prev)}>
                     {`${commentVisibility? "Hide all" : "View all"}`} {comments.length} {comments.length > 1 ? "comments" : "comment"}
                </h4>
                <h4 className="font-normal text-gray-500 cursor-pointer" onClick={handleComment}>Add a comment...</h4>
                {commentInput && <div>
                    <textarea ref={commentText} className="w-full h-25 resize-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none" placeholder="add your comment..." />
                    <div className="flex justify-end"> <SendHorizontal onClick={postComment}/></div>
                </div>}
                {commentVisibility && <div className=" px-4">
                    {
                        comments.map(({_id, user, text})=>{
                            return <CommentComponent key={_id} user={user} text={text}/>
                        })
                    }
                </div>}
            </div>
        </div>
    );
};

export default MediaCard;
