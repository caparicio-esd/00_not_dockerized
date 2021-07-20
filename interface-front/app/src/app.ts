import angular from "angular"
import { Chart } from "chart.js";
import interact from "interactjs"
import { Values } from "./constants";
import MainController from "./controllers/MainController";
import MyHola from "./directives/MyHola";
import EDVLChart from "./factories/EDVLChart";
import DataService from "./services/DataService";


export default class App {
    app: any

    constructor() {
        this.app = angular
            .module("app", [])
            .value("rootValues", Values)
            .controller("MainController", MainController)
            .service("DataService", DataService)
            .service("EDVLCharts", EDVLChart)
            .directive("hola", MyHola.factory())

        return this.app
    }
}

