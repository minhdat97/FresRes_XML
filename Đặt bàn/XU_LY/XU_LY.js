/*jshint esversion: 6 */
function Tao_Chuoi_HTML_Danh_sach_Mat_hang(Danh_sach) {

    var Dia_chi_Media = "../images";
    var Th_Danh_sach = document.createElement("div");
    Th_Danh_sach.className = "row";
    var select = document.getElementsByTagName("select")[0];

    for (var i = 0; i < Danh_sach.getElementsByTagName("Mon_an").length; i++) {
        var Mat_hang = Danh_sach.getElementsByTagName("Mon_an")[i];
        var Ten = Mat_hang.getAttribute("Ten");
        var Ma_so = Mat_hang.getAttribute("Ma_so");
        var Don_gia_Ban = parseInt(Mat_hang.getAttribute("Don_gia"));
        //var So_luong_Ton = Mat_hang.getAttribute("So_luong_Ton");
        //var Doanh_thu = Mat_hang.getAttribute("Doanh_thu");

        var Th_Hinh = document.createElement("img");
        Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.png`;
        Th_Hinh.className = "card-img-top";

        var Th_Thong_tin = document.createElement("div");
        Th_Thong_tin.className = "card-body";

        var Tieu_de = document.createElement("h5");
        Tieu_de.className = "card-title";
        Tieu_de.innerText = Ten;

        var Don_gia_Ban_Card = document.createElement("p");
        Don_gia_Ban_Card.className = "card-text";
        Don_gia_Ban_Card.innerText = "Đơn giá bán: " + Don_gia;

        /*var So_luong_Ton_Card = document.createElement("p");
        So_luong_Ton_Card.className = "card-text";
        So_luong_Ton_Card.innerText = "Số lượng tồn: " + So_luong_Ton;*/

        /*var Doanh_thu_Card = document.createElement("p");
        Doanh_thu_Card.className = "card-text";
        Doanh_thu_Card.innerText = "Doanh thu: " + Doanh_thu;*/

        Th_Thong_tin.appendChild(Tieu_de);
        Th_Thong_tin.appendChild(Don_gia_Ban_Card);
        //Th_Thong_tin.appendChild(So_luong_Ton_Card);
        //Th_Thong_tin.appendChild(Doanh_thu_Card);

        var Th_Mat_hang = document.createElement("div");
        Th_Mat_hang.className = "card col-md-3";
        Th_Mat_hang.appendChild(Th_Hinh);
        Th_Mat_hang.appendChild(Th_Thong_tin);

        Th_Danh_sach.appendChild(Th_Mat_hang)
        select.innerHTML += '\n<option value="' + `${Ma_so}` + '">' + `${Ten}` + "</option>";
    }
    var Chuoi_HTML = Th_Danh_sach.outerHTML;
    return Chuoi_HTML;
}

//************** Xử lý Nghiệp vụ ***********
function Tra_cuu_Mat_hang(Chuoi_Tra_cuu, Danh_sach) {
    Chuoi_Tra_cuu = Chuoi_Tra_cuu.toUpperCase();
    var Tai_lieu = new DOMParser().parseFromString("<Thuc_don_nha_hang /", "text/xml");
    var Danh_sach_Kq = Tai_lieu.documentElement; - 0
    for (var i = 0; i < Danh_sach.getElementsByTagName("Mon_an").length; i++) {
        var Mat_hang = Danh_sach.getElementsByTagName("Mon_an")[i];
        var Ten = Mat_hang.getAttribute("Ten").toUpperCase();
        if (Ten.indexOf(Chuoi_Tra_cuu) >= 0)
            Danh_sach_Kq.appendChild(Tai_lieu.importNode(Mat_hang, true));
    }

    return Danh_sach_Kq;
}


// ************** Xử lý Lưu trữ ***********
function Doc_Danh_sach_Mat_hang() {
    var url = "http://localhost:3000/?Ma_so_Xu_ly=Doc_du_lieu_mon_an"
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", url, false);
    Xu_ly_HTTP.send("");
    var Du_lieu = new DOMParser().parseFromString(Xu_ly_HTTP.responseText, "text/xml").documentElement;
    return Du_lieu;
}

//Tạo Nhóm Tivi
function Tao_Chuoi_HTML_Nhom_Tivi(Danh_sach) {
    var Th_Nhom_Tivi = document.createElement("div");
    Th_Nhom_Tivi.className = "row col-md-6";
    Th_Nhom_Tivi_Table = document.createElement("table");
    Th_Nhom_Tivi_Table.className = "table";
    Th_Nhom_Tivi_THead = document.createElement("thead");
    Th_Nhom_Tivi_THead_r = document.createElement("tr");
    Th_Nhom_Tivi_THead_r.innerHTML = ` <th scope="col">#</th>
                                        <th scope="col">Tên</th>`;
    Th_Nhom_Tivi_THead.appendChild(Th_Nhom_Tivi_THead_r);
    Th_Nhom_Tivi_Table.appendChild(Th_Nhom_Tivi_THead);


    var Th_Nhom_Tivi_TBody = document.createElement("tbody");

    var Nhom_Tivi = Danh_sach.getElementsByTagName("Nhom_Tivi");
    for (var i = 0; i < Nhom_Tivi.length; i++) {
        var Ten = Nhom_Tivi[i].getAttribute("Ten");
        var So_luong_Ton = Nhom_Tivi[i].getAttribute("So_luong_Ton");

        var newRow = Th_Nhom_Tivi_TBody.insertRow(Th_Nhom_Tivi_TBody.rows.length);

        var id = newRow.insertCell(0);
        var idText = document.createTextNode(i.toString());
        id.appendChild(idText);

        var name = newRow.insertCell(1);
        var nameText = document.createTextNode(Ten);
        name.appendChild(nameText);

        var amount = newRow.insertCell(2);
        var amountText = document.createTextNode(So_luong_Ton);
        amount.appendChild(amountText);
    }
    Th_Nhom_Tivi_Table.appendChild(Th_Nhom_Tivi_TBody);
    Th_Nhom_Tivi.appendChild(Th_Nhom_Tivi_Table);

    return Th_Nhom_Tivi.outerHTML;
}

function Thay_doi_Select(Danh_sach) {
    var select = document.getElementsByTagName("select")[0];
    var selected = select.options[select.selectedIndex].value;

    for (var i = 0; i < Danh_sach.getElementsByTagName("Mon_an").length; i++) {
        var id = Danh_sach.getElementsByTagName("Mon_an")[i].getAttribute("Ma_so");
        if (id === selected) {
            document.getElementById("price").value = Danh_sach.getElementsByTagName("Mon_an")[i].getAttribute("Don_gia");
            var soluong = parseInt(document.getElementById('amount').value);
            if (!isNaN(soluong) && soluong > 0) {
                document.getElementById('money').value = (soluong * parseInt(document.getElementById("price").value)).toString();
            }
            break;
        }
    }
}

function Kiem_tra_Du_lieu_va_Ban_hang(Danh_sach) {
    var select = document.getElementsByTagName("select")[0];
    var selected = select.options[select.selectedIndex].value;

    if (selected == "Lựa chọn món cần cập nhật giá nhập") {
        alert("Vui lòng chọn món để cập nhật giá.");
        return Danh_sach;
    }

    var amount = parseInt(document.getElementById("amount").value);
    if (isNaN(amount)) {
        alert("Vui lòng nhập số lượng để đặt bàn.");
        return Danh_sach;
    }

    var date = document.getElementById('dateSell').value;
    if (date == "") {
        alert("Vui lòng chọn ngày bán hàng để đặt bàn.");
    }
    return Ban_hang(date, selected, amount);
}

function Ban_hang(date, idMonan, amount) {
    var url = "http://localhost:3000/?Ma_so_Xu_ly=Cap_nhat_du_lieu_mon_an&Ngay_ban=" + date + "&Ma_so=" + idMonan + "&So_luong=" + amount;
    console.log(url);
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send("");
    var Du_lieu = new DOMParser().parseFromString(xhttp.responseText, "text/xml").documentElement;
    return Du_lieu;
}

function updateComponent(Danh_sach) {
    var soluong = parseInt(document.getElementById('amount').value);
    if (soluong >= 0) {
        var price = document.getElementById("price").value;
        if (!isNaN(price)) {
            document.getElementById('money').value = (soluong * price).toString();
            document.getElementById('totalMoney').value = document.getElementById('money').value;
        }
    }
}