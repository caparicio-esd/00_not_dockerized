import angular from "angular"
import DeviceAcc from "./components/DeviceAcc";
import DeviceSubAcc from "./components/DeviceSubAcc";
import DeviceTag from "./components/DeviceTag";
import DroppableGroup from "./components/DroppableGroup";
import GraphComponent from "./components/GraphContainer";
import GraphContainerSidebarDevices from "./components/GraphContainerSidebarDevices";
import GraphContainerSidebarSettings from "./components/GraphContainerSidebarSettings";
import SettingSelectable from "./components/SettingSelectable";
import { Values } from "./constants";
import MainController from "./controllers/MainController";
import UIController from "./controllers/UIController";
import Draggable from "./directives/Draggable";
import Droppable from "./directives/Droppable";
import Chart from "./directives/Chart";
import EDVLChart from "./factories/EDVLChart";
import DataService from "./services/DataService";
import ChartSettingsService from "./services/ChartSettingsService";
import DragDropTransferService from "./services/DragDropTransferService";
import TimeWindowService from "./services/TimeWindowService";


export default class App {
    app: any

    constructor() {
        this.app = angular
            .module("app", [])
            .value("rootValues", Values)
            .controller("MainController", MainController)
            .controller("UIController", UIController)
            .service("DataService", DataService)
            .service("ChartSettingsService", ChartSettingsService)
            .service("TimeWindowService", TimeWindowService)
            .service("DragDropTransferService", DragDropTransferService)
            .service("EDVLCharts", EDVLChart)
            .directive("draggable", Draggable.factory())
            .directive("droppable", Droppable.factory())
            .directive("chart", Chart.factory())
            .component("graphContainer", new GraphComponent())
            .component("graphContainerSidebarDevices", new GraphContainerSidebarDevices())
            .component("graphContainerSidebarSettings", new GraphContainerSidebarSettings())
            .component("deviceAcc", new DeviceAcc())
            .component("deviceSubAcc", new DeviceSubAcc())
            .component("deviceTag", new DeviceTag())
            .component("settingSelectable", new SettingSelectable())
            .component("droppableGroup", new DroppableGroup())

        return this.app
    }
}

