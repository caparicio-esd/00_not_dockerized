import { IComponentOptions, IControllerConstructor, Injectable, IScope } from "angular";


export default class DroppableGroup implements IComponentOptions {
    bindings = {
        label: "<",
        tags: "<"
    }
    bindToController = true;
    restrict = "E"
    template = `
        <div class="dropable_group">
            <div class="dropable_group_header">
            <div class="icon"><span class="fa fa-hashtag"></span></div>
            <div class="label">{{$dg.label}}</div>
            </div>
            <droppable>
                <div class="dropable_box">
                        <div class="dropable_box_content">
                            <device-tag ng-repeat="tag in $dg.tags" name="tag" />
                        </div>
                </div>
            </droppable>
        </div>
    `;
    controllerAs = '$dg'
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