import "../assets/sass/main.sass";
import Connection from './connection'
import App from './src/app'


Connection.getOrCreateConnection()
const app = new App()