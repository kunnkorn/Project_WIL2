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

    var rowID;
    var table;
    var number = 1;
    table = $("#materialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        ajax: ({
            type: 'POST',
            url: '/materialsuperall',
            dataSrc: (data) => {
                return data;
            }

        }),

        columns: [
            { data: "material_id", title: "รหัสวัสดุ" },
            { data: "material_name", title: "รายการ" },
            { data: "material_number", title: "คงเหลือ" },
            { data: "unit", title: "หน่วยนับ" }
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

    $("#select").change(function () {
        const category_id = $("#select").val()
        console.log(category_id)

        table.clear();
        table = $("#materialTable").dataTable().fnDestroy();
        $("#materialTable").empty();
        var numberr = 1;
        table = $("#materialTable").DataTable({
            responsive: true,       //for responsive column display
            deferRender: true,      //if large data, use this option

            ajax: ({
                type: 'POST',
                url: '/materialsuper',
                data: { category: category_id },
                dataSrc: (data) => {
                    return data
                }
            }),

            columns: [
                { title: "ลำดับ", defaultContent: "" },
                { data: "material_id", title: "รหัสวัสดุ" },
                { data: "material_name", title: "รายการ" },
                { data: "material_number", title: "คงเหลือ" },
                { data: "unit", title: "หน่วยนับ" }
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
                    type: 'POST',
                    url: '/materialsuperall',
                    dataSrc: (data) => {
                        return data;
                    }

                }),

                columns: [
                    { title: "ลำดับ", defaultContent: "" },
                    { data: "material_id", title: "รหัสวัสดุ" },
                    { data: "material_name", title: "รายการ" },
                    { data: "material_number", title: "คงเหลือ" },
                    { data: "unit", title: "หน่วยนับ" }
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