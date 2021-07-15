import "./style.css";
import { io } from "socket.io-client";


const socket = io("http://localhost:1027", {});
socket.on("connect", () => {
  console.log(socket.id);
  socket.on("data", data => {
    console.log(data);
  })
})

