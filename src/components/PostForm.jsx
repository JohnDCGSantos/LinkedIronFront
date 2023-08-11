import { useState } from "react";

const PostForm = ({ onSubmit, defaultValues }) => {
  const [title, setTitle] = useState(defaultValues.title || "");
  const [content, setContent] = useState(defaultValues.content || "");
  const [category, setCategory] = useState(defaultValues.category || "careers");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPostData = {
      title,
      content,
      category,
    };

    onSubmit(updatedPostData);
  };

  const handleCategoryChange = (e) => {
    console.log("Selected option:", e);
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="form-container">
        <div className="row ">
          <div className="col-md-5">
            <form className="post-form " onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="careers">Careers</option>
                  <option value="events">Events</option>
                  <option value="profiles">Profiles</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{marginTop:"10px"}}>
                Submit Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;
