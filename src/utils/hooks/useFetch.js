import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    () => {
      setError(false);
      setLoading(true);

      try {
        axios.get(url).then((res) => {
          // console.log(res.data);
          setData(res.data);
        });
      } catch (error) {
        console.log(error);
        setError(error);
      }

      setLoading(false);
    };
  }, [url]);

  return [data, error, loading];
}
