let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
       console.log("State Changed Called. Ready State: " + xhr.readyState
       + "Status: " + xhr.status);
       if(xhr.status.toString().match('^[2][0-9]{2}$')) {
           console.log(xhr.responseText);
       }else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
           reject({
               status: xhr.status,
               statusText: xhr.statusText
           });
           console.log("XHR Failed");
       }
    }
    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
}
const getURL = "http://127.0.0.1:3000/employees/";

function getUserDetails(data) {
    console.log("Get User Data " + data);
}
makeAJAXCall("GET", getURL, getUserDetails);

const deleteURL = "http://localhost:3000/employees/4";

function userDeleted(data) {
    console.log("User Deleted " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees/";
const emplData = { "name": "Pratiskha", "salary": "400000" };

function userAdded(data) {
    console.log("User Added: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);