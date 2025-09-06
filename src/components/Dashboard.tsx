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
  SearchIcon,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogContent,
  Input,
  InputLabel,
  MenuItem,
  Select,
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
const allUsers = [
  ...friends,
  {
    id: 5,
    name: "Emma Thompson",
    username: "emma_t",
    status: "online",
    avatar: "/api/placeholder/40/40",
    isFriend: false,
  },
  {
    id: 6,
    name: "James Rodriguez",
    username: "james_r",
    status: "away",
    avatar: "/api/placeholder/40/40",
    isFriend: false,
  },
  {
    id: 7,
    name: "Sarah Kim",
    username: "sarah_kim",
    status: "online",
    avatar: "/api/placeholder/40/40",
    isFriend: false,
  },
  {
    id: 8,
    name: "Michael Brown",
    username: "mike_b",
    status: "offline",
    avatar: "/api/placeholder/40/40",
    isFriend: false,
  },
  {
    id: 9,
    name: "Lisa Anderson",
    username: "lisa_a",
    status: "online",
    avatar: "/api/placeholder/40/40",
    isFriend: false,
  },
  {
    id: 10,
    name: "Chris Lee",
    username: "chris_lee",
    status: "away",
    avatar: "/api/placeholder/40/40",
    isFriend: false,
  },
].map((user) => ({
  ...user,
  isFriend: friends.some((friend) => friend.id === user.id),
}));

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("public");
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
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
  const filteredUsers = allUsers.filter(
    (user) =>
      (user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(userSearchQuery.toLowerCase())) &&
      !user.isFriend
  );

  const handleConnectUser = (userId: number) => {
    setAddFriendOpen(false);
    setUserSearchQuery("");
  };
  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      return;
    }
    setCreateGroupOpen(false);
    setGroupName("");
    setGroupType("public");
    setSelectedFriends([]);
  };
  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

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
                  <Button
                    className="chat-button-accent"
                    onClick={() => setAddFriendOpen(true)}
                  >
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
                  <Button
                    className="chat-button-accent inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                    onClick={() => setCreateGroupOpen(true)}
                  >
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
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={
                                    group.type === "private"
                                      ? "dot"
                                      : "standard"
                                  }
                                  className="text-xs bg-purple-700 text-white rounded-full pb-1 px-1"
                                >
                                  {group.type}
                                </Badge>
                                {group.unread > 0 && (
                                  <Badge className="bg-warning text-warning-foreground rounded-full px-1 text-xs">
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
      <Dialog
        className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: 500 } }}
        open={addFriendOpen}
        onClose={() => setAddFriendOpen(false)}
      >
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <Box>
            <Typography className="flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-primary" />
              Add New Friends
            </Typography>
          </Box>

          <div className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="pl-10 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <Box
                            component={"img"}
                            src={user.avatar}
                            alt={user.name}
                          />
                          <Typography>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Typography>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">
                          {getStatusIcon(user.status)}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="small"
                      className="chat-button-primary"
                      onClick={() => handleConnectUser(user.id)}
                    >
                      Connect
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    {userSearchQuery
                      ? "No users found"
                      : "No more users to connect with"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Group Modal */}
      <Dialog
        className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: 500 } }}
        open={createGroupOpen}
        onClose={() => setCreateGroupOpen(false)}
      >
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <Box>
            <Typography className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-primary" />
              Create New Group
            </Typography>
          </Box>

          <div className="space-y-4">
            <div className="space-y-2">
              <InputLabel htmlFor="groupName">Group Name</InputLabel>
              <Input
                id="groupName"
                placeholder="Enter group name..."
                value={groupName}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="groupType">Group Type</InputLabel>
              <Select
                value={groupType}
                onChange={() => setGroupType(groupType)}
                className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              >
                <MenuItem value="public">
                  <div className="flex items-center">
                    <Hash className="w-4 h-4 mr-2" />
                    Public - Anyone can join
                  </div>
                </MenuItem>
                <MenuItem value="private">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Private - Invite only
                  </div>
                </MenuItem>
              </Select>
            </div>

            {friends.length > 0 ? (
              <div className="space-y-2">
                <InputLabel>Add Friends</InputLabel>
                <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-2">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-accent/20"
                    >
                      <Checkbox
                        checked={selectedFriends.includes(friend.id)}
                        onChange={() => toggleFriendSelection(friend.id)}
                      />
                      <Avatar className="w-8 h-8">
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
                      <div className="flex-1">
                        <p className="text-sm font-medium">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">
                          @{friend.username}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 border rounded-lg">
                <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  No friends yet
                </p>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setCreateGroupOpen(false);
                    setAddFriendOpen(true);
                  }}
                >
                  Add Friends First
                </Button>
              </div>
            )}

            <div className="flex space-x-2 pt-4">
              <Button
                variant="outlined"
                className="flex-1"
                onClick={() => setCreateGroupOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 chat-button-primary"
                onClick={handleCreateGroup}
              >
                Create Group
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
