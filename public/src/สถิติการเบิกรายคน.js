function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
}

$(document).ready(function () {

    $("#static").on("click", function () {
        window.location.replace('/staticvisor')
    })

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

    // Logout
    $("#logout").on("click", function () {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            window.location.replace('/logout');
        })
    })

    var rowID;
    var table
    // Static All Month
    var number = 1;
    table = $("#disbursementstatisticsTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        ajax: ({
            type: "GET",
            url: "/staticallmonth",
            dataSrc: function (data) {
                return data
            }
        }),
        columns: [
            { title: "ลำดับ", defaultContent: "" },
            { data: "user_id", title: "รหัสพนักงาน" },
            { data: "name", title: "รายชื่อ" },
            { data: "REQUIPERMONTH", title: "จำนวนครั้งที่เบิก/เดือน" },
            { title: "รายละเอียด", orderable: false, defaultContent: "<a href='#' class = 'btn-detail' >รายละเอียดเพิ่มเติม</a>" }
        ],
        columnDefs: [
            {
                "targets": 0,
                "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).text(number);
                    number++;
                }
            }
        ]
    });

    $("#disbursementstatisticsTable tbody ").on("click", ".btn-detail", function () {
        const currentRow = $(this).parents("tr");
        const data = table.row(currentRow).data();
        const user_id = data.user_id;

        localStorage.user = user_id;
        window.location.replace('/detaildisbur')
    })


    // Static Per Month
    $("#month").change(function () {
        const month_id = $("#month").val();
        localStorage.month = month_id;

        table.clear();
        table = $("#disbursementstatisticsTable").dataTable().fnDestroy();
        $("#disbursementstatisticsTable").empty();
        var numberr = 1;
        table = $("#disbursementstatisticsTable").DataTable({
            responsive: true,
            deferRender: true,
            ajax: {
                method: 'POST',
                url: '/staticreqpermonth',
                data: { month: month_id },
                dataSrc: function (data) {
                    return data
                }
            },

            columns: [
                { title: 'ลำดับ', defaultContent: "" },
                { data: 'user_id', title: 'รหัสพนักงาน' },
                { data: 'name', title: 'รายชื่อ' },
                { data: 'REQUIPERMONTH', title: 'จำนวนครั้งที่เบิก/เดือน' },
                { title: "รายละเอียด", orderable: false, defaultContent: "<a href='#' class = 'btn-detail'>รายละเอียดเพิ่มเติม</a>" }
            ],
            columnDefs: [
                {
                    "targets": 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).text(numberr);
                        numberr++;
                    }
                }
            ]

        })
        $("#disbursementstatisticsTable tbody ").on("click", ".btn-detail", function () {
            const currentRow = $(this).parents("tr");
            const data = table.row(currentRow).data();
            const user_id = data.user_id;
            localStorage.user = user_id;

            window.location.replace('/detaildisbur')
        })

        if (month_id == 0) {
            table.clear();
            table.clear();
            table = $("#disbursementstatisticsTable").dataTable().fnDestroy();
            $("#disbursementstatisticsTable").empty();
            var numberrr = 1;
            table = $("#disbursementstatisticsTable").DataTable({
                responsive: true,       //for responsive column display
                deferRender: true,      //if large data, use this option

                ajax: ({
                    type: "GET",
                    url: "/staticallmonth",
                    dataSrc: function (data) {
                        return data
                    }
                }),
                columns: [
                    { title: "ลำดับ", defaultContent: "" },
                    { data: 'user_id', title: 'รหัสพนักงาน' },
                    { data: "name", title: "รายชื่อ" },
                    { data: "REQUIPERMONTH", title: "จำนวนครั้งที่เบิก/เดือน" },
                    { title: "รายละเอียด", orderable: false, defaultContent: "<a href='#' class = 'btn-detail'>รายละเอียดเพิ่มเติม</a>" }
                ],
                columnDefs: [
                    {
                        'targets': 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).text(numberrr);
                            numberrr++;
                        }
                    }
                ]
            });
            $("#disbursementstatisticsTable tbody ").on("click", ".btn-detail", function () {
                const currentRow = $(this).parents("tr");
                const data = table.row(currentRow).data();
                const user_id = data.user_id;
                localStorage.user = user_id;

                window.location.replace('/detaildisbur')

            })
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