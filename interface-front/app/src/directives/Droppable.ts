import { IAttributes, IAugmentedJQuery, IControllerConstructor, IControllerProvider, IDirective, IDirectiveFactory, Injectable, IScope } from "angular";
import interact from 'interactjs'


export default class Droppable implements IDirective {
    restrict: string = "E"
    replace: boolean = true

    static $inject = ["DragDropTransferService"]
    constructor(DragDropTransferService) {
      
    }

    link(scope, element: IAugmentedJQuery, attrs: IAttributes, controllers: any) {
        const droppableDOM = element[0].querySelector('div')
        scope.dropping = null
        interact(droppableDOM as Interact.Target).dropzone({
            ondragenter: (ev) => this.dropStartListener(ev, droppableDOM, scope),
            ondropmove: (ev) => this.dropMoveListener(ev, droppableDOM, scope),
            ondrop: (ev) => this.dropEndListener(ev, droppableDOM, scope)
        })
    }

    dropStartListener(ev, element, scope) {

    }

    dropMoveListener(ev, element, scope) {

    }

    dropEndListener(ev, element, scope) {
        
    }


    static factory(): IDirectiveFactory {
        return (DragDropTransferService) => new Droppable(DragDropTransferService)
    }
}
