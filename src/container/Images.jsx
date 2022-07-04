import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { imgListGet } from "../lib/api/todos";
import testimg1 from "../imgs/testimg1.jpg";
import testimg2 from "../imgs/testimg2.jpg";
import testimg3 from "../imgs/testimg3.jpg";
import testimg4 from "../imgs/testimg4.jpg";
import testimg5 from "../imgs/testimg5.jpg";
import testimg6 from "../imgs/testimg6.jpg";
import testimg7 from "../imgs/testimg7.jpg";
import testimg8 from "../imgs/testimg8.jpg";
import testimg9 from "../imgs/testimg9.jpg";
import testimg10 from "../imgs/testimg10.jpg";
import testimg11 from "../imgs/testimg11.jpg";
import testimg12 from "../imgs/testimg12.jpg";
import testimg13 from "../imgs/testimg13.jpg";
import testimg14 from "../imgs/testimg14.jpg";
import testimg15 from "../imgs/testimg15.jpg";
import testimg16 from "../imgs/testimg16.jpg";
import testimg17 from "../imgs/testimg17.jpg";
import testimg18 from "../imgs/testimg18.jpg";
import testimg19 from "../imgs/testimg19.jpg";
import testimg20 from "../imgs/testimg20.jpg";
import testimg21 from "../imgs/testimg21.jpg";
import testimg22 from "../imgs/testimg22.jpg";
import testimg23 from "../imgs/testimg23.jpg";
import testimg24 from "../imgs/testimg24.jpg";
import testimg25 from "../imgs/testimg25.jpg";
import testimg26 from "../imgs/testimg26.jpg";
import testimg27 from "../imgs/testimg27.jpg";
import testimg28 from "../imgs/testimg28.jpg";
import testimg29 from "../imgs/testimg29.jpg";
import testimg30 from "../imgs/testimg30.jpg";
import { LazyLoadComponent, LazyLoadImage } from "react-lazy-load-image-component";

const Images = (props) => {
  const { data, isLoading, isSuccess, error } = useQuery("imge", imgListGet, { initialData: props.posts, refetchInterval: 100000 });
  console.log(data);
  const refImage = useRef();
  console.log(refImage);
  const [imgsLoad, setImgsLoaded] = useState(false);
  const [url, setUrl] = useState([]);
  useEffect(() => {
    if (data) {
      setUrl(data?.data?.map((item) => item.download_url));
    }
  }, [data, data?.data]);
  useEffect(() => {
    if (url.length) {
      const loadImage = (image) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = image;
          // wait 2 seconds to simulate loading time
          loadImg.onload = () =>
            setTimeout(() => {
              resolve(image);
            }, 0);

          loadImg.onerror = (err) => reject(err);
        });
      };

      Promise.all(data?.data.map((image) => loadImage(image.download_url)))
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    }
  }, [url]);
  //   loadImage(data.data[0]?.download_url);
  console.log(imgsLoad);
  // useEffect(() => {
  //   Promise.all(data?.data?.map((item) => item.download_url)).then((res) => setUrl(res));
  // }, [data?.data]);
  console.log(url);
  console.log(process.env);
  return (
    <LazyLoadComponent>
      <div ref={refImage}>
        {data?.data?.map((item) => {
          return <LazyLoadImage effect="blur" placeholderSrc={"/logo.png"} src={item.download_url} alt="dd" width="500px" height="500px" />;
        })}
        {/* {[
        testimg1,
        testimg2,
        testimg3,
        testimg4,
        testimg5,
        testimg6,
        testimg7,
        testimg8,
        testimg9,
        testimg10,
        testimg11,
        testimg12,
        testimg13,
        testimg14,
        testimg15,
        testimg16,
        testimg17,
        testimg18,
        testimg19,
        testimg20,
        testimg21,
        testimg22,
        testimg23,
        testimg24,
        testimg25,
        testimg26,

        testimg27,
        testimg28,
        testimg29,

        testimg30,
      ]?.map((item, i) => {
        if (imgsLoad) {
          return <LazyLoadImage effect="blur" key={i} src={item} alt="me" width="500px" height="500px" />;
        } else {
          return <div>loading</div>;
        }
      })} */}
      </div>
    </LazyLoadComponent>
  );
};

export default Images;
