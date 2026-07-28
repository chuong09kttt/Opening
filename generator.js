// =========================================
// AVEVA Equipment Studio
// TXT Generator Engine
// =========================================



let currentTXT = "";



// =========================================
// Read User Input
// =========================================

function getEquipmentData(){


    return {


        NAME:

        document
        .getElementById("eqName")
        .value
        .trim(),



        PROFILE:

        document
        .getElementById("profile")
        .value,



        LENGTH:

        document
        .getElementById("length")
        .value,



        WIDTH:

        document
        .getElementById("width")
        .value,



        HEIGHT:

        document
        .getElementById("height")
        .value,



        RADIUS:

        document
        .getElementById("radius")
        .value,



        POS_E:

        document
        .getElementById("posE")
        .value,



        POS_N:

        document
        .getElementById("posN")
        .value,



        POS_U:

        document
        .getElementById("posU")
        .value,



        ORI:

        document
        .getElementById("orientation")
        .value


    };


}




// =========================================
// Validate Data
// =========================================


function validateEquipment(data){


    if(!data.NAME){


        alert(
            "Equipment name is required!"
        );


        return false;


    }



    if(!data.LENGTH ||
       !data.WIDTH ||
       !data.HEIGHT){


        alert(
            "Dimension is missing!"
        );


        return false;


    }


    return true;


}




// =========================================
// Replace Template Variables
// =========================================


function replaceVariables(template,data){


    let result = template;



    Object.keys(data)
    .forEach(key=>{


        let tag =
        "{{"+key+"}}";


        result =
        result.replaceAll(
            tag,
            data[key]
        );


    });



    return result;


}




// =========================================
// Generate TXT
// =========================================


function generateTXT(){


    let data =
    getEquipmentData();



    if(!validateEquipment(data)){


        return "";


    }



    let template =

    getTemplate(
        "EXTRUSION"
    );



    currentTXT =

    replaceVariables(
        template,
        data
    );



    updatePreview();



    saveSettings(data);



    return currentTXT;


}





// =========================================
// Update Preview Window
// =========================================


function updatePreview(){


    let box =

    document
    .getElementById(
        "preview"
    );



    if(box){


        box.textContent =
        currentTXT;


    }


}





// =========================================
// Get Generated Text
// =========================================


function getCurrentTXT(){


    return currentTXT;


}
