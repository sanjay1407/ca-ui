import { useState, useEffect } from "react";
import axios from "axios";
export const usePriceAndContentHook = (searchKey = "") => {
  const [searchTerm, setSearchTerm] = useState(searchKey);
  const [data, setData] = useState({});

  useEffect(() => {
    if (searchTerm.length && searchTerm.length > 3) {
      axios
        .get(`https://ca-api-service.herokuapp.com/khoj?term=${searchTerm}`)
        .then(data => {
          setData({ value: data.data });
          console.log("data.data", data.data);
        });
    } else {
      setData({});
    }
  }, [searchTerm, searchKey]);
  return { searchTerm, data, setSearchTerm };
};
