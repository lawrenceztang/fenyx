# -*- coding: utf-8 -*-
"""
Created on Wed May 11 20:19:22 2022

@author: Will
"""

import requests
import json
import pandas as pd
import sqlite3

def scrape(url):
    r = requests.get(url)
    json_data = r.text[len('var data='): -1]
    data = json.loads(json_data)
    return data

def to_sql(data):
    df = pd.DataFrame(data['courses'])
    conn = sqlite3.connect("courses.db")
    df.to_sql("courses", conn)
    
data = scrape("https://course-info.cs.uchicago.edu/data/course-data.js")
to_sql(data)

