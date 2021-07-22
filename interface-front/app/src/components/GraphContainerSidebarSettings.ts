import { IComponentOptions, IControllerConstructor, Injectable, IScope, IServiceProviderClass } from "angular";


export default class GraphContainerSidebarSettings implements IComponentOptions {
    bindings = {

    }
    template = `
        <div class="graph_container_sidebar_settings">
            <div class="graph_main_container_header">
                <div class="icon"><span class="fa fa-cloud"></span></div>
                <div class="label">Chart settings</div>
            </div>
            <div class="graph_container_sidebar_body">
                <div class="graph_chart_selector">
                    <setting-selectable 
                        ng-repeat="state in $ctrl.scope.settings.state" 
                        ng-click="$ctrl.scope.settings.toggleActive(state.id)"
                        icon="state.icon" 
                        active="state.active"
                    />
                </div>
                <div class="dropables">
                    <droppable-group 
                        ng-repeat="prop in $ctrl.scope.settings.getStateElementById($ctrl.scope.settings.activeState)"
                        label="prop.label" 
                        tags="prop.content">
                    </droppable-group>
                </div>
            </div>
        </div> 
    `;
    controllerAs = '$ctrl'
    transclude = true
    restrict = "E"
    controller: Injectable<IControllerConstructor> = class {
        scope: any
        
        static $inject = ["$scope", "ChartSettingsService"]
        constructor($scope, ChartSettingsService: IServiceProviderClass) {
            this.scope = $scope
            this.scope.settings = ChartSettingsService                        
        }
        $onChanges(): void{
                        
        }
        $onInit(): void {
    
        }
        $doCheck(): void{

        }
        $onDestroy(): void {

        }
        $postLink(): void {

        }
    }
}