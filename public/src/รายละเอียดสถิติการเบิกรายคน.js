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
    var table
    var number = 1;
    table = $("#requesthistorydetailTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        ajax: ({
            type: 'POST',
            url: '/detailstaticperman',
            data: { user_id: localStorage.user },
            dataSrc: (data) => {

                for (let i = 0; i < data.length; i++) {
                    let d = new Date(data[i].date_requisition);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    data[i].date_requisition = date + '-' + month + '-' + year
                }

                return data
            }

        }),

        columns: [
            { title: "ลำดับ", defaultContent: "" },
            { data: "date_requisition", title: "วันที่" },
            { data: "time_requisition", title: "เวลา" },
            { data: "material_id", title: "รหัสวัสดุ" },
            { data: "material_name", title: "รายการ" },
            { data: "amount_of_requisition", title: "จำนวนเบิก" },
            { data: "unit", title: "หน่วยนับ" }],

        columnDefs: [
            {
                "targets": 0,
                "createdCell": function (td, cellData, rowData, row, col) {
                    $(td).text(number)
                    number++
                }
            }
        ]
    });

    $("#select").change(function () {
        const month = $("#select").val();
        console.log(month);

        table.clear();
        table = $("#requesthistorydetailTable").dataTable().fnDestroy();
        $("#requesthistorydetailTable").empty();
        var numberr = 1;
        table = $("#requesthistorydetailTable").DataTable({
            responsive: true,
            deferRender: true,

            ajax: ({
                method: "POST",
                url: "detailstaticpermanmonth",
                data: { user_id: localStorage.user, month: month },
                dataSrc: (data) => {
                    for (let i = 0; i < data.length; i++) {
                        let d = new Date(data[i].date_requisition);
                        let year = d.getFullYear();
                        let month = d.getMonth() + 1;
                        let date = d.getDate();
                        data[i].date_requisition = date + '-' + month + '-' + year
                    }

                    return data;
                }
            }),
            columns: [
                { title: "ลำดับ", defaultContent: "" },
                { data: "date_requisition", title: "วันที่" },
                { data: "time_requisition", title: "เวลา" },
                { data: "material_id", title: "รหัสวัสดุ" },
                { data: "material_name", title: "รายการ" },
                { data: "amount_of_requisition", title: "จำนวนเบิก" },
                { data: "unit", title: "หน่วยนับ" }],

            columnDefs: [
                {
                    "targets": 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).text(numberr);
                        numberr++
                    }
                }
            ]
        })


        if (month == 0) {

            table.clear();
            table = $("#requesthistorydetailTable").dataTable().fnDestroy();
            $("#requesthistorydetailTable").empty();
            var numberrr = 1
            table = $("#requesthistorydetailTable").DataTable({
                responsive: true,       //for responsive column display
                deferRender: true,      //if large data, use this option

                ajax: ({
                    type: 'POST',
                    url: '/detailstaticperman',
                    data: { user_id: localStorage.user },
                    dataSrc: (data) => {

                        for (let i = 0; i < data.length; i++) {
                            let d = new Date(data[i].date_requisition);
                            let year = d.getFullYear();
                            let month = d.getMonth() + 1;
                            let date = d.getDate();
                            data[i].date_requisition = date + '-' + month + '-' + year
                        }

                        return data
                    }

                }),

                columns: [
                    { title: "ลำดับ", defaultContent: "" },
                    { data: "date_requisition", title: "วันที่" },
                    { data: "time_requisition", title: "เวลา" },
                    { data: "material_id", title: "รหัสวัสดุ" },
                    { data: "material_name", title: "รายการ" },
                    { data: "amount_of_requisition", title: "จำนวนเบิก" },
                    { data: "unit", title: "หน่วยนับ" }],

                columnDefs: [
                    // make the last column align right, also target: "_all"
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).text(numberrr)
                            numberrr++;
                        }
                    }
                ]
            });
        }
    })

    $("#btnback").click(function () {
        window.history.back();
    });

    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})