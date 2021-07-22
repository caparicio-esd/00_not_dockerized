import { IComponentOptions, IController, IControllerConstructor, IControllerService, Injectable, IScope } from "angular";


export default class DeviceAcc implements IComponentOptions {
    bindings = {
        opened: "<"
    }
    restrict = "E"
    bindToController = true;
    template = `
        <div 
            ng-class="['device_acc', {opened: $ctrl.opened}]" 
            ng-transclude 
        ></div>
    `;
    controllerAs = '$ctrl'
    transclude = true
    controller: Injectable<IControllerConstructor> = class {
        static $inject = []
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