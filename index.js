var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


var globalHTMLEditor;
var globalHTML;
var globalReplacedHTML;
var globalCSS;
var globalJS;

var buildTableButton = document.getElementById('buildPlaceholdersTableButton')

// Show html preview in the left
function showPreview() {
    var htmlCode = globalReplacedHTML;
    var cssCode = "<style>" + globalCSS + "</style>";
    var jsCode = "<scr" + "ipt>" + globalJS + "</scr" + "ipt>";
    var frame = document.getElementById("preview-window").contentWindow.document;
    frame.open();
    frame.write(htmlCode + cssCode + jsCode);
    frame.close();
    // globalReplacedHTML = globalHTML;
}

// Load COdeMirror textareas
window.addEventListener("load", function () {
    // Code mirror for HTML
    var editorHTML = CodeMirror.fromTextArea
        (document.getElementById("editor"), {
            mode: "xml",
            theme: "dracula",
            autoCloseTags: true,
            autoCloseBrackets: true,
        });
    globalHTMLEditor = editorHTML;

    // Code mirror for CSS
    var editorCSS = CodeMirror.fromTextArea
        (document.getElementById('editorCSS'), {
            mode: "css",
            theme: "dracula",
            autoCloseTags: true,
            autoCloseBrackets: true,
        });

    // Code mirror for JS
    var editorJS = CodeMirror.fromTextArea
        (document.getElementById('editorJS'), {
            mode: "javascript",
            theme: "dracula",
            autoCloseTags: true,
            autoCloseBrackets: true,
        });

    editorHTML.setSize(null, "100%");
    editorCSS.setSize(null, "100%");
    editorJS.setSize(null, "100%");

    // When you edit, the preview is updated with the new value
    editorHTML.on('change', function (cMirror) {
        globalHTML = cMirror.getValue();
        globalReplacedHTML = globalHTML;
        replaceValues(false);
        // showPreview();
    })
    editorCSS.on('change', function (cMirror) {
        globalCSS = cMirror.getValue();
        replaceValues(false);

        // showPreview();
    })
    editorJS.on('change', function (cMirror) {
        globalJS = cMirror.getValue();
        replaceValues(false);

        // showPreview();
    })
})

// Switch Code/Placeholders/Template tab
function switchTab(tab) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tab).style.display = "block";
}

// Switch HTML/CSS/JS tabs
function switchCodeTab(codeTab) {
    var i;
    var x = document.getElementsByClassName("codeTab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(codeTab + "-tab").style.display = "block";
}


var originalHTML = document.getElementById('placeholders-table').innerHTML
function addPlaceholders(placeholders) {
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

// generate the palceholders table
function generateTable() {
    // match everything that has curly brackets around
    var allPlaceholders = globalHTML.match(/\{(.+?)\}/g)
    var placeholders = [];
    $.each(allPlaceholders, function (i, el) {
        if ($.inArray(el, placeholders) === -1) placeholders.push(el);
    });
    addPlaceholders(placeholders)
    buildTableButton.disabled = true;

}

// Replace all the placeholders for it's corresponding value
function replaceValues(disableBuildTable) {
    buildTableButton.disabled = false;
    var table = document.getElementById('placeholders-table');

    var find_and_replace = [];
    var find;
    var replace;
    for (i = 0; i < table.rows.length; i++) {

        var objCells = table.rows.item(i).cells;

        for (var j = 0; j < objCells.length; j++) {
            if (j % 2) {
                let value = objCells.item(j).innerHTML.match(/(?<=>)(.*)(?=<)/)[0]
                if (value != '' && value != '<br>') {
                    replace = value
                }
                else {
                    // If not commented, the placeholder will remain if there is no value to replace it
                    replace = objCells.item(j - 1).innerHTML

                    // If not commented, the placeholder will disappear if there is no value to replace it
                    // replace = ''
                }
            }
            else {
                find = objCells.item(j).innerHTML
            }

        }
        find_and_replace.push({
            key: find,
            value: replace
        });
    }
    let newHTML = globalHTML;
    for (i in find_and_replace) {
        newHTML = newHTML.replaceAll(find_and_replace[i].key, find_and_replace[i].value)
    }
    globalReplacedHTML = newHTML
    showPreview();
    if (disableBuildTable) {
        buildTableButton.disabled = true;
    }
}

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    readTemplate(fileList['0'])
});

function readTemplate(file) {
    if (file.type && file.type.indexOf('html') === -1) {
        alert('File is not an html.', file.type, file);
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        setHTMLCode(event.target.result, true);
    });
    reader.readAsText(file);
}

function setHTMLCode(code, buildTable) {
    globalHTMLEditor.getDoc().setValue(code);
    globalHTML = code
    if (buildTable) {
        generateTable();
    }
}

document.getElementById('download').addEventListener('click', (function(){
    this.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(globalReplacedHTML);
}))
;
