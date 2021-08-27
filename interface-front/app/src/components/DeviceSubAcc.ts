import { IComponentOptions } from "angular";

export default class DeviceSubAcc implements IComponentOptions {
    bindings = {
        opened: "<",
        active: "<"
    }
    transclude = true
    template = `
        <div 
            ng-class="['device_subacc', {active: $ctrl.active}, {opened: $ctrl.opened}]" 
            ng-transclude
        ></div>
    `;
}