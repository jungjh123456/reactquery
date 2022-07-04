import express from "express";
import fs from "fs";
import path from "path";

import React from "react";

import ReactDOMServer from "react-dom/server";
import App from "../src/App";
const app = express();
const PORT = 8000;
// 리엑트로 ssr 해보기
// 경로로 / 시작해서 가져와야한다.
app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happende");
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`));
    // 응답을 반환 할 수 있다.
    // 마운팅 포인트 -> react에 <div id="root"></div>
    // 템플릿 문자열 내부에서 render to string 이라는 react Dom서버 메서드를 사용한다.
    // 스트링을 render를 하기 위해서 사용
  }); // npm run build 후 build파일에 index.html에 대한 경로를 전달한다.
});

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
