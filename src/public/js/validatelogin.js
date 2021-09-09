function showError(key, mess) {
    document.getElementById(key + '_error').innerHTML = mess;
}

function validate() {
    var flag = true;

    var emaillogin = document.getElementById('emaillogin').value;
    if (emaillogin == '') {

        showError('emaillogin', 'Vui lòng không để trống email');
        flag = false;

    }
    else {
        showError('emaillogin', '');
        flag = true;
    }

    var passlogin = document.getElementById('passlogin').value;
    if (passlogin == '') {
        showError('passlogin', 'Vui lòng không để trống mật khẩu');
        flag = false;

    }
    else {
        showError('passlogin', '');
        flag = true;
    }

    return flag;
} 