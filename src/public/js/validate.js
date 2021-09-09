function showError(key, mess){
    document.getElementById(key + '_error').innerHTML = mess;
}

function validate()
{
    var flag = true;

    var username = document.getElementById('name').value;
    if (username == ''){
        showError('name', 'Vui lòng không để trống họ tên');
        flag = false;
    }
    else if (username.length < 5 ){
        showError('name', 'Độ dài phải lớn hơn 5 ký tự');
        flag = false;
    }
    else if ( !/^[a-zA-Z0-9]+$/.test(username)) {
        showError('name', 'Họ tên không chứa các ký tự đặc biệt');
        flag = false;
    }
    else{
        showError('name','');
        flag = true;
    }


    var password = document.getElementById('pass').value;

    if (password == '' ){
        showError('pass', 'Vui lòng không để trống mật khẩu');
        flag = false;

    }
    else if (password.length < 8){
        showError('pass', 'Độ dài phải lớn hơn 8 ký tự');
        flag = false;

    }
    else{
        showError('pass','');
        flag = true;
    }


    var repassword = document.getElementById('repass').value;
    if (repassword == '' ){
        showError('repass', 'Vui lòng không để trống mật khẩu');
        flag = false;

    }
    else if (password != repassword){
        showError('repass', 'Mật khẩu không trùng khớp');
        flag = false;
    }
    else{
        showError('repass','');
        flag = true;
    }


    // 3. Phone
    // var phone = document.getElementById("name").value;
    // if (phone != '' &&  !/^[0-9]{10}$/.test(phone)){
    //     showError('phone', 'Vui lòng kiểm tra lại Phone');
    //     flag = false;
    // }


    var email = document.getElementById('email').value;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email == ''){

        showError('email', 'Vui lòng không để trống email');
        flag = false;

    }
    else if (!mailformat.test(email)){

        showError('email', 'Sai định dạng email');
        flag = false;

    }
    else{
        showError('email', '');
        flag = true;
    }


    var birth = document.getElementById('birth').value;
    if(birth == ''){
        showError('birth','Vui lòng chọn ngày sinh');
        flag = false;
    }
    else{
        showError('birth','');
        flag = true;
    }

    return flag;
} 