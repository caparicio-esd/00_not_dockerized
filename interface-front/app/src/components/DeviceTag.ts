import { IComponentOptions } from "angular";

export default class DeviceTag implements IComponentOptions {
    bindings = {
        name: "="
    }
    bindToController = true;
    controllerAs = '$dt'
    template = `
        <div class="device_tag">
            {{ $dt.name }}
        </div>
    `;
}