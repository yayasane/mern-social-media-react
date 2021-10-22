import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import TopBar from '../../components/topbar/Topbar'
import { AuthContext } from '../../contexts/auth/AuthContext'
import './messenger.css'

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const { user } = useContext(AuthContext)
  const scrollRef = useRef()
  const API_URL = process.env.REACT_APP_API

  const fetchConversations = async (userId) => {
    try {
      const { data } = await axios.get(`${API_URL}/conversations/${userId}`)
      setConversations(data)
    } catch (error) {}
  }

  const fetchMessages = async (conversationId) => {
    try {
      const { data } = await axios.get(`${API_URL}/messages/${conversationId}`)
      console.log(data)
      setMessages(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    try {
      const { data } = await axios.post(`${API_URL}/messages`, message)
      setMessages((m) => [...m, data])
      setNewMessage('')
    } catch (error) {}
  }

  useEffect(() => {
    fetchMessages(currentChat?._id)
  }, [currentChat])

  useEffect(() => {
    fetchConversations(user._id)
  }, [user._id, API_URL])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholde="Search for friends"
              className="chatMenuInput"
            />

            {conversations.map((c) => (
              <div key={c._id} onClick={(e) => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message message={m} own={user._id === m.sender} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="write something..."
                    className="chatMessageInput"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.currentTarget.value)}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
