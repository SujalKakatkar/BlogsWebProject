import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

import Signup from "./pages/Signup.jsx"
import Addpost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";

import Allposts from "./pages/AllPosts";
import MyPosts from './pages/MyPosts.jsx'
import Profile from './pages/Profile.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <Allposts />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <Addpost />
            </AuthLayout>
        ),
      },
      {
        path: "/my-post",
        element: (
          <AuthLayout authentication>
            <MyPosts/>
          </AuthLayout>
        )
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile/>
          </AuthLayout>
        )
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)
