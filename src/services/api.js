const baseUrl = "https://african-hearts-api.vercel.app/api/v1/";
const newUrl = "https://ako-api.vercel.app/";
export const getCauses = async () => {
  try {
    const response = await fetch(`${baseUrl}causes`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch cause - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getTotalCauses = async () => {
  try {
    const response = await fetch(`${baseUrl}causes`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch cause length - response:", data.length);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getBlogs = async () => {
  try {
    const response = await fetch(`${newUrl}posts`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch blogs - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};
export const getUpdates = async () => {
  try {
    const response = await fetch(`${baseUrl}updates`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch updates - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getTotalBlogs = async () => {
  try {
    const response = await fetch(`${baseUrl}blogs`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch blogs length - response:", data.length);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getTeams = async () => {
  try {
    const response = await fetch(`${baseUrl}teams`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch team - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getContactpage = async () => {
  try {
    const response = await fetch(`${baseUrl}contactpages`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch contact page - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getGallery = async () => {
  try {
    const response = await fetch(`${baseUrl}gallerys`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch gallery - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getHomepage = async () => {
  try {
    const response = await fetch(`${baseUrl}homepages`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch home page - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getAbout = async () => {
  try {
    const response = await fetch(`${baseUrl}about`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch about - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}users`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch users - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getSuccess = async () => {
  try {
    const response = await fetch(`${baseUrl}success`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch success - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getProject = async () => {
  try {
    const response = await fetch(`${baseUrl}projects`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch projects - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};

export const getCampaign = async () => {
  try {
    const response = await fetch(`${baseUrl}campaigns`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log("fetch campaigns - response:", data);
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};
