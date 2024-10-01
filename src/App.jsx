import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import loading from "./assets/loading.gif";
function App() {
  const [image, setImage] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const key = "AyR5QxZConpsdVvR971sqMJyENaLTDMTTb-6iLkSWHc";

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `        https://api.unsplash.com/search/photos?page=${page}&query=animal&client_id=${key}`
      );

      const data = response.data.results;
      setImage((prevData) => [...prevData, ...data]);
      setHasMore(data.length > 0);
      console.log(data);
    } catch (e) {
      console.log(e);
      setHasMore(false);
    }
  };

  const loadMoreImage = () => {
    setpage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    fetchImage();
  }, [page]);
  return (
    <InfiniteScroll
      dataLength={image.length}
      next={loadMoreImage}
      hasMore={hasMore}
      loader={
        <div className="grid place-items-center ">
          <img src={loading} />
        </div>
      }
    >
      <div className="image-gallery grid w-screen place-items-center  gap-20 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
        {image.map((img, index) => (
          <div
            className=" flex flex-col justify-center items-center text-center  "
            key={index}
          >
            <img
              key={img.id}
              className="h-48 w-48 rounded-md border-2"
              src={img.urls.small}
              alt={img.alt_description}
            />
            <p className="underline mt-2">{img.alt_description}</p>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default App;
