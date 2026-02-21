import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import { FaSearch, FaPaperPlane, FaImage, FaEllipsisV, FaStore, FaBox, FaTag, FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { chatlistget, sendmassage } from '../../Component/Api';
import Useauth from '../../Component/Useauth';
import io from 'socket.io-client';

const Messenger = () => {
  const { user } = Useauth();
  const location = useLocation();
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const [socket, setSocket] = useState(null);
  const [chatData, setChatData] = useState([]);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    if (!user?.email) return;
    const newSocket = io('https://deshimart-server.vercel.app');
    setSocket(newSocket);
    return () => newSocket.close();
  }, [user]);


  const { data: chatList, refetch } = useQuery({
    queryKey: ["getchatlist", user?.email],
    queryFn: () => chatlistget(user?.email),
    enabled: !!user?.email,
  });

  useEffect(() => { 
    if (chatList) setChatData(chatList); 
  }, [chatList]);


  useEffect(() => {
    if (!socket || !user?.email) return;
    
    socket.on('new-message', (data) => {
      setChatData(prev => prev.map(chat => 
        chat._id === data.chatId ? {
          ...chat,
          chat: [...(chat.chat || []), data.newMessage],
          lastMessage: data.newMessage.messageText,
          lastMessageTime: data.newMessage.time
        } : chat
      ));
    });

    return () => { socket.off('new-message'); };
  }, [socket, user?.email]);


  useEffect(() => {
    if (socket && chatData.length) {
      chatData.forEach(chat => socket.emit('join-chat', chat._id));
    }
  }, [socket, chatData]);


  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [activeChat, chatData]);


  useEffect(() => {
    if (location.state?.contactSeller && chatData.length) {
      const { productId, email } = location.state.contactSeller;
      const chat = chatData.find(c => c.productId === productId && c.sellerEmail === email);
      if (chat) {
        setActiveChat(chat._id);
        setShowChatList(false);
        socket?.emit('join-chat', chat._id);
      }
    }
  }, [location.state, chatData]);

  const sendMessage = async () => {
    if (!messageText.trim() || !activeConversation) return;
    const messageCopy = messageText;
    setMessageText('');
    try {
      await sendmassage({
        chatId: activeConversation._id,
        useremail: user?.email,
        messageText: messageCopy,
        time: new Date().toISOString()
      });
      refetch();
    } catch (error) { 
      console.log("Send error:", error);
      setMessageText(messageCopy);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const diff = Date.now() - date;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return format(date, 'h:mm a');
    return format(date, 'MMM d');
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setShowChatList(false);
    socket?.emit('join-chat', chatId);
  };

  const activeConversation = chatData.find(c => c._id === activeChat);
  const filteredConversations = chatData.filter(conv =>
    [conv.productName, conv.sellerName, conv.lastMessage].some(field => 
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  const MessageBubble = ({ message }) => {
    const isMe = message.sender === user?.email;
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className="max-w-[70%]">
          <div className={`px-3 py-2 rounded-2xl ${
            isMe ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}>
            <p className="text-sm">{message.messageText}</p>
          </div>
          <div className={`flex items-center text-[10px] mt-1 ${isMe ? 'justify-end' : 'justify-start'} text-gray-500`}>
            <span>{formatTime(message.time)}</span>
          </div>
        </div>
      </div>
    );
  };


  const ConversationItem = ({ conversation }) => {
    const lastMsg = conversation.chat?.[conversation.chat?.length - 1];
    const isLastFromMe = lastMsg?.sender === user?.email;
    const otherUser = conversation.sellerEmail === user?.email ? conversation.buyerName : conversation.sellerName;
    
    return (
      <div 
        onClick={() => handleChatSelect(conversation._id)} 
        className={`flex items-center p-3 cursor-pointer border-b border-gray-100 ${
          activeChat === conversation._id ? 'bg-blue-50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="relative flex-shrink-0">
          {conversation.productImage ? 
            <img src={conversation.productImage} alt={conversation.productName} className="w-12 h-12 rounded-full object-cover" /> :
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {otherUser?.charAt(0) || 'U'}
            </div>
          }
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm text-gray-700">{otherUser}</h4>
            <span className="text-xs text-gray-500 ml-2">{formatTime(conversation.lastMessageTime)}</span>
          </div>
          <div className="flex items-center mt-0.5">
            <p className="text-xs truncate max-w-[160px] text-gray-500">
              {isLastFromMe ? `You: ${conversation.lastMessage || ''}` : (conversation.lastMessage || 'No messages yet')}
            </p>
          </div>
          {conversation.productName && (
            <div className="flex items-center gap-1 mt-1">
              <FaTag className="text-[8px] text-gray-400" />
              <span className="text-[8px] text-gray-500 truncate max-w-[120px]">{conversation.productName}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container h-screen py-4">
        <div className="bg-white rounded-xl shadow-lg h-full overflow-hidden">
          <div className="flex h-full">
  
            <div className={`${showChatList ? 'flex' : 'hidden'} md:flex flex-col w-full lg:w-96 md:w-60 border-r border-gray-200`}>
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold mb-4">Messages</h1>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length ? 
                  filteredConversations.map(c => <ConversationItem key={c._id} conversation={c} />) : (
                  <div className="text-center py-12">
                    <FaStore className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No conversations yet</p>
                  </div>
                )}
              </div>
            </div>


            <div className={`${!showChatList ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-gray-50`}>
              {activeConversation ? (
                <>
   
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setShowChatList(true)} 
                        className="md:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <FaArrowLeft className="text-gray-600 text-sm" />
                      </button>
                      <div className="relative">
                        {activeConversation.productImage ? 
                          <img src={activeConversation.productImage} alt={activeConversation.productName} className="w-10 h-10 rounded-full object-cover" /> :
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {activeConversation.sellerName?.charAt(0) || 'S'}
                          </div>
                        }
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-800">{activeConversation.sellerName}</h2>
                        <p className="text-xs text-gray-500">{activeConversation.productName}</p>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaEllipsisV className="text-gray-600 text-sm" />
                    </button>
                  </div>

      
                  <div className="flex-1 overflow-y-auto p-4">
                    {!activeConversation.chat?.length && (
                      <div className="text-center mb-4 p-4 bg-blue-50 rounded-lg">
                        <FaBox className="text-2xl text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Start chatting about {activeConversation.productName}</p>
                      </div>
                    )}
                    {activeConversation.chat?.map((msg, i) => <MessageBubble key={i} message={msg} />)}
                    <div ref={messagesEndRef} />
                  </div>

            
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaImage className="text-gray-600 text-sm" />
                      </button>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          value={messageText} 
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                          placeholder="Type a message..." 
                          className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none" 
                        />
                      </div>
                      <button 
                        onClick={sendMessage} 
                        disabled={!messageText.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          messageText.trim() ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <FaPaperPlane className="text-sm" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
     
                <div className="flex-1 hidden md:flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaStore className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Messages</h3>
                    <p className="text-sm text-gray-500">Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;