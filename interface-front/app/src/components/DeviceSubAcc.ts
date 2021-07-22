import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class DeviceSubAcc implements IComponentOptions {
    bindings = {
        opened: "<",
        active: "<"
    }
    restrict = "E"
    bindToController = true;
    template = `
        <div 
            ng-class="['device_subacc', {active: $ctrl.active}, {opened: $ctrl.opened}]" 
            ng-transclude
        ></div>
    `;
    controllerAs = '$ctrl'
    transclude = true
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