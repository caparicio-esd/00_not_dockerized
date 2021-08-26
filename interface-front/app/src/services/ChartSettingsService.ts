import { IScope, IServiceProvider, IServiceProviderClass } from "angular";


interface IChartSettingService extends IServiceProvider {
    root: IScope,
    activeState: string,
    activeProps: string[],
    state: any[]
}

/**
 * 
 * 
 * {
                        device: "urn:ngsi-ld:Sensor:sensor01", 
                        prop: "humidity",
                        aggregation: "value", 
                    }
 */




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
                    label: "yAxis",
                    content: [

                    ]
                }
            ]
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        }, {
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
    setProperty(type, property, { device, deviceTag }) {
        const state = this.state.find(s => s.id == type);
        const prop = state?.props?.find(p => p.label == property)
        const contentIdx = prop?.content.findIndex(c => c.device.id == device.id && c.device.prop == property)
        if (contentIdx == -1) {
            prop.content.push({
                device: device,
                prop: deviceTag,
                aggregation: "value"
            });
        }
    }

    removeProperty(type, property, { device, deviceTag }) {        
        const state = this.state.find(s => s.id == type)
        const prop = state?.props?.find(p => p.label == property)
        const contentIdx = prop?.content.findIndex(c => c.device.id == device.id && c.prop == deviceTag)
        prop.content.splice(contentIdx, 1);
    }
}