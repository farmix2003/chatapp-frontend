import axios from "./axios";

const loginUser = async (email: string, password: string) => {
  console.log("Logging in user:", email, password);
  const response = await axios.post(
    "/api/auth/login",
    {
      email: email.trim(),
      password: password.trim(),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  window.localStorage.setItem("token", response.data.token);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get("/api/users", {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}` || "",
    },
  });
  return response.data;
};

export { loginUser, getAllUsers };
