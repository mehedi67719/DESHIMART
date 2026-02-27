import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X,
  Heart,
  UserPlus,
  MessageCircle,
  ShoppingBag,
  Star,
  Clock,
  Filter,
  CheckCheck,
  MoreVertical
} from 'lucide-react';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Order Confirmed',
      message: 'Your order #12345 has been confirmed and will be delivered soon.',
      time: '5 minutes ago',
      read: false,
      icon: ShoppingBag,
      color: 'bg-green-500',
      userImage: null
    },
    {
      id: 2,
      type: 'like',
      title: 'New Like',
      message: 'Sarah liked your post "Beautiful Sunset"',
      time: '1 hour ago',
      read: false,
      icon: Heart,
      color: 'bg-red-500',
      userImage: 'https://via.placeholder.com/40'
    },
    {
      id: 3,
      type: 'follow',
      title: 'New Follower',
      message: 'John Doe started following you',
      time: '3 hours ago',
      read: true,
      icon: UserPlus,
      color: 'bg-blue-500',
      userImage: 'https://via.placeholder.com/40'
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from Mike about the project',
      time: '5 hours ago',
      read: true,
      icon: MessageCircle,
      color: 'bg-purple-500',
      userImage: 'https://via.placeholder.com/40'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Payment Due',
      message: 'Your subscription payment is due in 3 days',
      time: '1 day ago',
      read: true,
      icon: AlertCircle,
      color: 'bg-yellow-500',
      userImage: null
    },
    {
      id: 6,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new dark mode feature in settings',
      time: '2 days ago',
      read: true,
      icon: Info,
      color: 'bg-indigo-500',
      userImage: null
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getFilteredNotifications = () => {
    switch(filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'read':
        return notifications.filter(n => n.read);
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark all as read</span>
                </button>
              )}
              
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
                
                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    {['all', 'unread', 'read'].map((filterOption) => (
                      <button
                        key={filterOption}
                        onClick={() => {
                          setFilter(filterOption);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-50 transition-colors ${
                          filter === filterOption ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                        }`}
                      >
                        {filterOption} {filterOption === 'unread' && unreadCount > 0 && `(${unreadCount})`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications List */}
        <div className="space-y-3">
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification) => {
              const Icon = notification.icon;
              
              return (
                <div
                  key={notification.id}
                  className={`group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border ${
                    notification.read ? 'border-gray-100' : 'border-l-4 border-l-blue-500 border-gray-200'
                  }`}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      {/* Icon/Avatar */}
                      <div className="flex-shrink-0">
                        {notification.userImage ? (
                          <img
                            src={notification.userImage}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-lg ${notification.color} bg-opacity-10 flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${notification.color.replace('bg-', 'text-')}`} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {notification.message}
                            </p>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                title="Mark as read"
                              >
                                <CheckCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="Delete"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="mt-2 flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-sm text-gray-500">
                {filter === 'unread' 
                  ? "You don't have any unread notifications" 
                  : filter === 'read'
                  ? "You don't have any read notifications"
                  : "You're all caught up!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;