import axiosInstance from "@Constants/Config";

export const fetchData = async <T,>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};
