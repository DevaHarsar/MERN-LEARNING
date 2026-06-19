from sklearn.datasets import load_iris
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    precision_score,
    recall_score,
    f1_score
)
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
import pickle



model = RandomForestClassifier()


iris=load_iris()

df=pd.DataFrame(iris.data,columns=iris.feature_names)
df['species']=iris.target


print(df.head())
print(df.shape)
print(df.isnull().sum())
print(df["species"].value_counts())

sns.pairplot(df, hue="species")
plt.show()


x=iris.data
y=iris.target

x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=1)

model.fit(x_train,y_train)
y_pred = model.predict(x_test)

cm = confusion_matrix(y_test, y_pred)

print(cm)


accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1 Score:", f1)

print(classification_report(y_test, y_pred))


sample = [[5.1, 3.5, 1.4, 0.2]]
prediction = model.predict(sample)
print("Prediction:", iris.target_names[prediction][0])

with open("iris_model.pkl", "wb") as file:
    pickle.dump(model, file)

print("Model saved successfully!")

with open("iris_model.pkl", "rb") as file:
    loaded_model = pickle.load(file)

prediction = loaded_model.predict([[5.1, 3.5, 1.4, 0.2]])

print(
    "Loaded Model Prediction:",
    iris.target_names[prediction][0]
)






