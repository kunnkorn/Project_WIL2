
$(document).ready(function () {
    var rowID;
    var meterial = [
    {
        "number" : "1",
        "id" : "101000001",
        "name" : "กรรไกรตัดกระดาษ 6",
        "balance" : "20",
        "unit" : "อัน"
    },

    {
        "number" : "2",
        "id" : "101000002",
        "name" : "กรรไกรตัดกระดาษ 9",
        "balance" : "100",
        "unit" : "อัน"
    },

    {
        "number" : "3",
        "id" : "101000003",
        "name" : "กระดาษ POSTIT ขนาด 2*3",
        "balance" : "100",
        "unit" : "เล่ม"
    },

    {
        "number" : "4",
        "id" : "101000004",
        "name" : "กระดาษ POSTIT ขนาด 3*3",
        "balance" : "100",
        "unit" : "เล่ม"
    },

    {
        "number" : "5",
        "id" : "101000005",
        "name" : "กระดาษคองเกอเร่อร์ A4/120G/100แผ่น/ห่อ",
        "balance" : "50",
        "unit" : "ห่อ"
    },

    {
        "number" : "6",
        "id" : "101000006",
        "name" : "กระดาษคองเกอเร่อร์นอก A4/120G/10แผ่น/ห่อ",
        "balance" : "80",
        "unit" : "ห่อ"
    },

    {
        "number" : "7",
        "id" : "101000007",
        "name" : "กระดาษคองเกอเร่อร์นอก A4/120G/10แผ่น/ห่อ",
        "balance" : "57",
        "unit" : "ห่อ"
    },

    {
        "number" : "8",
        "id" : "101000008",
        "name" : "กระดาษคาร์บอน",
        "balance" : "40",
        "unit" : "กล่อง"
    },

    {
        "number" : "9",
        "id" : "101000009",
        "name" : "กระดาษเครื่องโทรสาร Sharp/FO-57",
        "balance" : "50",
        "unit" : "ม้วน"
    },

    {
        "number" : "10",
        "id" : "1010000010",
        "name" : "กระดาษตอ่เนื่อง ขนาด 15*11 1 ชั้น",
        "balance" : "23",
        "unit" : "กล่อง"
    },

]
    var table = $("#materialMenu").DataTable({
        responsive: true,
        deferRender: true,

        data: meterial,
        columns: [
            {data: "number" , title: "ลำดับ"},
            {data: "id" , title: "รหัสวัสดุ"},
            {data: "name" , title: "รายการ"},
            {data: "balance" , title: "คงเหลือ"},
            {data: "unit" , title: "หน่วยนับ"},
            {title: "ขอเบิก" , orderable: false , defaultContent: '<a href = "#" ><span class="iconify" data-icon="fluent:task-list-add-20-regular" style="font-size: 40px; color: F49300;"></span></a>'}
        ]

    });

});