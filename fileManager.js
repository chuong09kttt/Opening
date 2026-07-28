// =========================================
// AVEVA Equipment Studio
// File Manager
// File System Access API
// =========================================


let outputDirectory = null;

let outputFileName = 
"Equipment.txt";




// =========================================
// Select Output Folder
// =========================================

async function selectOutputFolder(){


    try{


        // Chrome / Edge API

        outputDirectory =

        await window
        .showDirectoryPicker();



        localStorage.setItem(

            APP_CONFIG
            .FILE_SYSTEM
            .SAVE_FOLDER_KEY,

            "selected"

        );



        updateFolderStatus();



        return true;


    }


    catch(error){


        console.log(
            "Folder selection cancelled"
        );


        return false;


    }

}




// =========================================
// Display Folder Status
// =========================================

function updateFolderStatus(){


    let box =

    document
    .getElementById(
        "folderPath"
    );



    if(box){


        if(outputDirectory){


            box.innerHTML =

            "📂 "
            +
            outputDirectory.name;


        }

        else{


            box.innerHTML =

            "No Folder Selected";


        }


    }

}




// =========================================
// Save TXT directly
// =========================================

async function saveTXTFile(text){



    if(!text){


        alert(
            "No TXT data!"
        );


        return;


    }





    // =================================
    // If folder selected
    // =================================


    if(outputDirectory){


        try{


            let fileHandle =

            await outputDirectory
            .getFileHandle(

                outputFileName,

                {

                    create:true

                }

            );



            let writable =

            await fileHandle
            .createWritable();



            await writable
            .write(text);



            await writable
            .close();



            showSaveMessage(
                "Saved: "
                +
                outputFileName
            );



            return;


        }


        catch(error){


            console.error(
                error
            );


        }


    }





    // =================================
    // Fallback Download
    // =================================


    downloadFallback(text);


}





// =========================================
// Browser fallback download
// =========================================

function downloadFallback(text){



    let blob =

    new Blob(

        [text],

        {

            type:
            "text/plain"

        }

    );



    let link =

    document
    .createElement(
        "a"
    );



    link.href =

    URL
    .createObjectURL(
        blob
    );



    link.download =

    outputFileName;



    link.click();



    showSaveMessage(
        "Downloaded: "
        +
        outputFileName
    );


}





// =========================================
// Status Message
// =========================================

function showSaveMessage(message){



    let status =

    document
    .getElementById(
        "voiceStatus"
    );



    if(status){


        status.innerHTML =
        "✔ "
        +
        message;


    }


}
