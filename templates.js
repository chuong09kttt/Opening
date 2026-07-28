// =========================================
// AVEVA Equipment Studio
// Template Database
// =========================================


// Template variables:
//
// {{NAME}}
// {{PROFILE}}
// {{LENGTH}}
// {{WIDTH}}
// {{HEIGHT}}
// {{RADIUS}}
// {{POS_E}}
// {{POS_N}}
// {{POS_U}}
// {{ORI}}


// =========================================
// Equipment Templates
// =========================================


const AVEVA_TEMPLATES = {


    // -------------------------------------
    // New Extrusion Equipment
    // -------------------------------------

    EXTRUSION:


`NEW EQUIPMENT /{{NAME}}


NEW EXTRUSION /BODY


PROFILE /{{PROFILE}}


LENGTH {{LENGTH}}


WIDTH {{WIDTH}}


HEIGHT {{HEIGHT}}


RADIUS {{RADIUS}}


POS E {{POS_E}} N {{POS_N}} U {{POS_U}}


ORI {{ORI}}`


};



// =========================================
// Get Template
// =========================================


function getTemplate(type){


    if(AVEVA_TEMPLATES[type]){


        return AVEVA_TEMPLATES[type];


    }


    console.error(

        "Template not found:",

        type

    );


    return "";

}
