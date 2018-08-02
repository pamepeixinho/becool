from flask import Flask
from flask_cors import CORS
import boto3

app = Flask(__name__, instance_relative_config=True)
CORS(app)
app.config['DEBUG'] = True
app.config['THREADED'] = True

dynamodb = boto3.resource('dynamodb', aws_access_key_id='AKIAJJOTQBW7ODCA7A3Q', aws_secret_access_key='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',region_name='us-west-2')
table = dynamodb.Table('usuarios-dev')
table_localizacao = dynamodb.Table('localizacao-dev')
table_itau_bikes = dynamodb.Table('itau-bikes-dev')

from api import view, distance
