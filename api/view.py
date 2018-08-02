import math
from api import app, dynamodb, table, table_localizacao, table_itau_bikes
from flask import request, jsonify
import json
from boto3.dynamodb.conditions import Key, Attr

#test data
def test_data():
    data = { 
        
        "data": [{
            "name": "BikeShare Faria Lima",
            "latitude": "-23.507861270568863",
            "longitude": "-46.64985685600584",
            "prediction": 4,
            "datetime": "03/06/2018 08:02:10",
            "price": "R$8,00",
            "distanceTime": 2,
            "metrosDistance": 130
        }, {
            "name": "BikeShare Oscar Freire",
            "latitude": "-23.50962995702627",
            "longitude": "-46.65258897913964",
            "prediction": 2,
            "datetime": "03/06/2018 08:02:10",
            "price": "R$8,00",
            "distanceTime": 3,
            "metrosDistance": 250
        }]
    }

    return data

#index user location
@app.route('/api/current-location', methods=['POST', 'GET'])
def index_user():
    responsed = request.get_json()
    data = json.dumps(responsed)
    information = json.loads(data)
    latitude = information['latitude']
    longitude = information['longitude']
    result = []

    get_data = table_itau_bikes.scan(
        FilterExpression=Attr('lat').eq(latitude)  
    )
    data = json.dumps(get_data)
    information = json.loads(data)
    item = information['Items']
    for i in item:
        result.append({
            "latitude": i['lat'],
            "longitude": i['lng']
        })
  
    dados = json.dumps(result)
    dados_json = json.loads(dados)
    
    def calculus(latitude, longitude):
        lat1 = float(latitude)
        lon1 = float(longitude)
        lat2 = float(latitude)
        lon2 = float(longitude)
        radius = 6371

        dlat = math.radians(lat2-lat1)
        dlon = math.radians(lon2-lon1)
        a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
            * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        d = radius * c
        
        print(d)
        return(data)

    calculus(latitude, longitude)
    
    return jsonify(dados_json)
    
    


#create user
@app.route('/api/create-user/', methods=['POST'])
def create_user():

    response = request.get_json()
    data = json.dumps(response)
    information = json.loads(data)
    latitude = information['latitude']
    longitude = information['longitude']
    tokenUser = information['tokenUser']

    table.update_item(
        Key={
            'tokenUser': tokenUser
        },
        UpdateExpression='SET lat = :vall, lng = :valll',
        ExpressionAttributeValues={
            ':vall': latitude,
            ':valll': longitude
        }
    )
    return 'Work'

@app.route('/api/bikes-data/<postosID>', methods=['POST'])
def bikes_data(postosID):
    
    response = request.get_json()
    data = json.dumps(response)
    information = json.loads(data)
    location_postos = postosID
    latitude = information['latitude']
    longitude = information['longitude']
    prediction = information['prediction']
    name_posto = information['name']
    date_time = information['datetime']

    table_itau_bikes.update_item(
        Key = {
            "idPostos": location_postos
        },
        UpdateExpression='SET lat = :val, lng = :vall, prediction = :valud, namePosto = :valid, timeDate = :valll',
        ExpressionAttributeValues={
            ':val': latitude,
            ':vall': longitude,
            ':valud': prediction,
            ':valid': name_posto,
            ':valll': date_time
        }
    )


    return 'work fine'

# @app.route('/api/checkout-run', methods=['GET', 'POST'])
# def checkout_run():
#     responsed = request.get_json()
#     data = json.dumps(responsed)
#     information = json.loads(data)
#     distancia_now = str(information['distanciaPercorrida'])
#     usuario = information['tokenUser']
    
#     response = table.get_item(
#         Key={
#             'tokenUser': usuario
#         }
#     )
    
#     item = response['Item']
#     distancia_percorrida = item['distanciaPercorrida']
#     coin = 0.15

#     func = float(distancia_percorrida) + float(distancia_now)
#     cal = float(func) * coin
#     cal_last_run = float(distancia_now) * coin
#     last_run = str("%.2f" % cal_last_run) 
#     carb_coin = str("%.2f" % cal)
#     func_db = str(func)

    
#     table.update_item(
#         Key={
#             'tokenUser': usuario
#         },
#         UpdateExpression='SET distanciaPercorrida = :vall, carboCoin = :val, lastRun = :valid',
#         ExpressionAttributeValues={
#             ':vall': func_db,
#             ':val': carb_coin,
#             ':valid': last_run
#         }
#     )
    
#     response = table.get_item(
#         Key={
#             'tokenUser': usuario
#         }
#     )
#     item = response['Item']


#     return jsonify(item)
#commit
@app.route('/api/checkout-run', methods=['GET', 'POST'])
def checkout_run():
    dated ={
        "data":{
            "distanciaPercorrida": "8.8",
            "lastRun": "8.8",
            "carbonCoin": "87.2",
            "limit": "150"
        }
        
    }
    return jsonify(dated)


@app.route('/api/get-current-location/', methods=['GET', 'POST'])
def get_current_location():
    data = test_data()
    respost = json.dumps(data)
    return respost