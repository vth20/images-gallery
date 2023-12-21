import axios, { AxiosResponse } from "axios";

// const API_BASE_URL = process.env.URL_API;
const API_BASE_URL = "http://localhost:8001";
const apiEndpoint = axios.create({
  baseURL: API_BASE_URL,
});

apiEndpoint.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiEndpoint.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

export const getKeywords = async () => {
  try {
    const response: string[] = await apiEndpoint.get(
      `${API_BASE_URL}/keywords`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (file: File) => {
  try {
    const response: string[] = await apiEndpoint.post(
      `${API_BASE_URL}/upload`,
      { file },
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set Content-Type là multipart/form-data
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const handleGetImageByKeyword = async (payload: string) => {
  try {
    console.log(1);
    const response = await apiEndpoint.get(`${API_BASE_URL}/search`, {
      params: {
        keywords: payload,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
