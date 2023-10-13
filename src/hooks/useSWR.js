import useSWR from "swr";
import * as api from "../services/api";

export const useFetch = () => {
  return {
      GetCauses: () =>
      useSWR("allPosts", async () => {
        const response = await api.getCauses();
        return response;
      }),
      GetBlogs: () =>
      useSWR("allBlogs", async () => {
        const response = await api.getBlogs();
        return response;
      }),
      GetUpdates: () =>
      useSWR("allUpdates", async () => {
        const response = await api.getUpdates();
        return response;
      }),
      GettotalCauses: () =>
      useSWR("allPosts", async () => {
        const res = await api.getTotalCauses();
        return res;
      }),
      GettotalBlogs: () =>
      useSWR("allPosts", async () => {
        const res = await api.getTotalBlogs();
        return res;
      }),
      GetTeams: () =>
      useSWR("allTeams", async () => {
        const res = await api.getTeams();
        console.log("SWR teams - response:", res);
        return res;
      }),
      GetContactpage: () =>
      useSWR("allContacts", async () => {
        const res = await api.getContactpage();
        return res;
      }),
      GetGallery: () =>
      useSWR("allGallery", async () => {
        const res = await api.getGallery();
        return res;
      }),
      GetHomepage: () =>
      useSWR("allHomepage", async () => {
        const res = await api.getHomepage();
        return res;
      }),
      GetAbout: () =>
      useSWR("allAbout", async () => {
        const res = await api.getAbout();
        return res;
      }),
      GetUsers: () =>
      useSWR("allUSers", async () => {
        const res = await api.getUsers();
        return res.users;
      }),
      GetSuccess: () =>
      useSWR("allSuccess", async () => {
        const res = await api.getSuccess();
        return res;
      }),
      GetProject: () =>
      useSWR("allProject", async () => {
        const res = await api.getProject();
        return res;
      }),
      GetCampaign: () =>
      useSWR("allCampaign", async () => {
        const res = await api.getCampaign();
        return res;
      }),
  };
};