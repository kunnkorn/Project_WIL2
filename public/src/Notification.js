$(document).ready(function () {
    var notification = [
        {
            "date": "02/01/2563",
            "time": "10:35 น. ",
            "number": "64050001",
            "status": "ไม่อนุมัติ",

        },

        {
            "date": "15/06/2563",
            "time": "12:25 น. ",
            "number": "64050010",
            "status": "อนุมัติ",

        },

        {
            "date": "18/08/2563",
            "time": "09:50 น. ",
            "number": "64050015",
            "status": "อนุมัติ",

        }
    ]

    var table = $("#NotificationTab").DataTable({
        responsive: true,
        deferRender: true,

        data: notification,
        columns: [
            { data: "date", title: "วันที่" },
            { data: "time", title: "เวลา" },
            { data: "number", title: "เลขที่ใบเบิก" },
            { data: "status", title: "สถานะ" },
            { title: "รายละเอียด", orderable: false, defaultContent: "<a href= '#' class = 'btn-detailNoti'>รายละเอียดเพิ่มเติม<a/>" }
        ]
    });

    $("NotificationTab tbody").on("click", ".btn-detailNoti", function () {

        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();

        if (data.status == "ไม่อนุมัติ") {
            window.location.replace("History(Unsuccess).html");

        }
        else {
            window.location.replace("History(success).html");
        }
    });

    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });

    $('#btnall').toggleClass('active');


    $('#btnall').click(function () {
        if ($('#btnall').hasClass('active')) {

        } else {
            $('#btnall').toggleClass('active');
            $('#btnwait').removeClass('active');
            $('#btncomfirm').removeClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btncomplete').removeClass('active');
        }

    });

    $('#btnwait').click(function () {
        if ($('#btnwait').hasClass('active')) {

        } else {
            $('#btnwait').toggleClass('active');
            $('#btnall').removeClass('active');
            $('#btncomfirm').removeClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btncomplete').removeClass('active');
        }

    });

    $('#btncomfirm').click(function () {
        if ($('#btncomfirm').hasClass('active')) {

        } else {
            $('#btncomfirm').toggleClass('active');
            $('#btnwait').removeClass('active');
            $('#btnall').removeClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btncomplete').removeClass('active');
        }

    });

    $('#btnUnapp').click(function () {
        if ($('#btnUnapp').hasClass('active')) {

        } else {
            $('#btnUnapp').toggleClass('active');
            $('#btnwait').removeClass('active');
            $('#btnall').removeClass('active');
            $('#btncomfirm').removeClass('active');
            $('#btncomplete').removeClass('active');
        }

    });

    $('#btncomplete').click(function () {
        if ($('#btncomplete').hasClass('active')) {

        } else {
            $('#btncomplete').toggleClass('active');
            $('#btnUnapp').removeClass('active');
            $('#btnwait').removeClass('active');
            $('#btnall').removeClass('active');
            $('#btncomfirm').removeClass('active');
        }

    });


    let listreq = "";
    for (let i = 0; i < 10; i++) {
        listreq += "<div class='col-11 my-3 rounded-sm mx-auto bg-white shadow-sm'><div class='col-12 head'><p class='mt-4'>เลขที่ใบเบิก : 64050010</p></div><hr size='2' class='ml-0' style='background-color: rgb(187, 187, 187);'><div class='col-12 body d-flex justify-content-between'><div class='text-area col-8'><div class='col-12 d-lg-flex justify-content-between'><p>วันที่ 4/15/2021</p><p>เวลา 11.55 น.</p><p>นาย ปัณณ์ คงสมบูรณ์</p></div><div class='col-12'><p>x 20 ชิ้น</p></div></div><div class='comment-area text-right'><textarea rows='5' class='col-12' disabled></textarea></div></div><hr size='2' class='ml-0' style='background-color: rgb(184, 184, 184)'><div class='col-12 footer'><div class='col-12 d-flex justify-content-end'><h3>สถานะ : </h3><h3 class='text-warning ml-2'>รออนุมัติ</h1></div> <div class='col-12 d-flex justify-content-end'><a href='../view/History(success).html' class='btn btn-outline-info mb-3'>ดูรายละเอียด</a></div></div></div>";
    }

    $("#requsition-area").html(listreq);
});

