var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var globalCM;
var globalEditor;

function showPreview(inputValue) {
    // console.log(inputValue)
    var htmlCode = inputValue;
    // var cssCode = "";
    // var jsCode = "" + document.getElementById("jsCode").value + "";
    var frame = document.getElementById("preview-window").contentWindow.document;
    frame.open();
    frame.write(htmlCode);
    frame.close();
}

window.addEventListener("load", function () {
    var editor = CodeMirror.fromTextArea
        (document.getElementById("editor"), {
            lineNumbers: true,
            mode: "xml",
            theme: "dracula",
            autoCloseTags: true,
            onChange: function (cm) {
                mySecondTextArea.value = cm.getValue();
            },
        });
    editor.setSize("100%", "100%")
    editor.on('change', function (cMirror) {
        showPreview(cMirror.getValue());
        globalCM = cMirror.getValue()
    }
    )
    globalEditor = editor;
})

function switchTab(tab) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tab).style.display = "block";
}

var originalHTML = document.getElementById('placeholders-table').innerHTML
function addPlaceholders(placeholders) {// console.log("placeholders", placeholders)
    var table = document.getElementById('placeholders-table')

    table.innerHTML = originalHTML
    for (item in placeholders) {
        var newRow = table.insertRow(table.rows.length - 1);
        var newCell = newRow.insertCell(newRow.cells.length);
        var newCell2 = newRow.insertCell(newRow.cells.length);
        newCell.innerHTML = placeholders[item];
        newCell2.innerHTML = "<div contenteditable></div>";
    }
}

function generateTable() {
    var allPlaceholders = globalCM.match(/\{(.+?)\}/g)
    var placeholders = [];
    $.each(allPlaceholders, function (i, el) {
        if ($.inArray(el, placeholders) === -1) placeholders.push(el);
    });
    // var placeholders = [...new Set(allPlaceholders)]
    addPlaceholders(placeholders)
}

function replaceValues() {
    var table = document.getElementById('placeholders-table');

    var find_and_replace = [];
    var find;
    var replace;
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 0; i < table.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = table.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (var j = 0; j < objCells.length; j++) {
            if (j % 2) {
                let value = objCells.item(j).innerHTML.match(/(?<=>)(.*)(?=<)/)[0]
                if (value != '') {
                    replace = value
                }
                else {

                    replace = objCells.item(j - 1).innerHTML
                    // replace = ''
                }
            }
            else {
                find = objCells.item(j).innerHTML
            }

            // info.innerHTML = info.innerHTML + ' ' + objCells.item(j).innerHTML;
        }
        find_and_replace.push({
            key: find,
            value: replace
        });
    }
    for (i in find_and_replace) {
        // console.log(find_and_replace[1].key, find_and_replace[i].value)
        globalCM = globalCM.replaceAll(find_and_replace[i].key, find_and_replace[i].value)
    }
    // console.log(find_and_replace)
    setHTMLCode(globalCM, false)
}

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList['0']);
    readTemplate(fileList['0'])
});

function readTemplate(file) {
    // Check if the file is an image.
    if (file.type && file.type.indexOf('html') === -1) {
        console.log('File is not an html.', file.type, file);
        return;
    }
    
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        setHTMLCode(event.target.result, true);
        // console.log(event.target.result);
    });
    reader.readAsText(file);
}

function setHTMLCode(code, buildTable) {
    console.log("code:", code)

    // var editor = CodeMirror.fromTextArea(document.getElementById("editor"));
    globalEditor.getDoc().setValue(code);

    if (buildTable) {
        generateTable();
    }
    // editor.value=code;
}


watch(document.getElementById('placeholders-table'), replaceValues);