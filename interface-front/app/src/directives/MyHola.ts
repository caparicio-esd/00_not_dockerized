import { IAttributes, IAugmentedJQuery, IDirective, IDirectiveFactory, IScope } from "angular";

export default class MyHola implements IDirective {
    restrict: string = "E"
    scope: boolean = true
    data: any = []
    maxValue: number = 0

    link(scope: IScope, element: IAugmentedJQuery, attrs: IAttributes, controllers: any) {
        scope.$watchCollection("data", (data) => this.watchData(data, scope, element))   
    }
    static factory(): IDirectiveFactory {
        return () => new MyHola()
    }
    watchData(data, scope, element) {
        this.data = data
        this.maxValue = Math.max(this.maxValue, data[0].data[0].temperature.value)
        element.html(`<p>Max value: <b>${this.maxValue}</b></p>`)
    }
}