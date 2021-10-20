import axios from 'axios'
import { useEffect, useState } from 'react'
import './feed.css'
import Post from './post/Post'
import Share from './share/Share'
const Feed = ({ username }) => {
  const [posts, setPosts] = useState([])
  const fetchTimelinePosts = async (userId) => {
    // console.log(process.env.REACT_APP_API)
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/posts/timeline/616da60e2e0a2413fe8278e9`,
    )
    setPosts(data)
  }
  const fetchUserPosts = async (username) => {
    console.log(username)
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/posts/profile/${username}`,
    )
    setPosts(data)
  }

  useEffect(() => {
    if (username) {
      fetchUserPosts(username)
    } else {
      fetchTimelinePosts('userId')
    }
  }, [])

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
