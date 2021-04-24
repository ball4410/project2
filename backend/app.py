import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import pandas as pd

from flask import Flask, jsonify
from flask_cors import CORS 


#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://postgres:@localhost:5432/ETL')
connection = engine.connect()

# Base = automap_base()
# Base.prepare(engine, reflect=True)

# Type = Base.classes.college_types


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():

    return (f"Available Routes:</br>"
        f"/majors</br>"
        f"/types</br>"
        f"/find</br>"
        f"/map")

@app.route("/majors")
def majors():

    degrees = pd.read_sql('SELECT major, median_salary FROM degrees', connection)

    data = {
        "x": list(degrees.major),
        "y": list(degrees.median_salary),
        "type": "bar"
    }

    return jsonify(data)


@app.route("/types")
def types():
    Engineering = pd.read_sql("select median_salary from college_types where school_type = 'Engineering'", connection)
    State = pd.read_sql("select median_salary from college_types where school_type = 'State'", connection)
    liberalArts = pd.read_sql("select median_salary from college_types where school_type = 'Liberal Arts'", connection)
    Party = pd.read_sql("select median_salary from college_types where school_type = 'Party'", connection)
    ivyLeague = pd.read_sql("select median_salary from college_types where school_type = 'Ivy League'", connection)

    data = {
        "engineering": list(Engineering.median_salary),
        "state": list(State.median_salary),
        "liberalArts": list(liberalArts.median_salary),
        "party": list(Party.median_salary),
        "ivyLeague":list(ivyLeague.median_salary)
    }

    return jsonify(data)


@app.route("/find")
def find():

    schoolInfo = engine.execute(' SELECT * FROM school_info s left join college_types c on s.school_name = c.school_name')

    # Create a dictionary from the row data and append to a list of all_passengers
    all_types = []
    for record in schoolInfo:
        school_dict = {}
        school_dict["a_schoolName"] = record[0]
        school_dict["b_city"] = record[1]
        school_dict["c_state"] = record[2]
        school_dict["d_rank"] = record[3]
        school_dict["enrollment"] = record[4]
        school_dict["f_tuition"] = record[6]
        school_dict["gpa"] = record[9]
        school_dict["h_act"] = record[10]
        school_dict["i_sat"] = record[11]
        school_dict["j_type"] = record[13]
        all_types.append(school_dict)

    return jsonify(all_types)

@app.route("/map")
def map():

    locations = engine.execute( ' SELECT distinct(s.school_name), LATITUDE, LONGITUDE, enrollment, school_type FROM LOCATIONS L LEFT JOIN SCHOOL_INFO S ON L.CITY = S.CITY left join college_types c on s.school_name = c.school_name')

    all_locations = []

    for record in locations:
        location_dict = {}
        coord = {}
        coord["lat"] = record[1]
        coord["lon"] = record[2]
        location_dict["coords"] = coord
        location_dict["schoolName"] = record[0]
        location_dict["enrollment"] = record[3]
        location_dict["type"] = record[4]
        all_locations.append(location_dict)


    return jsonify(all_locations)


if __name__ == '__main__':
    app.run(debug=True)
