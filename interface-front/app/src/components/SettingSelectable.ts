import { IComponentOptions } from "angular";

export default class SettingSelectable implements IComponentOptions {
    bindings = {
        icon: "=",
        active: "="
    }
    controllerAs = '$chs'
    template = `
        <div ng-class="['chart_selectable', {active: $chs.active}]">
            <span ng-class="['fa', 'fa-{{ $chs.icon }}']"></span>
        </div>
    `;
}