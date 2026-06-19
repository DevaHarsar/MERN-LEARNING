import pandas as pd
import numpy as np
import requests

data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
    'Age': [25, 30, np.nan, 22, 35],
    'Score': [85, 90, 78, np.nan, 95]
}

df = pd.DataFrame(data)

request=requests.get('http://dummyjson.com/products',verify=False)

data=request.json()

for product in data['products']:
    print(product['title'])

print(data['products'][0]['title'])
