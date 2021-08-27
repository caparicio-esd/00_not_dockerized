import { IComponentOptions, IControllerConstructor, IControllerService, Injectable, IScope } from "angular";

export default class GraphComponent implements IComponentOptions {
    bindings = {};
    controllerAs = '$ctrl'
    transclude = true
    restrict = "E"
    template = `
        <div 
            class="graph_container" 
            ng-transclude
        ></div>
    `;
    controller: Injectable<IControllerConstructor> = class {
        ui: object
        static $inject = ["$scope", "$controller"]
        constructor($scope: IScope, $controller: IControllerService) {
            this.ui = $controller("UIController", { $scope: $scope })
        }
    }
}