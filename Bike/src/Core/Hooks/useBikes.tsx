import { useQuery } from "react-query";
import { fetchData } from "@Services/api";
import { Bike, BikesCount } from "@Types/Bike";
import { ErrorProps } from "@Types/ErrorProps";
import { toast } from "react-toastify";

const useBikes = (
  pageSize?: number,
  page?: number,
  stolenness?: string,
  textSearch?: string
) => {
  const getBikes = () =>
    useQuery<Bike, Error>(
      ["bikes", page, pageSize, stolenness, textSearch],
      () =>
        fetchData<Bike>(
          //`search?page=${page}&per_page=${pageSize}&stolenness=stolen`
          `search?page=${page}&per_page=${pageSize}&stolenness=${stolenness}&query=${
            textSearch || ""
          }`
        ),
      {
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
        cacheTime: 120000,
        staleTime: Infinity,
      }
    );

  const getBikesCount = () =>
    useQuery<BikesCount, Error>(
      ["bikes-count", stolenness],
      () => fetchData<BikesCount>(`/search/count`),
      {
        onError(error: ErrorProps) {
          toast.error(`Error :${error?.response.data.error.message}`, {
            autoClose: false,
          });
        },
        cacheTime: 120000,
        staleTime: Infinity,
      }
    );

  const getBike = (id: number) => fetchData<Bike>(`/bikes/${id}`);

  return {
    getBikes,
    getBikesCount,
    getBike,
  };
};

export default useBikes;
