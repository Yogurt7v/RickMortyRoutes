import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch(url, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [fetchResult, setFetchResult] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios({
      method: "GET",
      url: `${url}?page=${pageNumber}`,
    })
      .then((response) => {
        setFetchResult((prevstate) => {
          return [...new Set([...prevstate, ...response.data.results])];
        })

        setLoading(false);
        setHasMore(response.data.results.length > 0);
      })
      .catch((error) => {
        setError(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, pageNumber]);


  return {
    loading,
    fetchResult,
    hasMore,
    error
  };
}
