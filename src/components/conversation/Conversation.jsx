import './conversation.css'

const Conversation = () => {
  return (
    <div className="conversation">
      <img
        src={process.env.REACT_APP_PUBLIC_FOLDER + 'person/3.jpeg'}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">John Doe</span>
    </div>
  )
}

export default Conversation
