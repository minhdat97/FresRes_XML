/*jshint esversion: 6 */
var http = require('http');
var luuTru = require('./3-Doi_tuong_va_Xu_ly/XL_LUU_TRU');
var nghiepVu = require('./3-Doi_tuong_va_Xu_ly/XL_NGHIEP_VU');
var url = require('url');
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var port = 3000;

var Du_lieu = luuTru.readXML();
var tempData = null;

http.createServer((req, res) => {
    var result = "";
    var data = "";
    var query = url.parse(req.url, true).query;
    console.log(query);

    var Ma_so_Xu_ly = query.Ma_so_Xu_ly;

    req.on('data', (chunk) => {
        return data + chunk;
    });

    req.on('end', () => {
        var isChange = false;
        switch (Ma_so_Xu_ly) {
            case "Doc_Du_lieu_Quan_ly_Nhap_hang":
                tempData = luuTru.readForImportManager(Du_lieu);
                break;
            case "Doc_du_lieu_mon_an":
                tempData = luuTru.readForSeller(Du_lieu);
                break;
            case "Cap_nhat_Du_lieu_Don_gia_Nhap":
                var Ma_so = query.Ma_so;
                var Don_gia = parseInt(query.Don_gia);
                Du_lieu = nghiepVu.Cap_nhat_Du_lieu_Don_gia_Nhap(Du_lieu, Ma_so, Don_gia);
                tempData = luuTru.readForImportManager(Du_lieu);
                isChange = true;
                break;
            case "Cap_nhat_Du_lieu_Nhan_vien_Ban_hang":
                var Ngay_ban = query.Ngay_ban;
                var Ma_so = query.Ma_so;
                var So_luong = parseInt(query.So_luong);
                Du_lieu = nghiepVu.Cap_Nhat_Nhan_vien_Ban_hang(Du_lieu, Ngay_ban, Ma_so, So_luong);
                tempData = luuTru.readForSeller(Du_lieu);
                isChange = true;
                break;
            default:
                break;
        }
        // console.log(tempData);
        result = new XMLSerializer().serializeToString(tempData);
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.end(result);
        if (isChange) {
            luuTru.writetoXML(Du_lieu);
        }
    });
}).listen(port, (err) => {
    if (err) {
        console.log('Error: ' + err);
    } else {
        console.log('Server is running at port 3000');
    }
});