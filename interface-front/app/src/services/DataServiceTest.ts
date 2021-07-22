import { IScope, IServiceProvider } from "angular";
import Connection from "../../connection";
import { Receiver } from "../../types";


export default class DataServiceTest {
    data: Object
    root: IScope

    static $inject = ["$rootScope"]

    constructor($rootScope: IScope) {
        this.root = $rootScope;
    }
}