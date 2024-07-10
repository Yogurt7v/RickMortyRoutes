import { useEffect, useState } from "react";
import {  useParams, useLocation } from "react-router-dom";

export function useSingleData(url) {

    const params = useParams()
    const location = useLocation();
    const [result, setResult] = useState([]);
  
    useEffect(() => {
      if (!location.state) {
        fetch(`${url}/${params.id}`)
          .then((response) => response.json())
          .then((data) => {
            setResult(data);
          });
      } else {
        setResult(
          location.state.filter((item) => item.id === parseInt(params.id))[0]
        );
      }
    }, [params.id, location.state, url]);


    return {
        result
    }
}