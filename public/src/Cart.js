$(document).ready(function () {
    $("#btn-requis").on("click" , function(){
        $("#modelResult").modal("show");

        $("#btn-confirm").on("click" , function(){
            window.location.replace("Index.html");
        })
    })

    $(function () {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar, #content').toggleClass('active');
        });
    });
});