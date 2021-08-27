import { IController, IScope } from "angular";
import DataService from "../services/DataService";

interface MainControllerScope extends IScope {
    data: any[]
    deviceTypes: string[]
    devices: any[]
    getDevicesByType: Function
    maxQueue: number
}

export default class MainController implements IController {
    scope: MainControllerScope

    public static $inject = ["$scope", "DataService", "rootValues"]
    constructor($scope: MainControllerScope, DataService: DataService, rootValues: any) { //inject dependencies
        this.scope = $scope
        this.scope.maxQueue = 8
        this.scope.data = []
        this.scope.deviceTypes = []
        this.scope.devices = []
        this.scope.getDevicesByType = (deviceType) => this.getDevicesByType(deviceType)
        this.scope.$on("data:update", (ev, data) => { this.dataUpdateHandler(data) })
    }

    dataUpdateHandler(data) {
        this.scope.data.push(data)
        this.getDeviceTypes(data)
        this.getDevices(data)
        this.scope.$digest()
    }

    getDeviceTypes(incomingData): void {
        const type = incomingData.data[0].type;
        if (!this.scope.deviceTypes.includes(type)) this.scope.deviceTypes.push(
            type
        )
    }

    getDevices(incomingData): void {
        const id = incomingData.data[0].id;
        const type = incomingData.data[0].type;
        const props = Object.keys(incomingData.data[0])
        if (!this.scope.devices.find(d => d.id == id)) this.scope.devices.push({
            id, type, props
        })
    }

    getDevicesByType(deviceType): any[] {
        const devs = this.scope.devices.filter(dev => dev.type == deviceType)
        return devs
    }
}
