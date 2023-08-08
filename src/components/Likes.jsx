import { useState, useEffect } from "react";
import axios from 'axios'

const LikeButton = ( { postId } ) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        // Fetch the initial like count from the backend when the component mounts
        fetchLikes();
      }, [postId]);

    const fetchLikes = async () => {
        try {
          const response = await axios.get(`http://localhost:5005/posts/posts`);
          const post = response.data;
          setLikes(post.likes);
        } catch (error) {
          console.error('Error fetching likes:', error);
        }
      };

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('authToken');
    
          const response = await axios.post(`http://localhost:5005/posts/posts/${postId}/like`,
          {
            likes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            const updatedPost = response.data;
            setLikes(likes + 1);
            setIsLiked(true);
          console.log(updatedPost)
        } catch (error) {
          console.error('Error liking post:', error);
        }
      };

      const handleUnlike = async () => {
        try {
            const token = localStorage.getItem('authToken');

          const response = await axios.post(`http://localhost:5005/posts/posts/${postId}/like`,
          {
            likes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            const updatedPost = response.data;
            setLikes(likes - 1);
            setIsLiked(false);
            console.log(updatedPost)
        } catch (error) {
          console.error('Error unliking post:', error);
        }
      };
  /*       const [likes, setLikes] = useState(0);

        useEffect(() => {
            // Fetch the initial like count from the backend when the component mounts
            fetchLikes();
          }, [postId]);

        const fetchLikes = async () => {
            try {
              const response = await axios.get(`http://localhost:5005/posts/${postId}`);
              const post = response.data;
              setLikes(post.likes);
            } catch (error) {
              console.error('Error fetching likes:', error);
            }
          };

        const handleLikeClick = async (e)=>{
            e.preventDefault();
        
            try {
                const token = localStorage.getItem('authToken');
        
                const response = await axios.post(
                  `http://localhost:5005/posts/posts/${postId}/like`,
                  { 
                    
                    likes,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                const updatedPost = response.data;
                setLikes(updatedPost.likes + 1 );
                console.log('here is the post response', response.data)
                
              } catch (error) {
                console.error(error)
              }
            }

              const handleUnlikeClick = async (e) => {
                e.preventDefault();
                try {
                  const response = await axios.post(`http://localhost:5005/posts/posts/${postId}/like`);
                  const updatedPost = response.data;
                  setLikes(updatedPost.likes - 1);
                } catch (error) {
                  console.error('Error removing like:', error);
                }
              }; */


    return (
    <>
   
    <button onClick={isLiked ? handleUnlike : handleLike}>
        {isLiked ? 'Unlike' : 'Like'}</button>
    
    <span>{likes} Likes</span>
        </>
        )
}

export default LikeButton;