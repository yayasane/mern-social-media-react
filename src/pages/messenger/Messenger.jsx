import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import TopBar from '../../components/topbar/Topbar'
import { AuthContext } from '../../contexts/auth/AuthContext'
import './messenger.css'
import io from 'socket.io-client'

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  const { user } = useContext(AuthContext)
  const scrollRef = useRef()
  const socket = useRef()

  const API_URL = process.env.REACT_APP_API
  const socketUrl = process.env.REACT_APP_WEB_SOCKET_URL

  const fetchConversations = async (userId) => {
    try {
      const { data } = await axios.get(`${API_URL}/conversations/${userId}`)
      setConversations(data)
    } catch (error) {}
  }

  const fetchMessages = async (conversationId) => {
    try {
      const { data } = await axios.get(`${API_URL}/messages/${conversationId}`)
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
    const receiverId = currentChat.members.find(
      (memberId) => memberId !== user._id,
    )
    socket.current.emit('sendMessage', {
      userId: user._id,
      text: newMessage,
      receiverId,
    })

    try {
      const { data } = await axios.post(`${API_URL}/messages`, message)
      setMessages((m) => [...m, data])
      setNewMessage('')
    } catch (error) {}
  }

  useEffect(() => {
    //Mixed Active Content est désormais bloqué par défaut dans Firefox 23 !
    //What is Mixed Content? Lorsqu'un utilisateur visite une page servie via HTTP, sa connexion est ouverte aux attaques d'écoute clandestine et de l'homme du milieu (MITM).  Lorsqu'un utilisateur visite une page servie via HTTPS, sa connexion avec le serveur Web est authentifiée et cryptée avec SSL et donc protégée contre les indiscrets et les attaques MITM.
    socket.current = io(window.location.protocol + '//' + socketUrl)
    socket.current.on('connect', () => {
      socket.current.emit('addUser', user._id)
      console.log('conect')
    })
    socket.current.on('getMessage', (data) => {
      console.log('on get message')
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
    /* socket.current.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually    s
        socket.current.connect()
      } // else the socket will automatically try to reconnect
    }) */
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((m) => [...m, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f)),
      )
    })
  }, [user])

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
                <Conversation key={c._id} conversation={c} currentUser={user} />
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
                      <Message
                        message={m}
                        own={user._id === m.sender}
                        key={m._id}
                      />
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
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
