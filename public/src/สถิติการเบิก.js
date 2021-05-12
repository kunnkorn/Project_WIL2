function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
}

$(document).ready(function () {

    // ย้ายหน้าไปสถิติการเบิกรายคน
    $("#perman").on("click", function () {
        window.location.replace('/individualstatistics')
    })

    $("#material").on("click", function () {
        window.location.replace('/meterialvisor')
    })

    $("#hisvisor").on("click", function () {
        window.location.replace('/hiswithdrawmat')
    })

    $("#hisedit").on("click", function () {
        window.location.replace('/hiseditmaterial')
    })

    // Logout
    $("#logout").on("click", function () {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            window.location.replace('/logout');
        })
    })

    $(document).ready(function () {

        // Show Dash Board All
        $.ajax({
            type: "GET",
            url: "/getstaticdashall",
            success: function (data) {
                $("#all").text(data[0].allrequi);
            },
            error: (xhr) => {
                alert(xhr.responseText);
            }
        });

        // Show Dash Board Approve Requisition
        $.ajax({
            type: "GET",
            url: "/getstaticdashboard",
            success: function (data) {
                $("#check").text(data[0].apprequi)
            },
            error: (xhr) => {
                alert(xhr.responseText);
            }
        });

        // Show Dash Board Disapproval Requisition
        $.ajax({
            type: "GET",
            url: "/getstaticdashunapp",
            success: function (data) {
                $("#noncheck").text(data[0].disrequi)
            },
            error: (xhr) => {
                alert(xhr.responseText);
            }
        });

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


        $("#select").change(function () {
            const category_id = $("#select").val();

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
            }
        })


        // Sidebar toggle behavior
        $(function () {
            // Sidebar toggle behavior
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar, #content').toggleClass('active');
            });
        });
    })


    var colors = ['#5832CE', '#F90904', '#E4D131'];

    var chBar = document.getElementById("chBar");

    $.ajax({
        type: "GET",
        url: "/getstaticgraph",
        success: function (response) {
            let approve = [];
            let disapp = [];
            for(let i=0; i<response.length; i++){
                approve[i] = response[i].approve;
                disapp[i] = response[i].disapproval;
                
            }
            
            var chartData = {
                labels: ['วัสดุสำนักงาน', ' วัสดุไฟฟ้าวิทยุ', 'วัสดุคอมพิวเตอร์', 'วัสดุโฆษณา', 'วัสดุงานบ้านงานครัว', 'วัสดุเครื่องแต่งกาย', 'วัสดุของที่ระลึก'],
                datasets: [{
                    label: ['อนุมัติ'],
                    data: approve,
                    backgroundColor: colors[0]
                },
                {
                    label: 'ไม่อนุมัติ',
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

    

});