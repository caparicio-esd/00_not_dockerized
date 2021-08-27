import { IComponentOptions, IControllerConstructor, IDirective, IDirectiveController, Injectable, IScope } from "angular";


export default class GraphContainerSidebarDevices implements IDirective {
    bindings = {}
    restrict = "E"
    bindToController = true;
    controllerAs = '$ctrl'
    transclude = true
    template = `
        <div class="graph_container_sidebar_devices" ng-transclude></div>
    `;
}