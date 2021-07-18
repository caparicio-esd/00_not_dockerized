import { IController, IScope } from "angular";
import DataService from "../services/DataService";

interface MainControllerScope extends ng.IScope {
    data: any[]
    foo: number
}

export default class MainController implements IController {
    scope: MainControllerScope
    data: any[]
    foo: number

    public static $inject = ["$scope", "DataService"]
    constructor($scope: MainControllerScope, DataService: DataService) { //inject dependencies
        this.scope = $scope
        this.scope.foo = 1
        this.scope.data = []
        this.scope.$on("data:update", (ev, data) => { this.dataUpdateHandler(data) })
    }
    dataUpdateHandler(data) {
        this.scope.data.push(data)
        if (this.scope.data.length > 5) {
            this.scope.data.splice(0, this.scope.data.length - 5)
        }
        this.scope.$digest()          
    }
}
