function init() {
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: '565819629218-hrjqptqk34lk5sq2599tasa7gc2tho24.apps.googleusercontent.com'
        })
    })
}

$(document).ready(function () {
    $('#btnlogin').on("click", function () {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn({ scope: 'profile email', promt: 'select_account' }).then((googleUser) => {
            // var profile = googleUser.getBasicProfile();
            // console.log('ID: ' + profile.getId());
            // console.log('Name: ' + profile.getName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail());
           

            const id_token = googleUser.getAuthResponse().id_token;
            $.ajax({
                type: "POST",
                url: "/login",
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                data: {token: id_token},
                success: (response) =>  {
                    window.location.replace(response);
                },
                error: (xhr) => {
                    alert(xhr.responseText);
                }
            })
        }).catch((err) => {
            console.log(err);
        })
    })
});