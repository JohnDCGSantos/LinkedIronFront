import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetails() {
  const [singlePost, setSinglePost] = useState(null);
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [author, setAuthor] = useState(`${userId}`)
  const [createdAt, setCreateAt] = useState('')
  const [content, setContent] = useState('')
  /* const [likes, setlikes] */
  const [category, setCategory] = useState('')

  const { userId } = useParams();
  console.log("here is the params", userId);

  useEffect(() => {
    const fetchBeer = async () => {
      const response = await fetch(
        `https://ih-beers-api2.herokuapp.com/beers/${userId}`
      );
      if (response.status === 200) {
        const parsed = await response.json();
        setSinglePost(parsed);
      }
    };
    fetchBeer();
  }, [userId]);

  if (!singlePost) {
    return <p>Loading....</p>;
  }
  return ( //acrescentar image ao schema do post.model
    <div className ='PostPageContainer'>
    <div className='imageContainer'>
      <img className='postImage' src={singlePost.image_url} alt="post image" />
      </div>
      <div>
      <form onSubmit={handleSignup} style={formStyle}>
        
        <input
        style={inputStyle}
          type="text"
          value={title}
          required
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder='Title'
        />

         <input
        style={inputStyle}
          type="text"
          value={image}
          required
          onChange={(event) => {
            setImage(event.target.value);
          }}
          placeholder='Image'
        />

        </form>
      </div>
      <h3>{singlePost.tile}</h3>

    </div>
  );
}

export default PostDetails;