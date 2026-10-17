import axiosInstance from "../axios/axios";

export const createUser = async (data) => {
  let response;
  try {
    response = await axiosInstance.post("/users/create", data);
  } catch (err) {
    response = err;
  }
  if (response.status === 201) {
    const res = response?.data;
    localStorage.setItem("token", res?.access_token);
    return { success: true, data: res?.user };
  }
  if (response.status === 409)
    return { success: false, message: "Email already in use" };
  return { success: false, message: "Failed to create user" };
};

export const loginUser = async (data) => {
  let response;
  try {
    response = await axiosInstance.post("/users/login", data);
  } catch (err) {
    response = err;
  }
  if (response.status === 200) {
    const res = response?.data;
    localStorage.setItem("token", res?.access_token);
    return { success: true, data: res?.user };
  }
  if (response.status === 401)
    return { success: false, message: "Email or password incorrect" };
  return { success: false, message: "Failed to login" };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getUserProfileData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: "No token found" };
  }

  let response;
  try {
    response = await axiosInstance.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    response = err;
  }

  if (response.status === 200) return response?.data;
  else if ([404, 401, 500].includes(response.status)) return {};

  return {};
};
