import { IController, IScope } from "angular";

export default class UIController implements IController {
    openedDeviceType = null
    openedDevice = null
    public static $inject = ["$scope"]
    constructor($scope: IScope) { //inject dependencies
        
    }
    openDeviceType(deviceType) {
        this.openedDeviceType = this.openedDeviceType == deviceType ? null: deviceType
        if (this.openedDeviceType == null) {
            this.openedDevice = null;
        }
    }
    openDevice(device) {
        this.openedDevice = this.openedDevice?.id == device?.id ? null: device
    }
}