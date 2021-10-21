import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth/AuthContext'
import './feed.css'
import Post from './post/Post'
import Share from './share/Share'
const Feed = ({ username }) => {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  const API_URL = process.env.REACT_APP_API

  const fetchTimelinePosts = async (userId) => {
    // console.log(process.env.REACT_APP_API)
    const { data } = await axios.get(`${API_URL}/posts/timeline/${user._id}`)
    setPosts(data)
  }
  const fetchUserPosts = async (username) => {
    console.log(username)
    const { data } = await axios.get(`${API_URL}/posts/profile/${username}`)
    setPosts(data)
  }

  useEffect(() => {
    if (username) {
      fetchUserPosts(username)
    } else {
      fetchTimelinePosts(user._id)
    }
  }, [username, user._id, API_URL])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed
