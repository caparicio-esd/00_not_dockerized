import angular, { IAugmentedJQuery, IComponentOptions, IController, IControllerConstructor, IDirective, IDirectiveFactory, Injectable, IScope, IServiceProvider } from "angular";
import { Chart as ChartJS, registerables } from "chart.js"
import { RealTimeScale, StreamingPlugin } from 'chartjs-plugin-streaming';
import 'chartjs-adapter-moment';

ChartJS.register(...registerables)
ChartJS.register(RealTimeScale);
ChartJS.register(StreamingPlugin);


interface IChartScope extends IScope {
    $chart: ChartJS,
    $chartSettings: any,
    $controller: IController
}

export default class Chart implements IDirective {
    restrict = "E"
    controllerAs = "$controller"
    bindToController = true
    scope = {
        chartGetColor: "=?",
        chartType: "=",
        chartData: "=?",
        chartLabels: "=?",
        chartOptions: "=?",
        chartSeries: "=?",
        chartColors: "=?",
        chartClick: "=?",
        chartHover: "=?",
        chartDatasetOverride: "=?",
    }

    link($scope, $element, $attrs, $controller) {
        $scope.$watch("$controller.chartType", (nv, ov, $scope) => this.watchTypeHandler(nv, ov, $scope, $element), true)
        $scope.$watch("$controller.chartData", (nv, ov, $scope) => this.watchDataHandler(nv, ov, $scope, $element), true)
        $scope.$watch("$controller.chartLabels", this.watchOtherHandler, true)
        $scope.$watch("$controller.chartOptions", this.watchOtherHandler, true)
        $scope.$watch("$controller.chartSeries", () => this.watchOtherHandler, true)
        $scope.$watch("$controller.chartColors", this.watchOtherHandler, true)
        $scope.$watch("$controller.chartDatasetOverride", this.watchOtherHandler, true)
    }

    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$rootScope", "$scope", "ChartSettingsService"]
        constructor($rootScope, $scope, ChartSettingsService: IServiceProvider) {
            $scope.$chartSettings = ChartSettingsService
        }
    }

    /**
     * 
     * @param {any[]} newVal 
     * @returns {boolean}
     */
    isDataVoid(newVal: any[]): boolean {
        return (!newVal || !newVal.length || angular.isArray(newVal[0]) && !newVal[0].length)
    }

    /**
     * 
     * @param {any[]} newVal 
     * @param {any[]} oldVal 
     * @returns {boolean}
     */
    canUpdateChart(newVal: any[], oldVal: any[]): boolean {
        console.log(newVal);



        const sum = (carry, val) => carry + val
        if (newVal && oldVal && newVal.length && oldVal.length) {
            return Array.isArray(newVal[0])
                ? newVal.length === oldVal.length &&
                newVal.every(function (element, index) {
                    return element.length === oldVal[index].length;
                })
                : oldVal.reduce(sum, 0) > 0
                    ? newVal.length === oldVal.length
                    : false;
        }
        return false;
    }

    /**
     * 
     * @param newVal 
     * @param oldVal 
     * @param $scope 
     * @param $element 
     * @returns 
     */
    watchDataHandler(newVal: any[], oldVal: any[], $scope: IChartScope, $element: IAugmentedJQuery) {

        // case no data -> destroy chart
        if (this.isDataVoid(newVal)) {
            this.destroyChart($scope)
            return
        }
        // case no type -> destroy chart
        if (!$scope.$controller.chartType) {
            this.destroyChart($scope)
            return
        }
        // case there's a chart already
        if ($scope.$chart) {
            this.updateChart(newVal, $scope, $element)
            return
        }

        this.createChart($scope.$chartSettings.activeState, $scope, $element)
    }

    watchTypeHandler(newVal, oldVal, $scope, $element) {

    }
    watchOtherHandler(newVal, oldVal, $scope, $element) {

    }

    createChart(type, $scope, $element) {
        const canvas = document.createElement("CANVAS")
        $element[0].appendChild(canvas)
        const ctx = $element[0].querySelector("canvas").getContext("2d")


        $scope.$chart = new ChartJS(ctx, {
            type: type,
            data: {
                labels: [],
                datasets: []
            },
            options: {
                parsing: {
                    xAxisKey: 'x',
                    yAxisKey: 'y'
                },
                onClick: e => {
                    console.log(e);

                }, 
                scales: {
                    x: {
                        type: 'realtime',
                        realtime: {
                            duration: 20000, 
                          }
                    }
                }
            },
        })
    }

    updateChart(values, $scope, $element) {

        const chart = $scope.$chart;
        const data = $scope.$controller.chartData.map(d => ({ ...d.data[0] }));
        const lastData = data[data.length - 1];

        // opts
        const activeState = $scope.$chartSettings.state.findIndex(s => s.id == $scope.$chartSettings.activeState)
        const multiProp = $scope.$chartSettings.state[activeState].multiProp
        const dataSetsInSetting = $scope.$chartSettings.state[activeState].props.find(prop => prop.label == multiProp).content

        if ($scope.$chart.data.datasets.findIndex(ds => ds.label == lastData.id) < 0) {
            if (dataSetsInSetting.filter(dsetting => dsetting.device == lastData.id).length > 0) {
                $scope.$chart.data.datasets.push(({
                    label: lastData.id,
                    data: [],
                    tension: 0.5
                }))
            }
        }

        $scope.$chart.data.datasets.find(ds => ds.label == lastData.id)?.data?.push({
            x: lastData.updated.value,
            y: lastData.humidity.value
        })

        $scope.$chart?.update("none")
        $scope.$emit("chart-update", $scope.$chart)
    }

    destroyChart($scope: IChartScope) {
        $scope.$chart?.destroy()
    }



    static factory(): IDirectiveFactory {
        return () => new Chart()
    }
}