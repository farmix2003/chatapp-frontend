import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MessageCircle,
  Search,
  Plus,
  Bell,
  UserPlus,
  Hash,
  Lock,
  MoreVertical,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Input,
  Typography,
} from "@mui/material";
import AccountMenu from "./Profile";

// Mock data
const friends = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alice_j",
    status: "online",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bobsmith",
    status: "away",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Let's catch up later!",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    name: "Carol Davis",
    username: "carol_d",
    status: "offline",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Thanks for the help!",
    timestamp: "3 hours ago",
  },
  {
    id: 4,
    name: "David Wilson",
    username: "dwilson",
    status: "online",
    avatar: "/api/placeholder/40/40",
    lastMessage: "See you tomorrow",
    timestamp: "5 hours ago",
  },
];

const groups = [
  {
    id: 1,
    name: "Design Team",
    type: "private",
    members: 12,
    unread: 3,
    description: "UI/UX Design discussions",
    lastActivity: "5 min ago",
    isJoined: true,
  },
  {
    id: 2,
    name: "Book Club",
    type: "public",
    members: 28,
    unread: 0,
    description: "Monthly book discussions",
    lastActivity: "2 hours ago",
    isJoined: true,
  },
  {
    id: 3,
    name: "Tech News",
    type: "public",
    members: 156,
    unread: 12,
    description: "Latest technology news and trends",
    lastActivity: "10 min ago",
    isJoined: false,
  },
  {
    id: 4,
    name: "Coffee Lovers",
    type: "public",
    members: 89,
    unread: 0,
    description: "All things coffee related",
    lastActivity: "1 day ago",
    isJoined: false,
  },
  {
    id: 5,
    name: "Project Alpha",
    type: "private",
    members: 8,
    unread: 1,
    description: "Private project discussions",
    lastActivity: "30 min ago",
    isJoined: true,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <div className="online-indicator" />;
      case "away":
        return <div className="away-indicator" />;
      default:
        return <div className="offline-indicator" />;
    }
  };

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={"chatLogo"} alt="ChatApp" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-foreground">ChatApp</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button size={"medium"} className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute pl-1 -top-1 -right-0 w-4 h-4 p-0 bg-warning text-warning-foreground text-xs rounded-full">
                  3
                </Badge>
              </Button>

              <AccountMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Connect with friends and join interesting conversations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 animate-slide-up">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search friends and groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl w-full border-border focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 animate-slide-up">
            <Button
              variant={activeTab === "friends" ? "contained" : "outlined"}
              onClick={() => setActiveTab("friends")}
              className={
                activeTab === "friends"
                  ? "chat-button-primary"
                  : "chat-button-secondary"
              }
            >
              <Users className="w-4 h-4 mr-2" />
              Friends ({friends.length})
            </Button>
            <Button
              variant={activeTab === "groups" ? "contained" : "outlined"}
              onClick={() => setActiveTab("groups")}
              className={
                activeTab === "groups"
                  ? "chat-button-primary"
                  : "chat-button-secondary"
              }
            >
              <Hash className="w-4 h-4 mr-2" />
              Groups ({groups.length})
            </Button>
          </div>

          {/* Content */}
          <div className="animate-fade-in">
            {activeTab === "friends" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    Your Friends
                  </h3>
                  <Button className="chat-button-accent">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Friend
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFriends.map((friend) => (
                    <Link key={friend.id} to={`/chat/user/${friend.id}`}>
                      <Card className="chat-card hover:shadow-chat-hover cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="relative">
                              <Avatar className="w-12 h-12">
                                <Box
                                  component={"img"}
                                  src={friend.avatar}
                                  alt={friend.name}
                                />
                                <Typography>
                                  {friend.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </Typography>
                              </Avatar>
                              <div className="absolute -bottom-1 -right-1">
                                {getStatusIcon(friend.status)}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-foreground truncate">
                                  {friend.name}
                                </h4>
                                <span className="text-xs text-muted-foreground">
                                  {friend.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                @{friend.username}
                              </p>
                              <p className="text-sm text-muted-foreground truncate mt-1">
                                {friend.lastMessage}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "groups" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    Groups
                  </h3>
                  <Button className="chat-button-accent">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredGroups.map((group) => (
                    <Card
                      key={group.id}
                      className="chat-card hover:shadow-chat-hover"
                    >
                      <Box className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              {group.type === "private" ? (
                                <Lock className="w-5 h-5 text-primary" />
                              ) : (
                                <Hash className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <Typography className="text-base">
                                {group.name}
                              </Typography>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge
                                  variant={
                                    group.type === "private"
                                      ? "dot"
                                      : "standard"
                                  }
                                  className="text-xs"
                                >
                                  {group.type}
                                </Badge>
                                {group.unread > 0 && (
                                  <Badge className="bg-warning text-warning-foreground text-xs">
                                    {group.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>

                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          {group.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <span>{group.members} members</span>
                          <span>{group.lastActivity}</span>
                        </div>

                        {group.isJoined ? (
                          <Link to={`/chat/group/${group.id}`}>
                            <Button className="w-full chat-button-primary">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Open Chat
                            </Button>
                          </Link>
                        ) : (
                          <Button className="w-full chat-button-secondary">
                            {group.type === "private"
                              ? "Request to Join"
                              : "Join Group"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
