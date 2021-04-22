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
    var countitem = 0
    table = $("#historymaterialTable").DataTable({
        responsive: true,       //for responsive column display
        deferRender: true,      //if large data, use this option

        ajax: ({
            type: 'GET',
            url: '/detaileditmat',
            dataSrc: (data) => {
                countitem = data.length
                for (let i = 0; i < data.length; i++) {
                    if (data[i].status_manage_stock == 1) {
                        data[i].status_manage_stock = "แก้ไขวัสดุ"
                    }
                    else if (data[i].status_manage_stock == 2) {
                        data[i].status_manage_stock = "เพิ่มวัสดุใหม่"
                    }

                    let d = new Date(data[i].date_manage);
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let date = d.getDate();
                    data[i].date_manage = date + '-' + month + '-' + year
                }
                return data
            }
        }),
        columns: [
            { data: "date_manage", title: "วันที่" },
            { data: "time_manage", title: "เวลา" },
            { data: "name", title: "ผู้แก้ไข" },
            { data: "status_manage_stock", title: "การจัดการ" },
            { data: "material_name", title: "รายการ" },
            { data: "number_material", title: "จำนวน" },
            { data: "unit", title: "หน่วยนับ" }],
        columnDefs: [{

        }]
    });

    // Sidebar toggle behavior
    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
})