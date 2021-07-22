import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class DeviceAcc implements IComponentOptions {
    bindings = {
        opened: "<"
    }
    template = `
        <div 
            ng-class="['device_acc', {opened: $ctrl.opened}]" 
            ng-transclude 
        ></div>
    `;
    controllerAs = '$ctrl'
    transclude = true
    bindToController = true;
    restrict = "E"
    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$scope"]
        constructor($scope: IScope) {
            
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