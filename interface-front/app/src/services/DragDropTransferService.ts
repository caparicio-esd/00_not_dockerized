import { IScope, IServiceProviderClass } from "angular";
import ChartSettingsService from "./ChartSettingsService";


export default class DragDropTransferService {
    ChartSettingsService: any
    droppingObject: HTMLElement
    draggingObject: HTMLElement
    transferObject: HTMLElement
    draggingObjectScope: any | IScope
    droppingObjectScope: any | IScope
    transferObjectScope: {
        position: {
            x: number,
            y: number
        }
    } = {
            position: { x: 0, y: 0 }
        }

    static $inject = ["ChartSettingsService"]
    constructor(ChartSettingsService: IServiceProviderClass) {
        this.ChartSettingsService = ChartSettingsService
    }

    dragStartListener(ev) {
        this.transferObject = this.draggingObject.cloneNode(true) as HTMLElement;
        this.transferObjectScope.position = {
            x: this.draggingObject.getBoundingClientRect().left,
            y: this.draggingObject.getBoundingClientRect().top
        }
        Object.assign(this.transferObject.style, {
            position: "absolute",
            zIndex: "1000",
            top: 0,
            left: 0,
            transition: "",
            transform: `translate(${this.transferObjectScope.position.x}px, ${this.transferObjectScope.position.y}px)`
        })
        this.transferObject.id = "transfer_tag"
        document.body.appendChild(this.transferObject);
    }

    dragMoveListener(ev) {
        this.transferObjectScope.position.x += ev.dx
        this.transferObjectScope.position.y += ev.dy
        this.transferObject.style.transform = `translate(${this.transferObjectScope.position.x}px, ${this.transferObjectScope.position.y}px)`
    }

    resetDrag(ev) {
        const speed = 200;
        this.transferObjectScope.position.x = 0
        this.transferObjectScope.position.y = 0
        Object.assign(this.transferObject.style, {
            transition: `translate ${speed}ms ease`,
            transform: `translate(${this.draggingObject.getBoundingClientRect().left}px, ${this.draggingObject.getBoundingClientRect().top}px)`
        })
        window.setTimeout(() => { this.abortDrag() }, speed)
    }

    abortDrag() {
        document.getElementById("transfer_tag").outerHTML = ""
    }

    dropEnterListener(ev) {
        Object.assign(this.droppingObject.style, {
            borderColor: "blue"
        })
    }

    dropLeaveListener(ev) {
        Object.assign(this.droppingObject.style, {
            borderColor: ""
        })
    }

    dropListener(dropout = false) {
        const device = this.draggingObjectScope.device;
        const activeType = this.ChartSettingsService.activeState

        if (!this.draggingObjectScope.dropped) {
            const deviceTag = this.draggingObjectScope.deviceTag;
            const property = this.droppingObjectScope?.droppingProperty
            this.ChartSettingsService.setProperty(activeType, property, {
                device,
                deviceTag,
            })
        } else {
            if (dropout) {
                const deviceTag = this.draggingObjectScope.tag.prop;
                const property = this.draggingObjectScope?.droppingFrom
                this.ChartSettingsService.removeProperty(activeType, property, {
                    device,
                    deviceTag,
                })
            }
        }
        this.abortDrop();
    }

    abortDrop() {
        if (this.droppingObject) {
            Object.assign(this.droppingObject.style, {
                borderColor: ""
            })
        }
    }
}