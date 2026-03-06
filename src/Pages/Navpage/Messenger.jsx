import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import { FaSearch, FaPaperPlane, FaImage, FaEllipsisV, FaStore, FaBox, FaTag, FaArrowLeft, FaCheck, FaCheckDouble } from 'react-icons/fa';
import { format } from 'date-fns';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { chatlistget, sendmassage, markAsRead } from '../../Component/Api';
import Useauth from '../../Component/Useauth';
import io from 'socket.io-client';

const Messenger = () => {
  const { user } = Useauth();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  const [socket, setSocket] = useState(null);
  const [chatData, setChatData] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, [user]);

  const { data: chatList, refetch, isLoading } = useQuery({
    queryKey: ["getchatlist", user?.email],
    queryFn: () => chatlistget(user?.email),
    enabled: !!user?.email,
  });

  useEffect(() => { 
    if (chatList) {
      setChatData(chatList);
      const counts = {};
      chatList.forEach(chat => {
        if (chat.chat && Array.isArray(chat.chat)) {
          const unreadCount = chat.chat.filter(msg => 
            msg.sender !== user?.email && msg.read === false
          ).length;
          counts[chat._id] = unreadCount;
        }
      });
      setUnreadCounts(counts);
    }
  }, [chatList, user?.email]);

  const markChatAsRead = async (chatId) => {
    if (!user?.email || !chatId || isMarkingRead) return;
    
    const chat = chatData.find(c => c._id === chatId);
    const hasUnread = chat?.chat?.some(msg => 
      msg.sender !== user.email && !msg.read
    );
    
    if (!hasUnread) return;
    
    setIsMarkingRead(true);
    try {
      await markAsRead(chatId, user.email);
      setChatData(prev => prev.map(chat => 
        chat._id === chatId ? {
          ...chat,
          chat: chat.chat?.map(msg => 
            msg.sender !== user.email ? { ...msg, read: true } : msg
          )
        } : chat
      ));
      setUnreadCounts(prev => ({ ...prev, [chatId]: 0 }));
    } catch (error) {
      console.error("Error marking messages as read:", error);
    } finally {
      setIsMarkingRead(false);
    }
  };

  useEffect(() => {
    if (!socket || !user?.email) return;
    
    socket.on('new-message', (data) => {
      setChatData(prev => {
        const updatedChats = prev.map(chat => 
          chat._id === data.chatId ? {
            ...chat,
            chat: [...(chat.chat || []), data.newMessage],
            lastMessage: data.newMessage.messageText,
            lastMessageTime: data.newMessage.time
          } : chat
        );
        
        if (data.newMessage.sender !== user.email && activeChat !== data.chatId) {
          setUnreadCounts(prev => ({
            ...prev,
            [data.chatId]: (prev[data.chatId] || 0) + 1
          }));
        }
        
        if (activeChat === data.chatId && data.newMessage.sender !== user.email) {
          setShouldScrollToBottom(true);
          setTimeout(() => markChatAsRead(data.chatId), 500);
        }
        
        return updatedChats;
      });
    });

    socket.on('messages-read', (data) => {
      const { chatId, userEmail } = data;
      if (userEmail !== user?.email) {
        setChatData(prev => prev.map(chat => 
          chat._id === chatId ? {
            ...chat,
            chat: chat.chat?.map(msg => 
              msg.sender === userEmail ? { ...msg, read: true } : msg
            )
          } : chat
        ));
        setUnreadCounts(prev => ({ ...prev, [chatId]: 0 }));
      }
    });

    return () => { 
      socket.off('new-message');
      socket.off('messages-read');
    };
  }, [socket, user?.email, activeChat]);

  useEffect(() => {
    if (socket && chatData.length) {
      chatData.forEach(chat => {
        socket.emit('join-chat', chat._id);
      });
    }
  }, [socket, chatData]);

  useEffect(() => { 
    if (shouldScrollToBottom && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      setShouldScrollToBottom(false);
    }
  }, [chatData, shouldScrollToBottom]);

  useEffect(() => {
    if (location.state?.contactSeller && chatData.length) {
      const { productId, email } = location.state.contactSeller;
      const chat = chatData.find(c => c.productId === productId && 
        (c.sellerEmail === email || c.buyerEmail === email));
      if (chat) {
        handleChatSelect(chat._id);
      }
    }
  }, [location.state, chatData]);

  useEffect(() => {
    let timeoutId;
    if (activeChat && user?.email && !isMarkingRead) {
      const chat = chatData.find(c => c._id === activeChat);
      const hasUnread = chat?.chat?.some(msg => 
        msg.sender !== user.email && !msg.read
      );
      if (hasUnread) {
        timeoutId = setTimeout(() => {
          markChatAsRead(activeChat);
        }, 1000);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeChat, user?.email, chatData]);

  const sendMessage = async () => {
    if (!messageText.trim() || !activeConversation) return;
    const messageCopy = messageText;
    setMessageText('');
    setShouldScrollToBottom(true);
    try {
      await sendmassage({
        chatId: activeConversation._id,
        useremail: user?.email,
        messageText: messageCopy,
        time: new Date().toISOString()
      });
    } catch (error) { 
      console.log("Send error:", error);
      setMessageText(messageCopy);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return format(date, 'h:mm a');
    if (diff < 604800000) return format(date, 'EEE');
    return format(date, 'MMM d');
  };

  const handleChatSelect = (chatId) => {
    if (activeChat !== chatId) {
      setActiveChat(chatId);
      setShowChatList(false);
      socket?.emit('join-chat', chatId);
      setShouldScrollToBottom(true);
      markChatAsRead(chatId);
    }
  };

  const activeConversation = chatData.find(c => c._id === activeChat);
  
  const filteredConversations = chatData.filter(conv =>
    [conv.productName, conv.sellerName, conv.buyerName, conv.lastMessage].some(field => 
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const MessageBubble = ({ message }) => {
    const isMe = message.sender === user?.email;
    const isRead = message.read || false;
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className="max-w-[70%]">
          <div className={`px-3 py-2 rounded-2xl ${
            isMe ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}>
            <p className="text-sm break-words">{message.messageText}</p>
          </div>
          <div className={`flex items-center gap-1 text-[10px] mt-1 ${isMe ? 'justify-end' : 'justify-start'} text-gray-500`}>
            <span>{formatTime(message.time)}</span>
            {isMe && (
              <span>
                {isRead ? <FaCheckDouble className="text-blue-500 text-xs" /> : <FaCheck className="text-gray-400 text-xs" />}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ConversationItem = ({ conversation }) => {
    const lastMsg = conversation.chat?.[conversation.chat?.length - 1];
    const isLastFromMe = lastMsg?.sender === user?.email;
    const otherUser = conversation.sellerEmail === user?.email ? conversation.buyerName : conversation.sellerName;
    const unreadCount = unreadCounts[conversation._id] || 0;
    const isActive = activeChat === conversation._id;
    
    return (
      <div 
        onClick={() => handleChatSelect(conversation._id)} 
        className={`flex items-center p-3 cursor-pointer border-b border-gray-100 relative transition-colors ${
          isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="relative flex-shrink-0">
          {conversation.productImage ? 
            <img src={conversation.productImage} alt={conversation.productName} className="w-12 h-12 rounded-full object-cover" /> :
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {otherUser?.charAt(0) || 'U'}
            </div>
          }
          {unreadCount > 0 && !isActive && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h4 className={`font-semibold text-sm ${unreadCount > 0 ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
              {otherUser}
            </h4>
            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
              {formatTime(conversation.lastMessageTime)}
            </span>
          </div>
          <div className="flex items-center mt-0.5">
            <p className={`text-xs truncate max-w-[160px] ${unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              {isLastFromMe ? (
                <span className="flex items-center gap-1">
                  {lastMsg?.read ? <FaCheckDouble className="text-blue-500 text-xs flex-shrink-0" /> : <FaCheck className="text-gray-400 text-xs flex-shrink-0" />}
                  <span className="truncate">You: {conversation.lastMessage || ''}</span>
                </span>
              ) : (
                <span className="truncate">{conversation.lastMessage || 'No messages yet'}</span>
              )}
            </p>
          </div>
          {conversation.productName && (
            <div className="flex items-center gap-1 mt-1">
              <FaTag className="text-[8px] text-gray-400 flex-shrink-0" />
              <span className="text-[8px] text-gray-500 truncate max-w-[120px]">{conversation.productName}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            <div className={`${showChatList ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-80 lg:w-96 border-r border-gray-200 h-full`}>
              <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
                <h1 className="text-xl font-bold mb-4">Messages</h1>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input 
                    type="text" 
                    placeholder="Search conversations..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(c => <ConversationItem key={c._id} conversation={c} />)
                ) : (
                  <div className="text-center py-12 px-4">
                    <FaStore className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No conversations found</p>
                  </div>
                )}
              </div>
            </div>

            <div className={`${!showChatList ? 'flex' : 'hidden'} md:flex flex-1 flex-col h-full bg-gray-50`}>
              {activeConversation ? (
                <>
                  <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setShowChatList(true)} 
                        className="md:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <FaArrowLeft className="text-gray-600 text-sm" />
                      </button>
                      <div className="relative">
                        {activeConversation.productImage ? (
                          <img 
                            src={activeConversation.productImage} 
                            alt={activeConversation.productName} 
                            className="w-10 h-10 rounded-full object-cover" 
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {(activeConversation.sellerEmail === user?.email 
                              ? activeConversation.buyerName 
                              : activeConversation.sellerName
                            )?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {activeConversation.sellerEmail === user?.email 
                            ? activeConversation.buyerName 
                            : activeConversation.sellerName}
                        </h2>
                        <p className="text-xs text-gray-500">{activeConversation.productName}</p>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <FaEllipsisV className="text-gray-600 text-sm" />
                    </button>
                  </div>

                  <div 
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-4"
                  >
                    {!activeConversation.chat?.length ? (
                      <div className="text-center mb-4 p-4 bg-blue-50 rounded-lg">
                        <FaBox className="text-2xl text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Start chatting about {activeConversation.productName}
                        </p>
                      </div>
                    ) : (
                      <>
                        {activeConversation.chat.map((msg, i) => (
                          <MessageBubble key={i} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <FaImage className="text-gray-600 text-sm" />
                      </button>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          value={messageText} 
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                          placeholder="Type a message..." 
                          className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                      <button 
                        onClick={sendMessage} 
                        disabled={!messageText.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          messageText.trim() 
                            ? 'bg-blue-500 text-white hover:bg-blue-600' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <FaPaperPlane className="text-sm" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 hidden md:flex items-center justify-center">
                  <div className="text-center px-4">
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