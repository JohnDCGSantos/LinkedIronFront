import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
import React from 'react';
import Select from 'react-select';


function PostForm (props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const nav = useNavigate()

const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
        const res = await axios.post(
          'http://localhost:5005/api/posts',
  
          { title,
            content,
            author,
            image,
            category,
            createdAt }
        )
        
  
        console.log('here is the post response', res.data)
        nav(`/Feed/`) //Falta userId
      } catch (error) {
        console.error(error)
      }
      {
        setTitle('')
        setContent('')
        setAuthor('')
        setImage('')
        setCategory('')
        setCreatedAt('')
    }
}
const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    setImage(selectedFile);
  };

  const categoryDropDown = [
    { value: 'careers', label: 'Careers' },
    { value: 'events', label: 'Events' },
    { value: 'profiles', label: 'Profiles' },
    { value: 'other', label: 'Other' },
       
    
  ];
  const handleSelectChange = (selectedOption) => {
    console.log('Selected option:', selectedOption);
    setSelectedCategory(selectedOption);
  };
  
  
    return(
        <>
         <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-field">
        
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder='Title'
        />
      </div>
      <div className="form-field">
        
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          
          placeholder='Content'
        />
      </div>

      <div className="form-field">
        <span>{props.username}</span>
      </div>
      
      <div className="form-field">
        <input
          
          id="Image"
          value={image}
          onChange={handleFileChange}
          placeholder='Image'
        />
        <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ border: '2px dashed #ccc', padding: '10px' }}>
        {image ? (
          <p>Selected File: {image.name}</p>
        ) : (
          <p>Drag and drop a file here</p>
        )}</div>

      </div>

      <div className="form-field" >
      <Select options={categoryDropDown}
      id="category"
      value={selectedCategory}
       onChange={handleSelectChange}
       required
       placeholder="Select a category"
       />
        
      </div>

      <div className="form-field">
        <input
          type="date"
          id="createdAt"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          required
        />
      </div>

      <button type="submit">Submit Post</button>
    </form>
  
        </>
    )
}

export default PostForm