import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class DeviceTag implements IComponentOptions {
    bindings = {
        name: "="
    }
    template = `
        <div class="device_tag">
            {{ $dt.name }}
        </div>
    `;
    bindToController = true;
    restrict = "E"
    controllerAs = '$dt'
    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$scope"]
        constructor($scope: IScope) {

        }
        $onChanges(): void {

        }
        $onInit(): void {

        }
        $doCheck(): void {

        }
        $onDestroy(): void {

        }
        $postLink(): void {

        }
    }
}