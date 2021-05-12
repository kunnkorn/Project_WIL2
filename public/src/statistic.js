function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        });
    });
}

function signout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        sessionStorage.clear();
        window.location.replace('/logout');
    });
}


$(document).ready(function () {

    // Show Dash Board 
    // Show Dash Board All
    var buttons;
    $.ajax({
        type: "GET",
        url: "/getstaticdashall",
        success: function (response) {
            $("#all").text(response[0].allrequi)
        },
        error: (xhr) => {
            alert(xhr.responseText);
        }
    });

    // Show Dash Board Approve Requisition
    $.ajax({
        type: "GET",
        url: "/getstaticdashboard",
        success: function (response) {
            $("#check").text(response[0].apprequi)
        },
        error: (xhr) => {
            alert(xhr.responseText);
        }
    });

    // Show Dash Board Disapproval Requisition
    $.ajax({
        type: "GET",
        url: "/getstaticdashunapp",
        success: function (response) {
            $("#noncheck").text(response[0].disrequi)
        },
        error: (xhr) => {
            alert(xhr.responseText);
        }
    });


    $("#month").change(function () {
        var month = $("#month").val();

        $.ajax({
            type: "POST",
            url: "/getstaticdashallpermonth",
            data: { month_se: month },
            success: function (response) {
                console.log($("#all").attr('id') + response[0].allrequi)
                $("#all").text(response[0].allrequi)

                // let dashboardall = "";

                //     dashboardall += "<div class='col-xl-3 col-6'><div class='card ' style='background-color: #92E5FF;'><div class='card-body'><h5 class='card-title'>ใบเบิกทั้งหมด</h5><p class='card-text' id='all'>" + response[0].allrequi + "<span class='iconify' data-icon='ant-design:file-text-outlined'id='iconsta'></span></p></div></div>"

                // $("#firstcart").html(dashboardall)
            }
        });

        $.ajax({
            type: "POST",
            url: "/getstaticdashboardpermonth",
            data: { month_se: month },
            success: function (response) {
                $("#check").text(response[0].apprequi)
            }
        });

        $.ajax({
            type: "POST",
            url: "/getstaticdashunapppermonth",
            data: { month_se: month },
            success: function (response) {
                $("#noncheck").text(response[0].disrequi)
            }
        });
    })


    var colors = ['#5832CE', '#F90904'];

    $.ajax({
        type: "GET",
        url: "/getstaticgraph",
        success: function (response) {
            // console.log(response);
            let approve = [];
            let disapp = [];
            for(let i=0; i<response.length; i++){
                approve[i] = response[i].approve;
                disapp[i] = response[i].disapproval;
                
            }
            console.log(approve);

            var chartData = {
                labels: ['วัสดุสำนักงาน', ' วัสดุไฟฟ้าวิทยุ', 'วัสดุคอมพิวเตอร์', 'วัสดุโฆษณา', 'วัสดุงานบ้านงานครัว', 'วัสดุเครื่องแต่งกาย', 'วัสดุของที่ระลึก'],
                datasets: [{
                    label: ['อนุมัติ'],
                     data: approve,
                    // data: [15, 12, 25, 10, 12, 28 , 10],
                    backgroundColor: colors[0]
                },
                {
                    label: 'ไม่อนุมัติ',
                    // data: [response[0].disapproval, response[1].disapproval, response[2].disapproval, response[3].disapproval, response[4].disapproval, response[5].disapproval, response[6].disapproval],
                    data: disapp,
                    backgroundColor: colors[1]
                },
                ]
            };
            if (chBar) {
                new Chart(chBar, {
                    type: 'bar',
                    data: chartData,
                    responsive: true,
                    options: {
                        scales: {
                            xAxes: [{
                                barPercentage: 1,
                                categoryPercentage: 0.5
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: false
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: 'bottom'

                        }
                    }
                });
            }
        }
    });

    $("#badge_req").text(sessionStorage.noti);
    //statistic



    var rowID;
    var number = 1;
    var table = $("#materialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option
        ajax: ({
            type: "GET",
            url: "/getstaticmaterial",
            dataSrc: (data) => {
                return data;
            }
        }),
        columns: [
            { title: 'ลำดับ', defaultContent: "" },
            { data: 'id', title: "รหัสวัสดุ" },
            { data: 'material', title: "รายการ" },
            { data: 'requipermonth', title: "จำนวนที่เบิกรายเดือน" },
            { data: 'approve', title: "อนุมัติ" },
            { data: 'disapproval', title: "ไม่อนุมัติ" },
            { data: 'unit', title: "หน่วยนับ" }
        ],
        columnDefs: [{
            "targets": 0,
            "createdCell": function (td, cellData, rowData, row, col) {
                $(td).text(number);
                number++;
            }
        }]
    })
    buttons = new $.fn.dataTable.Buttons(table, {
        buttons: [
            'excelHtml5',
        ]
    }).container().appendTo($('#exportConfirm'));

    $("#select").change(function () {
        const category_id = $("#select").val();
        if (category_id == 0) {
            table.clear();
            table = $("#materialTable").dataTable().fnDestroy();
            $("#materialTable").empty();
            var numberrr = 1;
            table = $("#materialTable").DataTable({
                responsive: true,       //for responsive column display
                deferRender: true,      //if large data, use this option

                ajax: ({
                    type: 'GET',
                    url: '/getstaticmaterial',
                    dataSrc: (data) => {
                        return data;
                    }

                }),

                columns: [
                    { title: 'ลำดับ', defaultContent: "" },
                    { data: 'id', title: "รหัสวัสดุ" },
                    { data: 'material', title: "รายการ" },
                    { data: 'requipermonth', title: "จำนวนที่เบิกรายเดือน" },
                    { data: 'approve', title: "อนุมัติ" },
                    { data: 'disapproval', title: "ไม่อนุมัติ" },
                    { data: 'unit', title: "หน่วยนับ" }
                ],
                columnDefs: [
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).text(numberrr);
                            numberrr++;
                        }
                    }
                ]
            });
            buttons = new $.fn.dataTable.Buttons(table, {
                buttons: [
                    'excelHtml5',
                ]
            }).container().appendTo($('#exportConfirm'));
        } else {
            table.clear();
            table = $("#materialTable").dataTable().fnDestroy();
            $("#materialTable").empty();
            var numberr = 1;
            table = $("#materialTable").DataTable({
                responsive: true,       //for responsive column display
                deferRender: true,      //if large data, use this option

                ajax: ({
                    type: "POST",
                    url: "/getstaticmaterialpermonth",
                    data: { cate_id: category_id },
                    dataSrc: (data) => {
                        return data;
                    }
                }),
                columns: [
                    { title: 'ลำดับ', defaultContent: "" },
                    { data: 'id', title: "รหัสวัสดุ" },
                    { data: 'material', title: "รายการ" },
                    { data: 'requipermonth', title: "จำนวนที่เบิกรายเดือน" },
                    { data: 'approve', title: "อนุมัติ" },
                    { data: 'disapproval', title: "ไม่อนุมัติ" },
                    { data: 'unit', title: "หน่วยนับ" }
                ],
                columnDefs: [{
                    "targets": 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).text(numberr);
                        numberr++;
                    }
                }]
            });
            buttons = new $.fn.dataTable.Buttons(table, {
                buttons: [
                    'excelHtml5',
                ]
            }).container().appendTo($('#exportConfirm'));
        }
    })
    //model export file
    $("#export").on("click", function () {
        $("#modelExport").modal("show");
    });
    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });

    $(".dt-button").text("ยืนยัน");
    $(".dt-button").attr("class", "dt-button btn btn-success");
})