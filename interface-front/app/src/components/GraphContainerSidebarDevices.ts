import { IComponentOptions, IControllerConstructor, IDirective, IDirectiveController, Injectable, IScope } from "angular";


export default class GraphContainerSidebarDevices implements IDirective {
    bindings = {

    }
    restrict = "E"
    bindToController = true;
    template = `<div class="graph_container_sidebar_devices" ng-transclude></div>`;
    controllerAs = '$ctrl'
    transclude = true
    selector = "div.graph_container_sidebar_devices"

    controller: Injectable<IControllerConstructor> = class  {
        initialCount: number = 0;
        
        static $inject = []
        constructor() {

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
    }
}