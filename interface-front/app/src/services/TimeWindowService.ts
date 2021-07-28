import { IScope, IServiceProvider, IServiceProviderClass } from "angular";



class WindowBucket {
    timeStampStart: number
    timeStampEnd: number
    bucket: any[] = []
    sealed: boolean

    bind() {
        this.sealed = false
        this.timeStampStart = (new Date()).getTime()
        return this
    }
    unbind() {
        this.sealed = true
        this.timeStampEnd = (new Date()).getTime() 
        return null
    }
    addToBucket(data: any) {
        this.bucket.push(data)
    }
}


export default class TimeWindowService implements IServiceProvider {
    $get: any;
    timeWindow: number = 3000
    currentBucket: WindowBucket = null
    windowBuckets: Array<WindowBucket> = []
    timer: any = null
    $rootScope: IScope = null
    $scope: IScope = null

    static $inject = ["$rootScope"]
    constructor($rootScope: IScope, $scope: IScope) {
        this.$rootScope = $rootScope
        this.loop();
        this.$rootScope.$on("data:update", (ev, data) => {            
            if (this.currentBucket) this.currentBucket.addToBucket(data)  
        })
    }

    loop() {
        clearTimeout(this.timer)
        this.timer = null

        this.currentBucket = new WindowBucket()
        this.windowBuckets.push(this.currentBucket)
        this.currentBucket.bind()

        this.timer = setTimeout(() => {
            this.currentBucket.unbind()
            this.$rootScope.$broadcast("timeWindow:update", this.currentBucket)
            this.loop()
        }, this.timeWindow)
    }
}