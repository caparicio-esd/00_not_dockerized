import { IScope } from "angular";

export default class ChartSettingsService {
    root: IScope
    activeState: string = "line"
    activeProps
    state: any = [
        {
            id: "line",
            icon: "line-chart", 
            active: true,
            props: [
                {
                    label: "xAxis", 
                    content: ["hola"]
                },
                {
                    label: "yAxis", 
                    content: []
                }
            ]
        },{
            id: "pie",
            icon: "pie-chart", 
            active: false,
            props: [
                {
                    label: "xAxis", 
                    content: []
                },
                {
                    label: "yAxis", 
                    content: []
                }
            ]
        },{
            id: "area",
            icon: "area-chart", 
            active: false,
            props: [
                {
                    label: "xAxis", 
                    content: []
                },
                {
                    label: "yAxis", 
                    content: []
                }
            ]
        },{
            id: "bar",
            icon: "bar-chart", 
            active: false,
            props: [
                {
                    label: "xAxis", 
                    content: []
                },
                {
                    label: "yAxis", 
                    content: []
                }
            ]
        },{
            id: "table",
            icon: "table", 
            active: false,
            props: [
                {
                    label: "xAxis", 
                    content: []
                },
                {
                    label: "yAxis", 
                    content: []
                }
            ]
        },{
            id: "map",
            icon: "globe", 
            active: false,
            props: [
                {
                    label: "xAxis", 
                    content: []
                },
                {
                    label: "yAxis", 
                    content: []
                }
            ]
        },
    ]

    static $inject = []
    constructor() {

    }
    getStateElementById(id) {        
        return this.state.find(s => s.id == id)?.props
    }
    toggleActive(id) {
        const idx = this.state.findIndex(s => s.id == id)
        if (idx > -1) {
            this.state.forEach(state => {
                state.active = false
            });
            this.state[idx].active = true
            this.activeState = id;
        }
    }
}