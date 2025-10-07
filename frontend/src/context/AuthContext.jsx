import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up axios defaults
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
      localStorage.setItem("token", state.token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [state.token]);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const response = await axios.get("/api/auth/profile");
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: response.data.data.user,
              token: state.token,
            },
          });
        } catch (error) {
          console.error("Failed to load user:", error);
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const { user, token } = response.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      });

      toast.success(`Welcome back, ${user.name}!`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      dispatch({ type: "SET_LOADING", payload: false });
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await axios.post("/api/auth/register", userData);

      const { user, token } = response.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      });

      toast.success(`Welcome to Flying Chicken, ${user.name}!`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      dispatch({ type: "SET_LOADING", payload: false });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put("/api/auth/profile", profileData);
      dispatch({
        type: "UPDATE_USER",
        payload: response.data.data.user,
      });
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Profile update failed";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put("/api/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Password change failed";
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

