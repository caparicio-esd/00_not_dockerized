import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";

export default class DroppableGroup implements IComponentOptions {
    bindings = {
        label: "<",
        tags: "<"
    }
    controllerAs = '$dg'
    bindToController = true;
    restrict = "E"
    template = `
        <div class="dropable_group">
            <div class="dropable_group_header">
            <div class="icon"><span class="fa fa-hashtag"></span></div>
            <div class="label">{{$dg.label}}</div>
            </div>
            <droppable property="{{$dg.label}}">
                <div class="dropable_box">
                    <div class="dropable_box_content">
                        <draggable ng-repeat="tag in $dg.tags" device="{{tag.device}}" dropped="true" dropping-from="{{$dg.label}}">
                            <device-tag name="$dg.createName(tag)" />
                        </draggable>
                    </div>
                </div>
            </droppable>
        </div>
    `;
    controller: Injectable<IControllerConstructor> = class {
        scope: IScope;
        static $inject = ["$scope"]
        constructor($scope: IScope) {
            this.scope = {...$scope}
        }
        createName(tag) {
            const betterName = tag.device.id.lastIndexOf(":");
            const sliced = tag.device.id.slice(betterName+1);
            return `${sliced}-${tag.prop}`
        }
    }
}