import { useQuery } from "react-query";
import { fetchData } from "@Services/api";
import { Bike, BikeItemOne, BikesCount } from "@Types/Bike";
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

  const getBike = (id: number) => fetchData<BikeItemOne>(`/bikes/${id}`);

  const getOneBike = (id: number) => {
    return useQuery({
      queryKey: ["bike", id],
      queryFn: () => getBike(id),
      enabled: !!id, // Ensure it only fetches if id exists
    });
  };

  return {
    getBikes,
    getBikesCount,
    getBike,
    getOneBike,
  };
};

export default useBikes;
