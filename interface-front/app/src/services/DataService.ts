import { IScope, IServiceProvider } from "angular";
import Connection from "../../connection";
import { Receiver } from "../../types";


export default class DataService implements Receiver {
    data: Object
    root: IScope

    static $inject = ["$rootScope"]

    constructor($rootScope: IScope) {
        this.root = $rootScope;
        Connection.connectReceiver(this)
    }
    receiveData(data: Object): void {        
        this.data = data        
        this.root.$broadcast("data:update", data)        
    }
}