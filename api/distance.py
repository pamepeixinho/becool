import math
import json

def calculus(latitude, longitude):
        lat1 = latitude
        lon1 = longitude
        lat2 = latitude
        lon2 = longitude
        radius = 6371

        dlat = math.radians(lat2-lat1)
        dlon = math.radians(lon2-lon1)
        a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
            * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        d = radius * c

        print(d)

def geolocation():

    data = { 
        
        "data": [{
            "name": "Itau-Bike TOTVS",
            "latitude": "-23.507861270568863",
            "longitude": "-46.64985685600584",
            "prediction": 4,
            "datetime": "03/06/2018 08:02:10",
            "price": "R$8,00",
            "distanceTime": 2,
            "metrosDistance": 130
        }, {
            "name": "Itau-Bike Santanta",
            "latitude": "-23.50962995702627",
            "longitude": "-46.65258897913964",
            "prediction": 2,
            "datetime": "03/06/2018 08:02:10",
            "price": "R$8,00",
            "distanceTime": 3,
            "metrosDistance": 250
        }]
    }

    respost = json.dumps(data)
    return respost