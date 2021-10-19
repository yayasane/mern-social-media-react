import { MoreVert } from '@mui/icons-material'
import './post.css'
import { Users } from '../../../dummyData'
import { useState } from 'react'
const Post = ({ post }) => {
  const user = Users.filter((u) => u.id === post.userId)
  const [like, setLike] = useState(post.like)
  const [isLiked, setIsLiked] = useState(false)

  const likeHandler = () => {
    setLike((l) => (isLiked ? l - 1 : l + 1))
    setIsLiked((l) => !l)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user[0].profilePicture}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{user[0].username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter"></div>
        <span className="postText">{post.desc}</span>
        <img className="postImg" src={post.photo} alt="" />
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
