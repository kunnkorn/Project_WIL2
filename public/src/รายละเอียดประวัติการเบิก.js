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

    var table = $("#requesthistorydetailTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        ajax: ({
            type: "POST",
            url: "/datamaterialvisor",
            data: { requi_id: localStorage.requi },
            dataSrc: (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].amount_if_divide == null) {
                        data[i].amount_if_divide = "0"
                    }
                }

                return data
            }
        }),

        columns: [
            { data: "material_id", title: "รหัสวัสดุ" },
            { data: "material_name", title: "รายการ" },
            { data: "amount_if_requisition", title: "จำนวนเบิก" },
            { data: "unit", title: "หน่วยนับ" },
            { data: "amount_if_divide", title: "จำนวนจ่าย" },

        ],
    });

    $.ajax({
        type: "POST",
        url: "/datareqvisor",
        data: { requi_id: localStorage.requi },
        success: function (data) {

            let d = new Date(data[0].date_requisition);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let date = d.getDate();

            let e = new Date(data[0].date_pickup);
            let p_year = e.getFullYear();
            let p_month = e.getMonth() + 1;
            let p_date = e.getDate();

            $("#requi_date").text(date + '-' + month + '-' + year);
            $("#requi_time").text(data[0].time_requisition);
            $("#requi_name").text(data[0].name);
            $("#requi_id").text(data[0].requisition_id);
            $("#requi-ob").text(data[0].objective)

            if (data[0].status_requisition == 1) {
                $("#requi_status").text("รออนุมัติ")
                $("#requi_status").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': '#FEFFAC' })
            }
            else if (data[0].status_requisition == 2) {
                $("#requi_status").text("อนุมัติ")
                $("#requi_status").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': '#D1F1FF' })
            }
            else if (data[0].status_requisition == 3) {
                $("#requi_status").text('ไม่อนุมัติ')
                $("#requi_status").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': 'rgb(255, 224, 224)' })
                $("#unsuc").text('สาเหตุ : ' + data[0].annotation_of_disproval)
            }
            else if (data[0].status_requisition == 4) {
                $("#requi_status").text('เสร็จสมบูรณ์')
                $("#requi_status").css({ 'color': 'black' })
                $("#detail").css({ 'background-color': '#bffcd0' })
            }

            // หมายเหตุ
            if (data[0].annotation == null) {
                $("#requi_annotation").text('-')
            }
            else {
                $("#requi_annotation").text(data[0].annotation)
            }

            // วันที่มารับของ
            if (data[0].date_pickup == null) {
                $("#pick_date").text('-')
            }
            else {
                $("#pick_date").text(p_date + '-' + p_month + '-' + p_year)
            }

            // เวลารับของ
            if (data[0].time_pickup == null) {
                $("#pick_time").text('-')
            }
            else {
                $("#pick_time").text(data[0].time_pickup)
            }

        }
    });

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