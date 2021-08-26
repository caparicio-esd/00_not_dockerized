import { IAttributes, IAugmentedJQuery, IControllerConstructor, IControllerProvider, IDirective, IDirectiveFactory, Injectable, IScope, IServiceProviderClass } from "angular";
import interact from 'interactjs'


export default class Droppable implements IDirective {
    restrict: string = "E"
    replace: boolean = true

    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$scope", "DragDropTransferService"]
        constructor($scope: any | IScope, DragDropTransferService: IServiceProviderClass) {
            $scope.ddService = DragDropTransferService;
        }
    }

    link(scope: any | IScope, element: IAugmentedJQuery, attrs: IAttributes) {
        const droppableDOM = element[0].querySelector('div')
        scope.droppingProperty = attrs.property
        interact(droppableDOM as Interact.Target).dropzone({
            ondragenter: (ev) => {
                scope.ddService.droppingObject = droppableDOM
                scope.ddService.droppingObjectScope = scope;
                scope.ddService.dropEnterListener(ev)
            },
            ondragleave: (ev) => {
                scope.ddService.dropLeaveListener(ev)
                scope.ddService.droppingObject = null
                scope.ddService.droppingObjectScope = null
            },
            ondrop: (ev) => {
                scope.ddService.dropListener()
                scope.ddService.droppingObject = null
                scope.ddService.droppingObjectScope = null
            }
        })
    }


    static factory(): IDirectiveFactory {
        return () => new Droppable()
    }
}
