// =========================================
// AVEVA Equipment Studio
// Configuration File
// =========================================


const APP_CONFIG = {


    // Application Information

    APP_NAME: "AVEVA Equipment Studio",

    VERSION: "1.0.0",


    // Default Equipment

    DEFAULT_EQUIPMENT:

    {

        NAME: "EQ001",

        PROFILE: "ROUNDRECT",

        LENGTH: 2000,

        WIDTH: 1000,

        HEIGHT: 1500,

        RADIUS: 100,


        POSITION:

        {

            E: 1000,

            N: 2000,

            U: 500

        },


        ORIENTATION:

        "Y IS N AND Z IS U"

    },



    // Output File

    DEFAULT_FILENAME:

    "Equipment.txt",



    // Voice Configuration

    VOICE:

    {

        LANGUAGE:

        "vi-VN",


        // Speech recognition

        CONTINUOUS:

        false,


        INTERIM_RESULTS:

        true

    },



    // File System Access

    FILE_SYSTEM:

    {

        ENABLED:

        true,


        SAVE_FOLDER_KEY:

        "AVEVA_OUTPUT_FOLDER"

    },



    // Local Storage

    STORAGE:

    {

        SETTINGS_KEY:

        "AVEVA_EQUIPMENT_SETTINGS",


        LAST_FILE_KEY:

        "AVEVA_LAST_FILE"

    }



};




// =========================================
// Load Saved Settings
// =========================================

function loadSettings(){


    let data =

    localStorage.getItem(

        APP_CONFIG.STORAGE.SETTINGS_KEY

    );


    if(data){


        try{


            return JSON.parse(data);


        }

        catch(e){


            console.error(

                "Settings load error",

                e

            );


        }


    }


    return APP_CONFIG.DEFAULT_EQUIPMENT;


}



// =========================================
// Save Settings
// =========================================

function saveSettings(data){


    localStorage.setItem(

        APP_CONFIG.STORAGE.SETTINGS_KEY,

        JSON.stringify(data)

    );


}
