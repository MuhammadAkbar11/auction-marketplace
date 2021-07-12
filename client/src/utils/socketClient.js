import { io } from "socket.io-client";
import { SERVER_ENDPOINT } from "../constants/socket.constants";

const socketClient = io(SERVER_ENDPOINT);

export default socketClient;
