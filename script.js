// =========================================
// AVEVA Equipment Studio
// Main Application Controller
// =========================================



// =========================================
// Application Start
// =========================================


window.addEventListener(
    "DOMContentLoaded",
    function(){


        console.log(
            "AVEVA Equipment Studio Started"
        );



        loadUserSettings();


        initSpeech();


        bindEvents();


        generateTXT();


    }
);





// =========================================
// Bind Button Events
// =========================================


function bindEvents(){



    // Generate Button

    document
    .getElementById(
        "generateBtn"
    )
    .addEventListener(

        "click",

        function(){


            generateTXT();


        }

    );






    // Save Button

    document
    .getElementById(
        "saveBtn"
    )
    .addEventListener(

        "click",

        async function(){


            let text =
            getCurrentTXT();



            await saveTXTFile(
                text
            );


        }

    );






    // Select Folder

    document
    .getElementById(
        "selectFolder"
    )
    .addEventListener(

        "click",

        async function(){


            await selectOutputFolder();


        }

    );






    // Voice Button

    document
    .getElementById(
        "voiceBtn"
    )
    .addEventListener(

        "click",

        function(){


            toggleVoice();


        }

    );






    // Auto Preview

    let inputs =

    document.querySelectorAll(

        "input, select"

    );



    inputs.forEach(

        element => {



            element.addEventListener(

                "input",

                function(){


                    generateTXT();


                }

            );



            element.addEventListener(

                "change",

                function(){


                    generateTXT();


                }

            );


        }

    );



}







// =========================================
// Load Previous Settings
// =========================================


function loadUserSettings(){



    let data =

    loadSettings();




    if(!data){

        return;

    }





    setValue(
        "eqName",
        data.NAME
    );



    setValue(
        "length",
        data.LENGTH
    );



    setValue(
        "width",
        data.WIDTH
    );



    setValue(
        "height",
        data.HEIGHT
    );



    setValue(
        "radius",
        data.RADIUS
    );



    setValue(
        "posE",
        data.POS_E
    );



    setValue(
        "posN",
        data.POS_N
    );



    setValue(
        "posU",
        data.POS_U
    );



    setValue(
        "orientation",
        data.ORI
    );


}





// =========================================
// Safe Set Value
// =========================================


function setValue(id,value){



    let element =

    document.getElementById(id);



    if(element &&
       value !== undefined){


        element.value=value;


    }


}





// =========================================
// Keyboard Shortcut
// =========================================


document.addEventListener(

    "keydown",

    function(e){



        // CTRL + S

        if(

            e.ctrlKey &&
            e.key==="s"

        ){


            e.preventDefault();


            saveTXTFile(
                getCurrentTXT()
            );


        }



        // F5 Generate

        if(
            e.key==="F5"
        ){


            e.preventDefault();


            generateTXT();


        }



    }

);
