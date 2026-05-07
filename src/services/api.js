import Authentcation from "../pages/Authentcation";

const API_BASE_URL = "http://localhost:5054/api";

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };
    console.log("Sending rewuest to: ", url);
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log(errorData);
      const errorMsg =
        errorData.message ||
        errorData.errors?.[0]?.errorMessage ||
        "Request failed!";

      throw new Error(
        Object.entries(errorData.errors || {})
          .map(([k, v]) => `${k}: ${v.join(", ")}`)
          .join("\n"),
      );
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  // login from backend dtos
  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        UserName: credentials.username.trim(),
        Password: credentials.password,
        RememberMe: credentials.rememberMe || false,
      }),
    });
  }

  // register
  async register(userData) {
    return this.request("/auth/register", {
      method: "PUT",
      body: JSON.stringify({
        Username: userData.username.trim(),
        Password: userData.password,
        UserOTP: userData.userOTP?.trim() || "",
      }),
    });
  }

  // logout
  async logout(refreshToken) {
    return this.request("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  // refresh token
  async refreshToken(refreshToken) {
    return this.request("/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  // current user
  async getCurrentUser() {
    return this.request("/auth/current-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}

export default new ApiService();
