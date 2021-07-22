import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class SettingSelectable implements IComponentOptions {
    bindings = {
        icon: "=", 
        active: "="
    }
    bindToController = true;
    restrict = "E"
    template = `
        <div ng-class="['chart_selectable', {active: $chs.active}]">
            <span ng-class="['fa', 'fa-{{ $chs.icon }}']"></span>
        </div>`;
    controllerAs = '$chs'
    controller: Injectable<IControllerConstructor> = class  {

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