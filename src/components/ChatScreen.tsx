import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Send,
  Smile,
  Paperclip,
  Phone,
  Video,
  Info,
  ArrowLeft,
  MoreVertical,
  Heart,
  ThumbsUp,
  Laugh,
} from "lucide-react";
import {
  Avatar,
  Box,
  Button,
  Input,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

// Mock data
const chatData = {
  user: {
    id: 1,
    name: "Alice Johnson",
    username: "alice_j",
    status: "online",
    avatar: "/api/placeholder/40/40",
  },
  group: {
    id: 1,
    name: "Design Team",
    members: 12,
    description: "UI/UX Design discussions",
    avatar: "/api/placeholder/40/40",
  },
};

const messages = [
  {
    id: 1,
    senderId: 2,
    senderName: "Bob Smith",
    senderAvatar: "/api/placeholder/32/32",
    content: "Hey everyone! How's the new design coming along?",
    timestamp: "10:30 AM",
    reactions: [{ emoji: "👍", count: 2, userReacted: false }],
    isOwn: false,
  },
  {
    id: 2,
    senderId: 1,
    senderName: "You",
    content: "It's looking great! I just finished the user dashboard mockup.",
    timestamp: "10:32 AM",
    reactions: [{ emoji: "❤️", count: 1, userReacted: true }],
    isOwn: true,
  },
  {
    id: 3,
    senderId: 3,
    senderName: "Carol Davis",
    senderAvatar: "/api/placeholder/32/32",
    content: "Can you share it with us? I'd love to see the progress.",
    timestamp: "10:33 AM",
    reactions: [],
    isOwn: false,
  },
  {
    id: 4,
    senderId: 1,
    senderName: "You",
    content:
      "Sure! I'll upload it to our shared folder in a moment. The color scheme turned out really nice with the pastel theme.",
    timestamp: "10:35 AM",
    reactions: [{ emoji: "🎨", count: 3, userReacted: false }],
    isOwn: true,
  },
  {
    id: 5,
    senderId: 4,
    senderName: "David Wilson",
    senderAvatar: "/api/placeholder/32/32",
    content:
      "Awesome! The pastel colors will definitely make the interface more welcoming.",
    timestamp: "10:37 AM",
    reactions: [],
    isOwn: false,
  },
];

const ChatScreen = () => {
  const { type, id } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isGroup = type === "group";
  const chatInfo = isGroup ? chatData.group : chatData.user;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: chatMessages.length + 1,
      senderId: 1,
      senderName: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reactions: [],
      isOwn: true,
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage("");
  };

  const handleReaction = (messageId: number, emoji: string) => {
    setChatMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
          if (existingReaction) {
            if (existingReaction.userReacted) {
              // Remove reaction
              return {
                ...msg,
                reactions: msg.reactions
                  .map((r) =>
                    r.emoji === emoji
                      ? { ...r, count: r.count - 1, userReacted: false }
                      : r
                  )
                  .filter((r) => r.count > 0),
              };
            } else {
              // Add reaction
              return {
                ...msg,
                reactions: msg.reactions.map((r) =>
                  r.emoji === emoji
                    ? { ...r, count: r.count + 1, userReacted: true }
                    : r
                ),
              };
            }
          } else {
            // New reaction
            return {
              ...msg,
              reactions: [
                ...msg.reactions,
                { emoji, count: 1, userReacted: true },
              ],
            };
          }
        }
        return msg;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link to="/dashboard">
              <Button variant={"text"} size="small" className="md:hidden">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>

            <div className="relative">
              <Avatar className="w-10 h-10">
                <Box
                  component={"img"}
                  src={chatInfo.avatar}
                  alt={chatInfo.name}
                />
                <Typography>
                  {chatInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Typography>
              </Avatar>
              {!isGroup && (
                <div className="absolute -bottom-1 -right-1">
                  <div className="online-indicator" />
                </div>
              )}
            </div>

            <div>
              <h1 className="font-semibold text-foreground">{chatInfo.name}</h1>
              {isGroup ? (
                <p className="text-sm text-muted-foreground">
                  {"members" in chatInfo
                    ? `${chatInfo.members} members`
                    : "Group"}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {"username" in chatInfo ? `@${chatInfo.username}` : "User"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isGroup && (
              <>
                <Button variant="text" size="medium">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="text" size="medium">
                  <Video className="w-5 h-5" />
                </Button>
              </>
            )}

            <Button variant="text" size="medium">
              <Info className="w-5 h-5" />
            </Button>
            <Button
              variant="text"
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>View Profile</MenuItem>
              <MenuItem onClick={handleClose}>Search Messages</MenuItem>
              <MenuItem onClick={handleClose}>Mute Notifications</MenuItem>
              {isGroup && (
                <MenuItem onClick={handleClose}>Leave Group</MenuItem>
              )}
            </Menu>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isOwn ? "justify-end" : ""
              } animate-slide-up`}
            >
              {!message.isOwn && (
                <Avatar className="w-8 h-8 mt-1">
                  <Box
                    component={"img"}
                    src={message.senderAvatar}
                    alt={message.senderName}
                  />
                  <Typography className="text-xs">
                    {message.senderName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Typography>
                </Avatar>
              )}

              <div
                className={`flex-1 max-w-sm ${message.isOwn ? "ml-auto" : ""}`}
              >
                {!message.isOwn && isGroup && (
                  <p className="text-xs text-muted-foreground mb-1 ml-2">
                    {message.senderName}
                  </p>
                )}

                <div
                  className={
                    message.isOwn
                      ? "message-bubble-own"
                      : "message-bubble-other"
                  }
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                <div className="flex items-center justify-between mt-1 px-2">
                  <span className="text-xs text-message-timestamp">
                    {message.timestamp}
                  </span>

                  {message.reactions.length > 0 && (
                    <div className="flex items-center space-x-1">
                      {message.reactions.map((reaction, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            handleReaction(message.id, reaction.emoji)
                          }
                          className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                            reaction.userReacted
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-muted border-border hover:bg-muted/80"
                          }`}
                        >
                          {reaction.emoji} {reaction.count}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick reactions */}
                <div className="flex items-center space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleReaction(message.id, "❤️")}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <Heart className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleReaction(message.id, "👍")}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleReaction(message.id, "😂")}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <Laugh className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-card/80 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSendMessage}
            className="flex items-end space-x-10"
          >
            <div className="flex-1">
              <div className="relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${
                    isGroup ? chatInfo.name : chatInfo.name
                  }...`}
                  className="pr-20 rounded-2xl w-full space-x-1 border-border focus:ring-primary focus:border-primary resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />

                <div className="absolute right-1 gap-0 top-1/2 transform  -translate-y-1/2 flex items-center">
                  <Button
                    type="button"
                    variant="text"
                    size="small"
                    className="w-8 h-8 pl-[10px] space-x-1"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    size="small"
                    className="w-8 h-8"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!newMessage.trim()}
              className="chat-button-primary rounded-xl"
              size="medium"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
