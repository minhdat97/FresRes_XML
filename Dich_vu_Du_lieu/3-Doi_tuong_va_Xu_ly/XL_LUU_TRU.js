/*jshint esversion: 6 */
var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var path = "2-Du_lieu_Luu_tru//database.xml";

function readXML() {
    var xml = fs.readFileSync(path, 'UTF-8');
    var data = new DOMParser().parseFromString(xml, 'text/xml').documentElement;
    return data;
}


function writetoXML(data) {
    data = new XMLSerializer().serializeToString(data);
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('successfully!');
        }
    })
}

function readForImportManager(data) {
    var result = new DOMParser().parseFromString("<Du_lieu />", "text/xml");
    var parent = result.getElementsByTagName("Du_lieu")[0];
    var listMonan = data.getElementsByTagName("Tivi");
    var i = null;
    for (i = 0; i < listMonan.length; i++) {
        var newNode = result.createElement("Tivi");
        newNode.setAttribute("Ma_so", listMonan[i].getAttribute("Ma_so"));
        newNode.setAttribute("Ten", listMonan[i].getAttribute("Ten"));
        newNode.setAttribute("Don_gia_Nhap", listMonan[i].getAttribute("Don_gia_Nhap"));
        newNode.setAttribute("So_luong_Ton", listMonan[i].getAttribute("So_luong_Ton"));

        parent.appendChild(newNode);

        var nodeGroupTivi = listMonan[i].getElementsByTagName("Nhom_Tivi")[0];
        var isExist = false;
        var listGroupTivi = parent.getElementsByTagName("Nhom_Tivi");

        for (var j = 0; j < listGroupTivi.length; j++) {
            if (listGroupTivi[j].getAttribute("Ma_so") === nodeGroupTivi.getAttribute("Ma_so")) {
                // Is exist
                var currentQuanity = parseInt(listGroupTivi[j].getAttribute("So_luong_Ton"));
                if (isNaN(currentQuanity)) {
                    currentQuanity = 0;
                }
                var newQuanity = parseInt(newNode.getAttribute("So_luong_Ton"));
                if (isNaN(newQuanity)) {
                    newQuanity = 0;
                }
                currentQuanity += newQuanity;
                listGroupTivi[j].setAttribute("So_luong_Ton", currentQuanity);
                isExist = true;
            }
        }

        //Is not exist
        if (!isExist) {
            var newNodeGroupTivi = result.createElement("Nhom_Tivi");
            newNodeGroupTivi.setAttribute("Ma_so", listMonan[i].getElementsByTagName("Nhom_Tivi")[0].getAttribute("Ma_so"));
            newNodeGroupTivi.setAttribute("Ten", listMonan[i].getElementsByTagName("Nhom_Tivi")[0].getAttribute("Ten"));
            newNodeGroupTivi.setAttribute("So_luong_Ton", newNode.getAttribute("So_luong_Ton"));

            parent.appendChild(newNodeGroupTivi);
        }
    }

    return result;
}

function readForSeller(data) {
    var result = new DOMParser().parseFromString("<Du_lieu></Du_lieu>", "text/xml");
    var parent = result.getElementsByTagName("Du_lieu")[0];
    var listMonan = data.getElementsByTagName("Mon_an");

    for (let i = 0; i < listMonan.length; i++) {
        var newNode = result.createElement("Mon_an");
        newNode.setAttribute("Ma_so", listMonan[i].getAttribute("Ma_so"));
        newNode.setAttribute("Ten", listMonan[i].getAttribute("Ten"));
        newNode.setAttribute("Don_gia", listMonan[i].getAttribute("Don_gia"));
        /*var So_luong_Ton = listMonan[i].getAttribute("So_luong_Ton");
        newNode.setAttribute("So_luong_Ton", isNaN(parseInt(So_luong_Ton)) ? 0 : So_luong_Ton);
        var Doanh_thu = listMonan[i].getAttribute("Doanh_thu");
        newNode.setAttribute("Doanh_thu", isNaN(parseInt(Doanh_thu)) ? 0 : Doanh_thu);*/

        parent.appendChild(newNode);
    }
    return result;
}

module.exports = {
    readXML,
    readForImportManager,
    readForSeller,
    writetoXML
};