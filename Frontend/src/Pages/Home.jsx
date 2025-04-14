import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar.jsx';
import TopBar from '../components/TopBar.jsx';
import MediaCard from '../components/MediaCard.jsx';

const Home = () => {


  const apiUrl = import.meta.env.VITE_API_URL;

  const [feedPosts, setFeedPosts] = useState([]);


  const fetchFeed = async () => {
    const res = await axios.get(`${apiUrl}/application/api/get-feed-posts`, {
      withCredentials: true
    });
    setFeedPosts(res.data.data);
  }
  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(()=>{
    console.log("Feed Posts Data: ",feedPosts);
  }, [feedPosts])
 
  return (
    <div className=' flex-col flex items-center  ' >
      
      <TopBar />
      <div className='w-full h-18 border-b border-gray-200 dark:border-gray-800 mt-14 m-auto max-w-[450px] box-border'>

      </div>
      <div className='flex box-border flex-col gap-2 overflow-hidden  m-auto max-w-[450px] pb-10'>

        {
          feedPosts.length > 0 ?
            feedPosts.map(({author, _id, comments, caption, likes, photoURL, media}) => {
              return <MediaCard key={_id} name={author} comments={comments} caption={caption} likes={likes} photoURL={photoURL} media={media} postId={_id}/>
            })
            : <></>
        }
      </div>

      <BottomBar />
    </div>
  );
};

export default Home;
