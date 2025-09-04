import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  MessageCircle,
  Mail,
  Lock,
  SeparatorHorizontal,
} from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Input,
  Typography,
} from "@mui/material";
import { GitHub, Google } from "@mui/icons-material";

// Mock user data for testing
const MOCK_USERS = [
  { email: "demo@chatapp.com", password: "demo123", username: "demo_user" },
  { email: "alice@example.com", password: "alice123", username: "alice_j" },
  { email: "bob@example.com", password: "bob123", username: "bobsmith" },
];

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "demo@chatapp.com", // Pre-fill for easy testing
    password: "demo123",
    confirmPassword: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isLogin) {
      // Login logic
      const user = MOCK_USERS.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        navigate("/dashboard");
      } else {
        console.error("Invalid credentials");
      }
    } else {
      // Registration logic
      if (formData.password !== formData.confirmPassword) {
        console.error("Passwords do not match");
      } else if (formData.username.length < 3) {
        console.error("Username must be at least 3 characters");
      } else {
        // In a real app, you'd create the account first
        navigate("/dashboard");
      }
    }

    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 hero-section relative overflow-hidden"
      style={{
        backgroundImage: `url()`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        <Card className="chat-card border-0 shadow-chat">
          <Box className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              {/* <img src={"/"} alt="ChatApp" className="w-12 h-12" /> */}
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">ChatApp</h1>
              </div>
            </div>

            <div>
              <Typography className="text-2xl">
                {isLogin ? "Welcome back!" : "Join the conversation"}
              </Typography>
              <Typography className="text-muted-foreground mt-2">
                {isLogin
                  ? "Sign in to continue chatting with friends"
                  : "Create your account to get started"}
              </Typography>
            </div>
          </Box>

          <CardContent className="space-y-6">
            {/* Demo credentials info */}
            <div className="p-3 bg-accent/20 border border-accent/30 rounded-xl">
              <p className="text-sm text-accent-foreground">
                <strong>Demo Login:</strong>
                <br />
                Email: demo@chatapp.com
                <br />
                Password: demo123
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-fuchsia-700"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="rounded-xl border-b focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 rounded-xl border-border focus:ring-primary w-full focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 rounded-xl w-full border-b focus:ring-primary focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 rounded-xl border-border focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full chat-button-primary text-white"
              >
                {isLoading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="relative">
                <SeparatorHorizontal />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outlined" className="chat-button-secondary">
                  <GitHub className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outlined" className="chat-button-secondary">
                  <Google className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            {isLogin && (
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-glow transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
