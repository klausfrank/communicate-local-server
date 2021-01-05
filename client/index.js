#!/usr/bin/env node

console.log('client started');

UPDATE_MSGS_EVERY_SECS=5;
console.log(`after user identified, will update messages every ${UPDATE_MSGS_EVERY_SECS} seconds`);


function readTextFromServer() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/readFile');
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = xhr.responseText;
            //var words = result.split("\n");
            var words = result.replace(/\n/g, "<br>");
            document.getElementById("text-read").innerHTML = ('<u>content read from File:</u> <br /><br />'+ words);
        }
    };
   
    xhr.send(); 
}
document.getElementById('read-textfile').addEventListener('click', readTextFromServer);



function sendTextToServer() {
    
    var data = document.getElementById("user-text-input").value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/writeFile');
    xhr.setRequestHeader('Content-Type', 'text/plain');
    console.log('sending data to server ', data);
    xhr.send(data);

    document.getElementById("text-read").innerHTML = "";
}
document.getElementById('write-textfile').addEventListener('click', sendTextToServer);