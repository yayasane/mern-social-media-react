import { Chat, Notifications, Person, Search } from '@mui/icons-material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth/AuthContext'
import './topbar.css'
const TopBar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useContext(AuthContext)
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Scinsocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Recherche des amis, publications ou vidéo"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger">
              <Chat />
            </Link>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            className="topbarImg"
            alt="phto"
          />
        </Link>
      </div>
    </div>
  )
}

export default TopBar
