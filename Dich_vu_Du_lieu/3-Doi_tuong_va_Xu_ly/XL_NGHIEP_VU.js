/*jshint esversion: 6 */
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

function Cap_nhat_Du_lieu_Don_gia_Nhap(Du_lieu, Ma_so, Don_gia) {
    for (var i = 0; i < Du_lieu.getElementsByTagName("Tivi").length; i++) {
        if (Du_lieu.getElementsByTagName("Tivi")[i].getAttribute("Ma_so") == Ma_so) {
            Du_lieu.getElementsByTagName("Tivi")[i].setAttribute("Don_gia_Nhap", Don_gia);
            console.log("Successfully!");
            break;
        }
    }

    return Du_lieu;
}

function Cap_Nhat_Nhan_vien_Ban_hang(Du_lieu, Ngay_ban, Ma_so, So_luong) {
    for (var i = 0; i < Du_lieu.getElementsByTagName("Tivi").length; i++) {
        if (Du_lieu.getElementsByTagName("Tivi")[i].getAttribute("Ma_so") == Ma_so) {
            var Mat_hang = Du_lieu.getElementsByTagName("Tivi")[i];
            var So_luong_Ton = parseInt(Mat_hang.getAttribute("So_luong_Ton"));
            if (isNaN(So_luong_Ton)) {
                So_luong_Ton = 0;
            }
            var Doanh_thu = parseInt(Mat_hang.getAttribute("Doanh_thu"));
            if (isNaN(Doanh_thu)) {
                Doanh_thu = 0;
            }

            if (So_luong_Ton >= So_luong) {
                // Thêm node Bán hàng mới
                var parent = new DOMParser().parseFromString("<Du_lieu />", "text/xml");
                var newNode = parent.createElement("Ban_hang");
                newNode.setAttribute("Ngay", Ngay_ban);
                newNode.setAttribute("Don_gia", Mat_hang.getAttribute("Don_gia_Ban"));
                newNode.setAttribute("So_luong", So_luong);
                newNode.setAttribute("Tien", parseInt(newNode.getAttribute("Don_gia")) * So_luong);
                Mat_hang.getElementsByTagName("Danh_sach_Ban_hang")[0].appendChild(newNode);

                // Cập nhật thông tin của tivi
                Mat_hang.setAttribute("So_luong_Ton", So_luong_Ton - So_luong);
                var So_luong_Ton_Hien_tai = parseInt(Mat_hang.getAttribute("So_luong_Ton"));
                if (So_luong_Ton_Hien_tai <= 0) {
                    Mat_hang.setAttribute("Trang_thai_Con_hang", "false");
                } else {
                    Mat_hang.setAttribute("Trang_thai_Con_hang", "true");
                }
                Mat_hang.setAttribute("Doanh_thu", Doanh_thu + parseInt(newNode.getAttribute("Tien")));
            }
            break;
        }
    }

    return Du_lieu;
}

module.exports = {
    Cap_nhat_Du_lieu_Don_gia_Nhap,
    Cap_Nhat_Nhan_vien_Ban_hang
};