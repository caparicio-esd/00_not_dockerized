import { IAttributes, IAugmentedJQuery, IControllerConstructor, IControllerProvider, IDirective, IDirectiveFactory, Injectable, IScope } from "angular";
import interact from 'interactjs'


export default class Draggable implements IDirective {
    restrict: string = "E"
    replace: boolean = true

    link(scope, element: IAugmentedJQuery, attrs: IAttributes, controllers: any) {
        const draggableDOM = element[0].querySelector('div')
        scope.position = { x: 0, y: 0 }
        interact(draggableDOM as Interact.Target).draggable({
            autoScroll: true,
            listeners: {
                start: (ev) => this.dragStartListener(ev, draggableDOM, scope),
                move: (ev) => this.dragMoveListener(ev, draggableDOM, scope),
                end: (ev) => this.resetDrag(ev, draggableDOM, scope)
            }
        })
    }

    dragStartListener(ev, draggableDOM, scope) {
        draggableDOM.style.zIndex = 1000
        draggableDOM.style.position = "relative"
        draggableDOM.style.transition = ""
    }

    dragMoveListener(ev, draggableDOM, scope) {
        scope.position.x += ev.dx
        scope.position.y += ev.dy
        draggableDOM.style.transform = `translate(${scope.position.x}px, ${scope.position.y}px)`
    }

    resetDrag(ev, draggableDOM, scope) {
        scope.position.x = 0
        scope.position.y = 0
        draggableDOM.style.transition = "translate 200ms ease"
        draggableDOM.style.zIndex = 0
        draggableDOM.style.position = ""
        draggableDOM.style.transform = `translate(${scope.position.x}px, ${scope.position.y}px)`
    }

    static factory(): IDirectiveFactory {
        return () => new Draggable()
    }
}