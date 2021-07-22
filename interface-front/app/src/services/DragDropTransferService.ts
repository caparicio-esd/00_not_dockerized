import { IServiceProviderClass } from "angular";


export default class DragDropTransferService {
    droppingObject
    draggingObject

    static $inject = ["ChartSettingsService"]
    constructor(ChartSettingsService: IServiceProviderClass) {
        // console.log(ChartSettingsService);        
    }
}