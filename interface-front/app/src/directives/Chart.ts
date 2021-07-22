import angular, { IComponentOptions, IControllerConstructor, IDirective, IDirectiveFactory, Injectable, IScope } from "angular";
import {Chart as ChartJS, registerables} from "chart.js"

ChartJS.register(...registerables)

export default class Chart implements IDirective {
    restrict = "E"
    controllerAs = "$chart"
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
        $scope.$watch("$chart.chartType", (nv, ov, $scope) => this.watchTypeHandler(nv, ov, $scope, $element), true)
        $scope.$watchCollection("$chart.chartData", (nv, ov, $scope) => this.watchDataHandler(nv, ov, $scope, $element), true)
        $scope.$watch("$chart.chartLabels", this.watchOtherHandler, true)
        $scope.$watch("$chart.chartOptions", this.watchOtherHandler, true)
        $scope.$watch("$chart.chartSeries", () => this.watchOtherHandler, true)
        $scope.$watch("$chart.chartColors", this.watchOtherHandler, true)
        $scope.$watch("$chart.chartDatasetOverride", this.watchOtherHandler, true)
    }
    controller: Injectable<IControllerConstructor> = class {
        static $inject = ["$scope", "ChartSettingsService"]
        constructor($scope, ChartSettingsService) {
            $scope.$chartSettings = ChartSettingsService        
        }
    }
    isDataVoid(newVal) {
        return (!newVal || !newVal.length || angular.isArray(newVal[0]) && !newVal[0].length)
    }
    
    watchDataHandler(newVal, oldVal, $scope, $element) {
        // no data -> destroy
        // if (this.isDataVoid(newVal)) {
        //     this.destroyChart()
        //     return;
        // }
        // already chart
        // if (this.scope.chart)
        // console.log($scope);
        // this.createChart($scope.$chartSettings.activeState, $scope, $element)
        if ($scope.$chart.$chart != undefined) {
            this.destroyChart($scope)
        }
        this.createChart("line", $scope, $element)
    }
    watchTypeHandler(newVal, oldVal, $scope, $element) {

    }
    watchOtherHandler(newVal, oldVal, $scope, $element) {

    }
    createChart(type, $scope, $element) {
        const canvas = document.createElement("CANVAS")
        $element[0].appendChild(canvas)        
        const ctx = $element[0].querySelector("canvas").getContext("2d")
        console.log(type);
        

        $scope.$chart.$chart = new ChartJS(ctx, {
            type: type,
            data: {
                labels: [1, 4, 5, 6, 7, 1, 4], 
                datasets: [{
                    label: "hola", 
                    data: [65, 59, 80, 81, 56, 55, 40], 
                    fill: false, 
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1
                }]
            },
            options: {
                onClick: e => {
                    console.log(e);
                    
                }
            }
        })        
    }
    updateChart(values, $scope, $element) {

    }
    destroyChart($scope) {
        $scope.$chart.$chart.destroy()
    }



    // controller: Injectable<IControllerConstructor> = class {
    //     chartDom: HTMLElement
    //     scope

    //     static $inject = ["$scope", "$element", "$attrs"]
    //     constructor($scope: IScope, $element, $attrs) {
    //         this.scope = {$scope, $element, $attrs}
    //         this.chartDom = this.scope.$element[0];

    //         console.log($scope);
    //         console.log(this);
            
            
    //         $scope.$watchCollection("chartData", this.watchDataHandler);
    //         // this.scope.$scope.$watch("chartSeries", this.watchPropsHandler, true);
    //         // this.scope.$scope.$watch("chartLabels", this.watchPropsHandler, true);
    //         // this.scope.$scope.$watch("chartOptions", this.watchPropsHandler, true);
    //         // this.scope.$scope.$watch("chartColors", this.watchPropsHandler, true);
    //         // this.scope.$scope.$watch("chartDatasetOverride", this.watchPropsHandler, true);
    //         // this.scope.$scope.$watch("chartType", this.watchTypeHandler, false); 
    //     }

    //     $onInit() {
            
    //     }
    //     $onChanges() {

    //     }

    //     isDataVoid(newVal) {
    //         return (!newVal || !newVal.length || angular.isArray(newVal[0]) && !newVal[0].length)
    //     }
    
    //     watchDataHandler(newVal, oldVal) {
    //         // no data -> destroy
    //         // if (this.isDataVoid(newVal)) {
    //         //     this.destroyChart()
    //         //     return;
    //         // }
    //         // already chart
    //         // if (this.scope.chart)
    //         console.log("hola");
            
    //     }
    //     watchPropsHandler() {
    
    //     }
    //     watchTypeHandler() {
            
    //     }
    //     destroyChart() {}

    // }

    static factory(): IDirectiveFactory {
        return () => new Chart()
    }
}