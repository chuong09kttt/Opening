// =====================================
// AVEVA TXT Generator
// =====================================

let generatedText = "";

//--------------------------------------
// Đọc dữ liệu từ Form
//--------------------------------------

function getFormData() {

    return {

        name: document.getElementById("eqName").value.trim(),

        primitive: document.getElementById("primitive").value,

        profile: document.getElementById("profile").value,

        length: document.getElementById("length").value,

        width: document.getElementById("width").value,

        height: document.getElementById("height").value,

        radius: document.getElementById("radius").value,

        e: document.getElementById("posE").value,

        n: document.getElementById("posN").value,

        u: document.getElementById("posU").value,

        ori: document.getElementById("orientation").value

    };

}



//--------------------------------------
// Thay thế biến trong Template
//--------------------------------------

function replaceAll(template, data) {

    return template

        .replaceAll("{NAME}", data.name)

        .replaceAll("{PROFILE}", data.profile)

        .replaceAll("{LENGTH}", data.length)

        .replaceAll("{WIDTH}", data.width)

        .replaceAll("{HEIGHT}", data.height)

        .replaceAll("{RADIUS}", data.radius)

        .replaceAll("{E}", data.e)

        .replaceAll("{N}", data.n)

        .replaceAll("{U}", data.u)

        .replaceAll("{ORI}", data.ori);

}



//--------------------------------------
// Sinh TXT
//--------------------------------------

function generateTXT() {

    const data = getFormData();

    let template = Templates[data.primitive];

    if (!template) {

        alert("Template not found!");

        return;

    }

    generatedText = replaceAll(template, data);

    document.getElementById("preview").textContent = generatedText;

}



//--------------------------------------
// Download TXT
//--------------------------------------

function downloadTXT() {

    if (generatedText === "") {

        generateTXT();

    }

    const blob = new Blob(

        [generatedText],

        {

            type: "text/plain"

        }

    );



    const a = document.createElement("a");



    a.href = URL.createObjectURL(blob);



    let filename = document.getElementById("eqName").value;



    if (filename === "") {

        filename = "equipment";

    }



    a.download = filename + ".txt";



    document.body.appendChild(a);



    a.click();



    document.body.removeChild(a);

}
