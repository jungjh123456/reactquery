import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { imgListGet } from "../lib/api/todos";

const Images = (props) => {
  const { data, isLoading, isSuccess, error } = useQuery("imge", imgListGet, { initialData: props.posts, refetchInterval: 100000 });
  console.log(data);
  const refImage = useRef();
  console.log(refImage);
  function loadImage(ref) {
    return new Promise(function (resolve) {
      const ImgNew = new Image();

      ImgNew.onload = (_) => {
        ImgNew.status = "OK";
        resolve();
      };
      ImgNew.onerror = (_) => {
        ImgNew.status = "bad";
        resolve();
      };

      ImgNew.src = ref;
      setUrl((state) => [...state, ref]);
    });
  }
  //   loadImage(data.data[0]?.download_url);
  const [url, setUrl] = useState([]);
  useEffect(() => {
    Promise.all(data?.data?.map((item) => item.download_url)).then((res) => setUrl(res));
  }, [data?.data]);
  console.log(url);
  return (
    <div ref={refImage}>
      {/* {data?.data?.map((item) => {
        return <img src={item.download_url} alt="" width={500} height={500} />;
      })} */}
      {url?.map((item) => {
        return <img src={item} alt="" width={500} height={500} />;
      })}
    </div>
  );
};

export default Images;
