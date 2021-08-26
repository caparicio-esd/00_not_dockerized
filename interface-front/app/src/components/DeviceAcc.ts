import { IComponentOptions, IControllerConstructor, ILogProvider, ILogService, Injectable, IScope } from "angular";


export default class DeviceAcc implements IComponentOptions {
    controllerAs = '$ctrl'
    transclude = true
    bindings = {
        opened: "<"
    }
    template = `
        <div 
            ng-class="['device_acc', {opened: $ctrl.opened}]" 
            ng-transclude 
        ></div>
    `;
    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$scope", "$log"]
        constructor($scope: IScope, $log: ILogService) {
            $log.debug("hola")
            
            
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