import angular from "angular"
import { Chart } from "chart.js";
import interact from "interactjs"
import MainController from "./controllers/MainController";
import DataService from "./services/DataService";


export default class App {
    app: any

    constructor() {
        this.app = angular
            .module("app", [])
            .controller("MainController", MainController)
            .service("DataService", DataService)
        return this.app
    }
}

