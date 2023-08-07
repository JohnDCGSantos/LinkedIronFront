import PostForm from '../components/PostForm'

function CreatePostPage(){
    return(
    <div>
        <h1>Create your post here</h1>
       
        <PostForm onSubmit={(updatedPostData) => {
            console.log("Updated post data:", updatedPostData);
          }}
          defaultValues={{}} />
      </div>
    )
}

export default CreatePostPage;