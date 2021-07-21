import { IController, IScope } from "angular";

interface UIControllerScope extends ng.IScope {
    bgColor: string
}

export default class UIController implements IController {
    bgColor = "pink"

    public static $inject = ["$scope"]
    constructor($scope: UIControllerScope) { //inject dependencies
        
    }
}