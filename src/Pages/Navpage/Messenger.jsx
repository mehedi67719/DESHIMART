import React, { useState, useRef, useEffect } from 'react';
import { 
    FaSearch, 
    FaPaperPlane, 
    FaImage, 
    FaPaperclip, 
    FaSmile, 
    FaVideo, 
    FaPhone, 
    FaEllipsisV, 
    FaCheck, 
    FaCheckDouble, 
    FaUserCircle,
    FaCog,
    FaUsers,
    FaBell,
    FaClock,
    FaArchive,
    FaTrash,
    FaMicrophone,
    FaThumbsUp,
    FaStar,
    FaExclamationCircle,
    FaLock
} from 'react-icons/fa';
import { format } from 'date-fns';

const Messenger = () => {
    const [activeChat, setActiveChat] = useState(1);
    const [messageText, setMessageText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat]);

    const conversations = [
        {
            id: 1,
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            lastMessage: "Let's meet tomorrow at 3 PM",
            time: "10:30 AM",
            unread: 3,
            online: true,
            typing: false,
            pinned: true,
            muted: false
        },
        {
            id: 2,
            name: "Sarah Miller",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            lastMessage: "Thanks for your help!",
            time: "Yesterday",
            unread: 0,
            online: true,
            typing: true,
            pinned: false,
            muted: true
        },
        {
            id: 3,
            name: "Marketing Team",
            avatar: null,
            lastMessage: "New campaign launch discussion",
            time: "2 days ago",
            unread: 12,
            online: false,
            typing: false,
            pinned: true,
            muted: false,
            isGroup: true,
            members: 8
        },
        {
            id: 4,
            name: "David Wilson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            lastMessage: "Check this design file",
            time: "3 days ago",
            unread: 0,
            online: false,
            typing: false,
            pinned: false,
            muted: false
        },
        {
            id: 5,
            name: "Customer Support",
            avatar: null,
            lastMessage: "Your ticket #4567 has been resolved",
            time: "1 week ago",
            unread: 0,
            online: false,
            typing: false,
            pinned: false,
            muted: true,
            isGroup: true,
            members: 3
        },
        {
            id: 6,
            name: "Emily Chen",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            lastMessage: "🎉 Congratulations on the promotion!",
            time: "2 weeks ago",
            unread: 0,
            online: true,
            typing: false,
            pinned: false,
            muted: false
        }
    ];

    const messages = {
        1: [
            { id: 1, text: "Hey there! How are you?", sender: "them", time: "9:30 AM", read: true },
            { id: 2, text: "I'm doing great! Working on the new project", sender: "me", time: "9:32 AM", read: true },
            { id: 3, text: "That's awesome! Need any help?", sender: "them", time: "9:35 AM", read: true },
            { id: 4, text: "Actually, could you review the design mockups?", sender: "me", time: "9:40 AM", read: true },
            { id: 5, text: "Sure, send them over!", sender: "them", time: "9:45 AM", read: true },
            { id: 6, text: "Let's meet tomorrow at 3 PM to discuss", sender: "them", time: "10:30 AM", read: false },
            { id: 7, text: "Perfect! I'll send you the calendar invite", sender: "me", time: "10:31 AM", read: false },
        ],
        2: [
            { id: 1, text: "Thanks for your help with the presentation!", sender: "them", time: "Yesterday", read: true },
            { id: 2, text: "My pleasure! Happy to help 😊", sender: "me", time: "Yesterday", read: true },
            { id: 3, text: "The client loved it! We got the contract!", sender: "them", time: "Yesterday", read: true },
            { id: 4, text: "That's fantastic news! 🎉", sender: "me", time: "Yesterday", read: true },
            { id: 5, text: "Thanks for your help!", sender: "them", time: "10:00 AM", read: true },
        ],
        3: [
            { id: 1, text: "Team, we need to discuss the new campaign launch", sender: "them", time: "2 days ago", read: false },
            { id: 2, text: "I've prepared the initial strategy document", sender: "me", time: "2 days ago", read: true },
            { id: 3, text: "Great! Let's schedule a meeting for tomorrow", sender: "them", time: "2 days ago", read: false },
            { id: 4, text: "New campaign launch discussion", sender: "them", time: "2 days ago", read: false },
        ]
    };

    const activeConversation = conversations.find(c => c.id === activeChat);
    const activeMessages = messages[activeChat] || [];

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sendMessage = () => {
        if (messageText.trim()) {
            // In real app, you would send to backend
            console.log("Sending message:", messageText);
            setMessageText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const today = new Date();
    const formattedDate = format(today, "EEEE, MMMM d");

    const MessageBubble = ({ message }) => (
        <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-2xl px-4 py-3 ${message.sender === 'me' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${message.sender === 'me' ? 'justify-end text-gray-500' : 'text-gray-400'}`}>
                    <span>{message.time}</span>
                    {message.sender === 'me' && (
                        <span className="ml-1">
                            {message.read ? <FaCheckDouble className="text-blue-500" /> : <FaCheck />}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    const ConversationItem = ({ conversation }) => (
        <div 
            className={`flex items-center p-4 cursor-pointer transition-all duration-200 ${activeChat === conversation.id ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveChat(conversation.id)}
        >
            <div className="relative flex-shrink-0">
                {conversation.avatar ? (
                    <img src={conversation.avatar} alt={conversation.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {conversation.name.charAt(0)}
                    </div>
                )}
                {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
                {conversation.isGroup && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-white">{conversation.members}</span>
                    </div>
                )}
            </div>
            
            <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-gray-800 truncate">{conversation.name}</h4>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {conversation.typing ? (
                            <span className="text-sm text-blue-500 italic">Typing...</span>
                        ) : (
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {conversation.muted && (
                            <FaBell className="text-gray-400 text-sm" />
                        )}
                        {conversation.pinned && (
                            <FaStar className="text-yellow-500 text-sm" />
                        )}
                        {conversation.unread > 0 && (
                            <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unread}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar - Conversations List */}
                    <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Sidebar Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
                                <div className="flex items-center gap-3">
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                        <FaUsers className="text-gray-600" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                        <FaCog className="text-gray-600" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex space-x-4">
                                <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium flex items-center gap-2">
                                    <FaUsers /> All
                                </button>
                                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium flex items-center gap-2">
                                    <FaStar /> Pinned
                                </button>
                                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium flex items-center gap-2">
                                    <FaClock /> Recent
                                </button>
                            </div>
                        </div>

                        {/* Conversations List */}
                        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                            {filteredConversations.map(conversation => (
                                <ConversationItem key={conversation.id} conversation={conversation} />
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        {activeConversation.avatar ? (
                                            <img src={activeConversation.avatar} alt={activeConversation.name} className="w-12 h-12 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                                {activeConversation.name.charAt(0)}
                                            </div>
                                        )}
                                        {activeConversation.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{activeConversation.name}</h2>
                                        <div className="flex items-center gap-2">
                                            {activeConversation.typing ? (
                                                <span className="text-sm text-blue-500">Typing...</span>
                                            ) : (
                                                <span className="text-sm text-gray-500">{activeConversation.online ? 'Online' : 'Offline'}</span>
                                            )}
                                            {activeConversation.isGroup && (
                                                <span className="text-xs text-gray-500">• {activeConversation.members} members</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                        <FaPhone className="text-gray-600" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                        <FaVideo className="text-gray-600" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                        <FaEllipsisV className="text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-gray-50">
                            {/* Date Indicator */}
                            <div className="text-center mb-6">
                                <span className="inline-block px-4 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                    {formattedDate}
                                </span>
                            </div>

                            {/* Messages */}
                            <div className="space-y-4">
                                {activeMessages.map(message => (
                                    <MessageBubble key={message.id} message={message} />
                                ))}
                                {activeConversation.typing && (
                                    <div className="flex justify-start mb-4">
                                        <div className="max-w-[70%]">
                                            <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="p-6 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                    <FaImage className="text-gray-600" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                    <FaPaperclip className="text-gray-600" />
                                </button>
                                <button 
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                                    onClick={() => setShowEmoji(!showEmoji)}
                                >
                                    <FaSmile className="text-gray-600" />
                                </button>
                                
                                <div className="flex-1 relative">
                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        rows="1"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                        <FaMicrophone className="text-gray-600" />
                                    </button>
                                    <button 
                                        onClick={sendMessage}
                                        disabled={!messageText.trim()}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${messageText.trim() ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'bg-gray-200 cursor-not-allowed'}`}
                                    >
                                        <FaPaperPlane className={`${messageText.trim() ? 'text-white' : 'text-gray-400'}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Reactions */}
                            <div className="flex items-center gap-3 mt-4">
                                <span className="text-sm text-gray-500">Quick reactions:</span>
                                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                    <FaThumbsUp className="text-gray-600" />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                    <span className="text-lg">😊</span>
                                </button>
                                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                    <span className="text-lg">🎉</span>
                                </button>
                                <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                                    <span className="text-lg">👍</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Info Bar */}
             
            </div>
        </div>
    );
};

export default Messenger;