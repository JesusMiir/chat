import { useState, useEffect } from "react";

const IS_DEV = window.location.href.includes("localhost");
const BACKEND_URL = IS_DEV ? "http://localhost:8800" : "url_of_web";

/*
    {
        initialData: any
        url: string
        fetchOptions: FetchOptions
    }
*/
export default function useBackendFetch(obj) {
  const [data, setData] = useState(obj.initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function onMount() {
    const res = await fetch(BACKEND_URL + obj.url, obj.fetchOptions);
    if (!res.ok) {
      setError("Something went wrong");
    } else {
      setData(await res.json());
    }
    setIsLoading(false);
  }

  useEffect(() => {
    onMount();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}

/*
        fetch("/url")       this makes a GET request to /url
        
        fetch("/url", {
            method: "PUT",
            headers: {},
            body: ""
        })
*/
