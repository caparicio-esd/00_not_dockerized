import threading
from typing import List
from datetime import datetime
from numpy import random as np_random
from .constants import DEBUG
from .OrionConnector import OrionConnector




class Sensor: 
    """
    Faking sensor from temperatures, humidity, position, 
    times, etc...
    """
    name: str = None
    temperature: float = 0
    temperatureCenter: float = 20
    temperatureRadius: float = 0.25
    debug: bool = False
    
    humidity: float = 0
    humidityCenter: float = 30
    humidityRadius: float = 0.5

    geoLocation: List[float] = [0., 0.]
    geoLocationCenter: List[float] = [-3.3, 40.2]
    geoLocationRadius: float = 0.4

    timer: threading.Timer = None
    timerSeconds: int = 1
    timerIsRunning: bool = False
    
    def __init__(self, name, debug=False) -> None:
        self.debug = debug
        self.name = name
        self.geoLocation[0] = self.geoLocationCenter[0] + np_random.normal(0, self.geoLocationRadius)
        self.geoLocation[1] = self.geoLocationCenter[1] + np_random.normal(0, self.geoLocationRadius)
        self._run(first_run=True)

    def _init_timer(self) -> None:
        if self.timerIsRunning: self.timer.cancel()
        self.timer = threading.Timer(self.timerSeconds, self._run)
        self.timer.start()
        self.timerIsRunning = True

    def _run(self, first_run = False) -> None:
        self.temperature = np_random.normal(self.temperatureCenter, self.temperatureRadius)
        self.humidity = np_random.normal(self.humidityCenter, self.humidityRadius)
        if (self.debug or DEBUG): print(self)
        if (first_run): OrionConnector.createEntity(self.orion_format())
        else: OrionConnector.updateEntity(self.orion_format(), ["temperature", "humidity"])
        self._init_timer()

    def orion_format(self) -> dict:
        """
        Orion representation of Sensor
        """
        return {
            "id": "urn:ngsi-ld:{}:{}".format(self.__class__.__name__, self.name), 
            "type": self.__class__.__name__,
            "temperature": {
                "type": "Number", 
                "value": self.temperature
            }, 
            "humidity": {
                "type": "Number", 
                "value": self.humidity               
            }, 
            "location": {
                "type": "geo:point", 
                "value": "{}, {}".format(self.geoLocation[0], self.geoLocation[1])
            }, 
            "updated": {
                "type": "DateTime", 
                "value": datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
            }
        }

    def __str__(self) -> str:
        """
        Debugging representation of Sensor
        """
        return "\n\
Sensor {}\n\
    Geolocation: {},\n\
    Temperature: {},\n\
    Humidity: {},\n\
    Time: {}\n\
        ".format(
            self.name,
            "{}, {}".format(self.geoLocation[0], self.geoLocation[1]),
            self.temperature, 
            self.humidity,
            datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
        ).lstrip()
