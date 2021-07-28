import { IScope, IServiceProvider, IServiceProviderClass } from "angular";


interface IChartSettingService extends IServiceProvider {
    root: IScope, 
    activeState: string, 
    activeProps: string[],
    state: any[]
}

export default class ChartSettingsService implements IChartSettingService {
    root: IScope
    activeState: string = "line"
    activeProps
    state: any = [
        {
            id: "line",
            icon: "line-chart", 
            active: true,
            multiProp: "yAxis",
            props: [
                {
                    label: "xAxis", 
                    content: [{
                        device: "urn:ngsi-ld:Sensor:sensor01", 
                        prop: "updated",
                        aggregation: "value"
                    }]
                },
                {
                    label: "yAxis", 
                    content: [{
                        device: "urn:ngsi-ld:Sensor:sensor01", 
                        prop: "humidity",
                        aggregation: "value"
                    },{
                        device: "urn:ngsi-ld:Sensor:sensor01", 
                        prop: "temperature",
                        aggregation: "value"
                    }, {
                        device: "urn:ngsi-ld:Sensor:sensor02", 
                        prop: "temperature",
                        aggregation: "value"
                    }, {
                        device: "urn:ngsi-ld:Sensor:sensor02", 
                        prop: "humidity",
                        aggregation: "value"
                    }
                ]
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
    $get: any;
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