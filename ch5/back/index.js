const express = require("express");

const app = express(); // app 객체 생성

// 주소 설정
app.get("/", (req, res) => {
  res.send("Hello, server");
});

app.get("/about", (req, res) => {
  res.send("Hello, about");
});

// 서버 포트번호 설정
app.listen(3065, () => {
  console.log(`server is running on localhost:3065`);
});
