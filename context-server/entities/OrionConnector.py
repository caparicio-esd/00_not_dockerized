from enum import Enum
from .constants import DEBUG, ORION_ROOT
import requests
import json
from typing import List



class OrionResponses(Enum):
    """
    String representation of connections
    """
    POST_OK = 201
    POST_ALREADY_EXISTS = 422
    GET_OK = 200
    GET_NOT_FOUND = 404
    PATCH_OK = 204


class OrionRoutes(Enum):
    """
    Available routes
    """
    VERSION = ORION_ROOT + "/version"
    ENTITIES = ORION_ROOT + "/v2/entities", 


class OrionConnector:
    """
    Representation of connections to Orion ContextBroker
    """
    def __init__(self) -> None:
        pass

    @staticmethod
    def checkConnection(self) -> bool:
        r = requests.get(OrionRoutes.VERSION)
        
        if DEBUG:
            if r.status_code == 200: print("connection ok")
            else: raise Exception("connection refused from Orion")

    @staticmethod
    def createEntity(entity) -> int:
        """
        Crea entidades en Orion Context Broker
        """
        [url] = OrionRoutes.ENTITIES.value 
        headers = {"content-type" : "application/json"}
        payload = json.dumps(entity)
        r = requests.request("POST", url, headers=headers, data=payload)
        
        if DEBUG:
            if r.status_code == OrionResponses.POST_OK.value: print("entity created")
            elif r.status_code == OrionResponses.POST_ALREADY_EXISTS.value: print("entity already exists")
            else: raise Exception("Something went wrong")

    @staticmethod
    def updateEntity(entity: dict, attrs: List[str]) -> int:
        """
        Actualiza entidades en Context Broker
        """
        url = "{}/{}/attrs".format(OrionRoutes.ENTITIES.value[0], entity["id"])
        headers = {"content-type" : "application/json"}
        payload = json.dumps({key: entity[key] for key in attrs})
        r = requests.request("PATCH", url, headers=headers, data=payload)
        
        if DEBUG:
            if r.status_code == OrionResponses.PATCH_OK.value: print("entity updated")
            else: raise Exception("Something went wrong")

    @staticmethod
    def clearEntities(entity) -> int:
        pass
