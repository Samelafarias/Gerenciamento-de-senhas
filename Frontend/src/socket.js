import { io } from 'socket.io-client';

// Coloque o endereço do seu servidor. 
// Se o backend estiver rodando na mesma máquina, será 'http://localhost:4000'
const URL = 'http://localhost:4000'; 
const socket = io(URL);

export default socket;