import "../assets/sass/main.sass";
import { io } from "socket.io-client";
import angular from "angular"
import { Chart } from "chart.js";
import interact from "interactjs"


const socket = io("http://localhost:1027", {});
socket.on("connect", () => {
  console.log(socket.id);
  socket.on("data", (data) => {
    console.log(data);
  });
});
