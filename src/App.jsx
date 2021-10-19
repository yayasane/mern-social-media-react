import Feed from './components/feed/Feed'
import Rightbar from './components/rightbar/Rightbar'
import Sidebar from './components/sidebar/Sidebar'
import TopBar from './components/topbar/Topbar'
import Home from './pages/home/Home'

function App() {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}

export default App
