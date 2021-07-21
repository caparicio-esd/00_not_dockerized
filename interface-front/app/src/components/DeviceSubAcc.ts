import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class DeviceSubAcc implements IComponentOptions {
    bindings = {

    }
    restrict = "E"
    bindToController = true;
    template = `<div class="device_subacc" ng-transclude></div> `;
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