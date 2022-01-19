from flask import Flask , render_template , request , jsonify
import prediction

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# api listening to POST requests and predicting sentiments
@app.route('/predict' , methods = ['POST'])
def predict():

    response = ""
    review = request.json.get('customer_review')
    if not review:
        response = {'status' : 'error',
                    'message' : 'Empty Review'}
    
    else:

        # calling the predict method from prediction.py module
        sentiment , path = prediction.predict(review)
        response = {'status' : 'success',
                    'message' : 'Got it',
                    'sentiment' : sentiment,
                    'path' : path}

    return jsonify(response)


# Creating an API to save the review, user clicks on the Save button
@app.route('/save' , methods = ['POST'])
def save():

    # extracting date , product name , review , sentiment associated from the JSOn data
    date = request.json.get('date')
    product = request.json.get('product')
    review = request.json.get('review')
    sentiment = request.json.get('sentiment')

    # creating a final variable seperated by commas
    data_entry = date + "," + product + "," + review + "," + sentiment

    # open the file in the 'append' mode
    f = open('./static/assets/datafiles/data_entry.csv' , 'a')

    # Log the data in the file
    f.write(data_entry + '\n')

    # return a success message
    return jsonify({'status' : 'success' , 
                    'message' : 'Data Logged'})


if __name__  ==  "__main__":
    app.run(debug = True)