import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class GraphContainerSidebarSettings implements IComponentOptions {
    bindings = {

    }
    restrict = "E"
    bindToController = true;
    template = `<div class="graph_container_sidebar_settings" ng-transclude></div> `;
    controllerAs = '$ctrl'
    transclude = true
    controller: Injectable<IControllerConstructor> = class  {
        initialCount: number = 0;
        
        static $inject = []
        constructor() {
            console.log("yooos...");
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