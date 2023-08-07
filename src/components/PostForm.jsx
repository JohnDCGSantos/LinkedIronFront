import { useState } from 'react'

const PostForm = ({ onSubmit, defaultValues }) => {
  const [title, setTitle] = useState(defaultValues.title || '')
  const [content, setContent] = useState(defaultValues.content || '')
  const [category, setCategory] = useState(defaultValues.category || 'careers')

  const handleSubmit = async e => {
    e.preventDefault()

    const updatedPostData = {
      title,
      content,
      category,
    }

    onSubmit(updatedPostData)
  }

  const handleCategoryChange = e => {
    console.log('Selected option:', e)
    setCategory(e.target.value)
  }

  return (
    <>
      <form className='post-form' onSubmit={handleSubmit}>
        <div className='form-field'>
          <input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder='Title'
          />
        </div>
        <div className='form-field'>
          <textarea
            id='content'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='Content'
          />
        </div>

        <div className='form-field'>
          <select
            id='category'
            value={category}
            onChange={handleCategoryChange}
            className='form-control'
          >
            <option value='careers'>Careers</option>
            <option value='events'>Events</option>
            <option value='profiles'>Profiles</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <button type='submit'>Submit Post</button>
      </form>
    </>
  )
}

export default PostForm
