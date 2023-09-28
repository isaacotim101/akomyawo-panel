import axios from "axios";

const api = axios.create({
baseURL: "https://african-hearts-api.vercel.app/api/v1/",
});
export const getCauses = async () => {
  try {
    const response = await api.get("causes");
    console.log("axios cause - response:", response);
    return response.data;
  } catch (error) {
  }
};
export const getTotalCauses = async () => {
  try {
    const response = await api.get("causes");
    console.log("axios cause length - response:", response.data.length);
    return response;
  } catch (error) {
  }
};
export const getBlogs = async () => {
  try {
    const response = await api.get("blogs");
    console.log("axios blogs - response:", response);
    return response.data;
  } catch (error) {
  }
};
export const getTotalBlogs = async () => {
  try {
    const response = await api.get("blogs");
    console.log("axios blogs length - response:", response);
    return response.data;
  } catch (error) {
  }
};
export const getTeams = async () => {
  try {
    const response = await api.get("teams");
    console.log("axios team - response:", response);
    return response.data;
  } catch (error) {
  }
};
export const getContactpage = async () => {
  try {
    const response = await api.get("contactpages");
    console.log("axios contact page - response:", response);
    return response.data;
  } catch (error) {
  }
};  
export const getGallery = async () => {
  try {
    const response = await api.get("gallerys");
    console.log("axios  gallery - response:", response);
    return response.data;
  } catch (error) {
  }
};
export const getHomepage = async () => {
  try {
    const response = await api.get("homepages");
    console.log("axios  home page - response:", response);
    return response.data;
  } catch (error) {
  }
};
export const getAbout = async () => {
  try {
    const response = await api.get("about");
    console.log("axios  home about - response:", response);
    return response.data;
  } catch (error) {
  }
};
export const getUsers = async () => {
  try {
    const response = await api.get("users");
    return response.data;
  } catch (error) {
  }
};
export const getSuccess = async () => {
  try {
    const response = await api.get("success");
    return response.data;
  } catch (error) {
  }
};
export const getProject = async () => {
  try {
    const response = await api.get("projects");
    return response.data;
  } catch (error) {
  }
};
export const getCampaign = async () => {
  try {
    const response = await api.get("campaigns");
    return response.data;
  } catch (error) {
  }
};