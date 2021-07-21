import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class DeviceAcc implements IComponentOptions {
    bindings = {
        opened: "<"
    }
    restrict = "E"
    bindToController = true;
    template = `<div ng-class="['device_acc', {opened: $ctrl.opened}]" ng-transclude></div> `;
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