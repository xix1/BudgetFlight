from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
app = Flask(__name__)
CORS(app)

@app.route('/getCityID', methods=['GET'])
def get_city_id():
    query_params = request.args
    api_key = '29edf732b0mshf1361fd6167a4f6p16fde1jsn36fbfe023f6d'
    headers = {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
    }
    url = 'https://skyscanner50.p.rapidapi.com/api/v1/searchAirport'
    
    response = requests.get(url, headers=headers, params=query_params)
    json_response = response.json()
    city_id = json_response["data"][0]["CityId"]
    return jsonify({"CityId": city_id})

@app.route('/searchFlightEverywhere', methods=['GET'])
def search_flight_everywhere():
    query_params = request.args
    api_key = '29edf732b0mshf1361fd6167a4f6p16fde1jsn36fbfe023f6d'
    headers = {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
    }
    url = 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhere'
    
    response = requests.get(url, headers=headers, params=query_params)

    return jsonify(response.json())

@app.route('/searchFlightEverywhereDetails', methods=['GET'])
def search_flight_everywhere_details():
    query_params = request.args
    api_key = '29edf732b0mshf1361fd6167a4f6p16fde1jsn36fbfe023f6d'
    headers = {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
    }
    url = 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlightEverywhereDetails'
    
    response = requests.get(url, headers=headers, params=query_params)

    return jsonify(response.json())

@app.route('/searchFlights', methods=['GET'])
def search_flights():
    query_params = request.args
    api_key = '29edf732b0mshf1361fd6167a4f6p16fde1jsn36fbfe023f6d'
    headers = {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
    }
    url = 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights'
    
    response = requests.get(url, headers=headers, params=query_params)

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)