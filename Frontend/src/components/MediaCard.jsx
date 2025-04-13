import Wrapper from "./Wrapper.jsx";
import { Heart, Send, MessageCircle  } from 'lucide-react';

const MediaCard=({name, caption, comments, media, likes, photoURL })=>{
    console.log(media);
    return (
        
            <div className="box-border">

                <div className="flex gap-3 items-center py-1 px-1 text-black dark:text-white">
                    <img src={photoURL} alt="user_img" className="size-9 rounded-full border-2 border-pink-200 dark:border-pink-800"/>
                    <div>
                    <h3 className="font-medium text-black dark:text-white font-roboto text-sm">{name}</h3>
                    <p className="text-[12px] text-black dark:text-white">Jai Shree Ram</p>
                    </div>
                </div>
                <div className="mb-2 border-t border-b border-gray-100 dark:border-gray-800">
                    <img src={media} alt="" className="object-cover w-full "/>
                </div>
                <div className="flex gap-2 px-3 py-1 text-black dark:text-white">
                    <Heart />
                    <MessageCircle className="rotate-270"/>
                    <Send className="rotate-20"/>
                </div>
                <div className="px-4 py-1 text-[16px] font-medium text-black dark:text-white">
                    {`${likes} likes`}
                    <div className="font-medium text-black dark:text-white font-roboto text-sm">{name} <span className="font-normal text-gray-800 dark:text-gray-400 ">{caption}</span></div>
                    <h4 className="font-normal text-[14px] text-gray-500  cursor-pointer">View all {comments.length} {comments.length>1 ? "comments": "comment"}</h4>
                    <h4 className=" font-normal text-gray-500 cursor-pointer ">Add a comment...</h4>

                </div>
                
                

            </div>

    )
}

export default MediaCard;