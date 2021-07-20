import { IController, IScope } from "angular";
import DataService from "../services/DataService";

interface MainControllerScope extends ng.IScope {
    data: any[]
    maxQueue: number
}

export default class MainController implements IController {
    scope: MainControllerScope

    public static $inject = ["$scope", "DataService", "rootValues"]
    constructor($scope: MainControllerScope, DataService: DataService, rootValues: any) { //inject dependencies
        this.scope = $scope
        this.scope.maxQueue = 8
        this.scope.data = []
        this.scope.$on("data:update", (ev, data) => { this.dataUpdateHandler(data) })        
    }
    
    dataUpdateHandler(data) {
        this.scope.data.push(data)
        if (this.scope.data.length > this.scope.maxQueue) {
            this.scope.data.splice(0, this.scope.data.length - this.scope.maxQueue)
        }
        this.scope.$digest()
    }
}
