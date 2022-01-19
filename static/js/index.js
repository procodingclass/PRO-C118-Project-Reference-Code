$(document).ready(function(){

    console.log('Document is Ready')

    //  getting the date using Date() object and converting it to a string
    let date = new Date()
    let current_date = date.toDateString()

    //  display the date on the HTML page using JQUERY and JS
    $('#date').text('Date : ' + current_date)

    
    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    //  making a function for AJAX request
    function ajax_request(api_url , input_data){

        $.ajax({

            // type of request
            type : 'POST',

            // url
            url : api_url,

            //  JSON data
            data : JSON.stringify(input_data),

            //  datatype of expected response
            dataType : 'json',

            //  content type
            contentType : 'application/json',

            //  success method
            success : function(result)
            {
                //  extract the sentiment and emoji path
                emotion = result.sentiment
                emoji_url = result.path

                //  update the emoticon and sentiment accordingly
                if (product  ==  'Smartphone'){
                    $('#m_emoji').attr('src' , emoji_url)
                    $('#m_emotion').text(emotion)
                    $('#m_emoji').show()
                    $('#m_emotion').show()
                }

                else if (product  ==  'Digital Camera'){
                    $('#c_emoji').attr('src' , emoji_url)
                    $('#c_emotion').text(emotion)
                    $('#c_emoji').show()
                    $('#c_emotion').show()
                }

                else if (product  ==  'Headphones'){
                    $('#h_emoji').attr('src' , emoji_url)
                    $('#h_emotion').text(emotion)
                    $('#h_emoji').show()
                    $('#h_emotion').show()
                }

                else if (product  ==  'Video Games'){
                    $('#v_emoji').attr('src' , emoji_url)
                    $('#v_emotion').text(emotion)
                    $('#v_emoji').show()
                    $('#v_emotion').show()
                }
            },

            //  error method
            error : function(result)
            {
                console.log(result)
            }

        })

        console.log('ajax request sent')
        
    }


    //  check if Submit button under 'smartphone' is clicked and get the review accordingly
    $('#m_button').click(function(){

        review = $('#m_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Smartphone'
    })

    //  check if Submit button under 'camera' is clicked and get the review accordingly
    $('#c_button').click(function(){

        review = $('#c_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Digital Camera'
    })

    //  check if Submit button under 'headphones' is clicked and get the review accordingly
    $('#h_button').click(function(){

        review = $('#h_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Headphones'
    })

    //  check if Submit button under 'videogame' is clicked and get the review accordingly
    $('#v_button').click(function(){

        review = $('#v_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Video Games'
    })


    //  if SAVE button is clicked, hit a post request on the API

    $('#save_button').click(function(){

        console.log('save button is clicked')

        //  input data 
        input_data = {'date' : date , 'product' : product , 'review' : review , 'sentiment' : emotion}

        //  ajax call
        $.ajax({
            type : 'POST',
            url : '/save',
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                console.log(result)
            },
            error : function(result){
                console.log(result)
            }
        })

        // clearing textboxes
        $('#m_textbox').val('')
        $('#c_textbox').val('')
        $('#h_textbox').val('')
        $('#v_textbox').val('')
    })


})

    