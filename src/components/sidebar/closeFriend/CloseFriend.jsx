import './closeFriend.css'
const CloseFriend = ({ user }) => {
  return (
    <li className="sidebarFriend">
      <img
        src={user.profilePicture}
        className="sidebarFriendImg"
        alt="profil"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

export default CloseFriend
