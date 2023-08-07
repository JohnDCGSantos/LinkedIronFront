import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import axios from 'axios';

function UpdatePostPage () {
    const { postId } = useParams()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    // const [image, setImage] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const nav = useNavigate();

    /*** Edit a Post ***/

    const fetchPost = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await axios.get(`http://localhost:5005/posts/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        })
        const post = response.data;
        console.log(post)
        setTitle(post.title)
          setContent(post.content)
          setAuthor(post.author)
          setCreatedAt(post.createdAt)
          setSelectedCategory(post.selectedCategory)
          setIsLoading(false)
        
        } catch (error) {
            console.log("Error fetching post", error);
        }
      }

     /* if (response.status === 200) {
          const post = await response.json()
          
        } */

      useEffect(() => {
        fetchPost()
      }, [])
    
      const handleSubmit = async payload => {
          
          try {
              const token = localStorage.getItem("authToken");
            
          const response = await axios.put(`http://localhost:5005/posts/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
          if (response.status === 200) {
            const updatedPost = await response.json()
            nav(`/posts/${updatedPost._id}`)
          }
        } catch (err) {
          console.log(err)
        }
      }
    
      return (
        <>
          {!isLoading && (
            <PostForm onSubmit={handleSubmit} defaultValues={{
                title,
                content,
                author,
                createdAt,
                selectedCategory }} />
          )}
        </>
      )
    }
export default UpdatePostPage;