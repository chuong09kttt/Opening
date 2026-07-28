// =========================================
// AVEVA Equipment Studio
// Voice Recognition Module
// =========================================



let recognition = null;

let listening = false;



// =========================================
// Initialize Speech Recognition
// =========================================

function initSpeech(){



    if(
        !("webkitSpeechRecognition" in window)
    ){


        alert(
            "Your browser does not support Voice Recognition.\nUse Google Chrome or Edge."
        );


        return;


    }



    recognition =

    new webkitSpeechRecognition();



    recognition.lang =

    APP_CONFIG
    .VOICE
    .LANGUAGE;



    recognition.continuous =

    APP_CONFIG
    .VOICE
    .CONTINUOUS;



    recognition.interimResults =

    APP_CONFIG
    .VOICE
    .INTERIM_RESULTS;





    recognition.onstart = function(){


        listening = true;


        updateVoiceStatus(
            "🎤 Listening..."
        );


    };





    recognition.onend = function(){


        listening = false;


        updateVoiceStatus(
            "Ready"
        );


    };





    recognition.onerror = function(event){


        console.error(
            "Speech error:",
            event.error
        );


        updateVoiceStatus(
            "Voice Error"
        );


    };






    recognition.onresult = function(event){



        let text = "";



        for(
            let i =
            event.resultIndex;

            i <
            event.results.length;

            i++

        ){


            text +=

            event.results[i][0]
            .transcript;


        }





        processVoiceCommand(text);



    };


}





// =========================================
// Start / Stop Voice
// =========================================


function toggleVoice(){



    if(!recognition){


        initSpeech();


    }



    if(listening){


        recognition.stop();


    }

    else{


        recognition.start();


    }


}






// =========================================
// Process Voice Command
// =========================================


function processVoiceCommand(text){



    console.log(
        "Voice:",
        text
    );



    updateVoiceStatus(

        "Heard: "
        +
        text

    );




    text =

    text
    .toLowerCase();





    // ===============================
    // Equipment Name
    // ===============================


    let eq =

    text.match(
        /eq\s*\d+/
    );



    if(eq){


        document
        .getElementById(
            "eqName"
        )
        .value =

        eq[0]
        .toUpperCase()
        .replace(
            " ",
            ""
        );


    }






    // ===============================
    // Length
    // ===============================


    let length =

    extractNumber(
        text,
        [
            "dài",
            "dai",
            "length"
        ]
    );



    if(length){


        document
        .getElementById(
            "length"
        )
        .value =
        length;


    }





    // ===============================
    // Width
    // ===============================


    let width =

    extractNumber(
        text,
        [
            "rộng",
            "rong",
            "width"
        ]
    );



    if(width){


        document
        .getElementById(
            "width"
        )
        .value =
        width;


    }






    // ===============================
    // Height
    // ===============================


    let height =

    extractNumber(
        text,
        [
            "cao",
            "height"
        ]
    );



    if(height){


        document
        .getElementById(
            "height"
        )
        .value =
        height;


    }






    // ===============================
    // Radius
    // ===============================


    let radius =

    extractNumber(
        text,
        [
            "bán kính",
            "ban kinh",
            "radius"
        ]
    );



    if(radius){


        document
        .getElementById(
            "radius"
        )
        .value =
        radius;


    }






    // ===============================
    // Position E N U
    // ===============================


    let pos =

    text.match(

        /e\s*(\d+).*n\s*(\d+).*u\s*(\d+)/

    );



    if(pos){



        document
        .getElementById(
            "posE"
        )
        .value =
        pos[1];



        document
        .getElementById(
            "posN"
        )
        .value =
        pos[2];



        document
        .getElementById(
            "posU"
        )
        .value =
        pos[3];


    }




    // Update TXT Preview

    generateTXT();


}







// =========================================
// Extract Number
// =========================================


function extractNumber(text, keywords){



    for(
        let key of keywords
    ){



        let regex =

        new RegExp(

            key
            +
            "\\s*(\\d+)",

            "i"

        );



        let result =

        text.match(regex);



        if(result){


            return result[1];


        }


    }



    return null;


}






// =========================================
// Update Status
// =========================================


function updateVoiceStatus(msg){



    let box =

    document
    .getElementById(
        "voiceStatus"
    );



    if(box){


        box.innerHTML =
        msg;


    }


}
