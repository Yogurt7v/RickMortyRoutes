import { useEffect, useState } from "react";
import axios from "axios";
import { sort } from "../utils/sort";

export function useFetch(url, pageNumber, sortParams) {
  const [loading, setLoading] = useState(true);
  const [fetchResult, setFetchResult] = useState([]);

  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios({
      method: "GET",
      url: `${url}?page=${pageNumber}`,
    })
      .then((response) => {
        setFetchResult((prevstate) => {
          return [...new Set([...prevstate, ...response.data.results])];
        });
        if(sortParams) {
          const sortedArray = sort(fetchResult, sortParams.get("key"));
          setFetchResult(sortedArray);
        }
        setLoading(false);
        setHasMore(response.data.results.length > 0);
      })
      .catch((error) => {
        console.error("Fetch Error", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, pageNumber, sortParams]);


  return {
    loading,
    // error,
    fetchResult,
    hasMore,
  };
}
