LinkdIron

Description
The purpose of this app is to connect Alumni and staff from Ironhack.
The goal was to create a platform where you can share posts about events, job opportunities and other curiosities you may feel that will add value to everyone.

User Stories
Signup: As an anon I can sign up in the platform so that I can start creating and managing my account
Login: As a user I can login to the platform so that I can start creating and managing my account
Logout: As a user I can logout from the platform so no one else can modify my information
404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

Check Posts: As a user I can check other's people posts
Create elements: As a user I can add posts to my account
Edit elements: As a user I can add posts to my account
Delete elements: As a user I can delete posts from my account
Check profile: As a user I can check my profile
Update profile: As a user I can update my profile
Delete Profile: As a user I can delete my profile
Follow feature: As a user I can follow and unfollow other users
Search feature: As a user I can search for specific posts, filter by categories

Backlog
Follow functionality
Followers and Following list
Posts search bar by categories
Add and remove images to posts, likes, comments and share the post
Check your own profile and update it

Client / Frontend

React Router Routes (React App)
Path | Component | Permissions | Behavior |
|------------------ |-----------------------|------------------------|----------------|
|/ |HomePage, Navbar |public <Route> |Home page
|/signup |Signup, Navbar |public <Route> |Signup form, link to login and home page, navigate to login after signup
|/login |Login, Navbar |public <Route> |Login form, link to signup and home page, navigate to profile after login
|/logout |n/a |user only <PrivateRoute>|Navigate to login after logout, expire session
|/following |NavBar, ElementList |user only <PrivateRoute>|Shows all following users/followers
|/Feed |NavBar, Feed |user only <PrivateRoute>|Shows all posts
|/posts/:postId |PostPage, SearchResults|user only <PrivateRoute>|Shows post with specific Id
|/posts/:postId/edit|EditPostPage |user only <PrivateRoute>|Edit selected post
|/Profile |Profile |user only <PrivateRoute>|User details
|/NewPost |CreatePostPage |user only <PrivateRoute>|Create a post
|/Users |Users list |user only <PrivateRoute>|User list

Pages
Home Page (public)
Signup (public)
Login (public)
Feed (user)
CreatePost (user)
EditPost (user)
FollowingPage (user)
PostDetails (user)
PostPage (user)
Profile (user)
Users (user)
Error (public)

Components
Actions
CategorySearch
CloudinaryUpload
Comments
FollowButton
FollowersList
FollowingList
Likes
Navbar
Post
PostForm
PostItem
PrivateRoute
UserCard
UserImage

IO
Services
Auth Service
auth.login(user)
auth.signup(user)
auth.logout()
auth.context

Backlog Service
filter by categories //for different types of posts- career, profiles, events, others
Post:
Create
Read more
Edit
Delete
Profile:
Update
Delete

Internal API

Server
Models
User model
username
email
password
image
bootcamp
graduationDate
following
followers
isAdmin

Post modelauthor
title
createdAt
content
likes
category
comments
media

Comments model
content
author
post

API Endpoints/Backend Routes
INDEX ROUTES ----

GET /api/
Home page

AUTH ROUTES----

GET /auth/verify

POST /auth/signup
body:
username
email
password
image
bootcamp
graduationDate

POST /auth/login
body:
email
password

POST /auth/logout
body: (empty)

USERS ROUTES----

GET /user/
get all users
GET /user/:userId
get user profile
PUT /user/
Update User data
DELETE /user/
Delete user

POSTS ROUTES -----

GET /posts/
getAllPosts
GET /posts/:postId
getPostById
POST /posts/
createPost
PUT /posts/:postId
updatePost
DELETE /posts/:postId
deletePost

GET /posts/:postId/like
getNumberLikes
POST /posts/:postId/like
likePost
DELETE /posts/:postId/like
unlikePost

POST /posts/:postId/comment
createComment
PUT /posts/:postId/comment/:commentId
updateComment
DELETE /posts/:postId/comment/:commentId
deleteComment
GET/category/:category

FOLLOW ROUTES -----

POST /follow/users/:userId/follow'
followUser
DELETE /follow/users/:userId/follow'
unfollowUser
GET /follow/following
getFollowingUsers
GET /follow/followers
getFollowerUsers

Links

Trello/Kanban
https://trello.com/b/qNkUhulJ/projet-3-linkediron

Git
Backend URL
https://github.com/JohnDCGSantos/LinkedIronServer.git

Frontend URL
https://github.com/JohnDCGSantos/LinkedIronFront.git

Deployed URL
https://linkdiron.netlify.app/

Slides
https://docs.google.com/presentation/d/13SwM5dziE2i1G3xvx3nL_wKXIkY824mOc4ZDYK0NuQ0/edit?usp=sharing
