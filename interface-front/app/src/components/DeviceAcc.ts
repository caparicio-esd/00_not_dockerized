import { IComponentOptions } from "angular";


export default class DeviceAcc implements IComponentOptions {
    bindings = {
        opened: "<"
    }
    transclude = true
    template = `
        <div 
            ng-class="['device_acc', {opened: $ctrl.opened}]" 
            ng-transclude 
        ></div>
    `;
}