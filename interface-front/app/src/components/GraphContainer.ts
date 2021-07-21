import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";
import GraphContainerSidebarDevices from "./GraphContainerSidebarDevices";

export default class GraphComponent implements IComponentOptions {
    restrict = "E"
    bindings = {
        color: "<"
    };
    template = `
        <div 
            class="graph_container" 
            ng-transclude
            ng-style="{background: $ctrl.color}"
        ></div>
    `;
    controllerAs = '$ctrl'
    transclude = true
    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$rootScope"]
        constructor($rootScope: IScope){
            console.log(this);            
        }
        $onChanges(): void{

        }
        $onInit(): void {

        }
        $doCheck(): void{

        }
        $onDestroy(): void {

        }
        $postLink(): void {

        }
        lol(): void {

        }
    }
}