import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class DeviceTag implements IComponentOptions {
    bindings = {
        name: "="
    }
    bindToController = true;
    restrict = "E"
    template = `<div class="device_tag">{{ $dt.name }}</div>`;
    controllerAs = '$dt'
    controller: Injectable<IControllerConstructor> = class  {
        initialCount: number = 0
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