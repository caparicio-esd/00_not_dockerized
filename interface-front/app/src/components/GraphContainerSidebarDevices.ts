import { IComponentOptions, IControllerConstructor, IDirective, IDirectiveController, Injectable, IScope } from "angular";


export default class GraphContainerSidebarDevices implements IDirective {
    bindings = {}
    template = `
        <div class="graph_container_sidebar_devices" ng-transclude></div>
    `;
    restrict = "E"
    bindToController = true;
    controllerAs = '$ctrl'
    transclude = true
    controller: Injectable<IControllerConstructor> = class  {
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