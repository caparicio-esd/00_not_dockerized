import { IComponentOptions, IControllerConstructor, IControllerService, Injectable, IScope } from "angular";
import UIController from "../controllers/UIController";
import GraphContainerSidebarDevices from "./GraphContainerSidebarDevices";

export default class GraphComponent implements IComponentOptions {
    bindings = {};
    template = `
        <div 
            class="graph_container" 
            ng-transclude
        ></div>
    `;
    controllerAs = '$ctrl'
    transclude = true
    restrict = "E"
    controller: Injectable<IControllerConstructor> = class {
        ui: object
        static $inject = ["$scope", "$controller"]
        constructor($scope: IScope, $controller: IControllerService) {
            this.ui = $controller("UIController", { $scope: $scope })
        }
        $onChanges(): void {

        }
        $onInit(): void {

        }
        $doCheck(): void {

        }
        $onDestroy(): void {

        }
        $postLink(): void {

        }
        lol(): void {

        }
    }
}