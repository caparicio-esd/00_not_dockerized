import { IAttributes, IAugmentedJQuery, IControllerConstructor, IDirective, IDirectiveFactory, Injectable, IScope, IServiceProviderClass } from "angular";
import interact from 'interactjs'


export default class Draggable implements IDirective {
    restrict: string = "E"
    replace: boolean = true

    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$scope", "DragDropTransferService"]
        constructor($scope: any | IScope, DragDropTransferService: IServiceProviderClass) {
            $scope.ddService = DragDropTransferService;
            console.log($scope);

        }
    }

    link(scope: any | IScope, element: IAugmentedJQuery, attrs: IAttributes) {
        const draggableDOM = element[0].querySelector('div')
        scope.position = { x: 0, y: 0 }
        scope.deviceId = JSON.parse(attrs.device).id
        interact(draggableDOM as Interact.Target).draggable({
            autoScroll: true,
            listeners: {
                start(ev) {
                    scope.ddService.draggingObject = draggableDOM
                    scope.ddService.draggingObjectScope = scope;
                    scope.ddService.dragStartListener(ev)
                },
                move(ev) {
                    scope.ddService.dragMoveListener(ev)
                },
                end(ev) {
                    scope.ddService.resetDrag(ev)
                    scope.ddService.draggingObject = null
                    scope.ddService.draggingObjectScope = null;
                }
            }
        })
    }


    static factory(): IDirectiveFactory {
        return () => new Draggable()
    }
}