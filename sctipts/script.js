window.onload = function () {
    const fullNameElement = document.getElementById('full-name');
    const emailElement = document.getElementById('email');
    const usernameElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');
    const repeatPasswordElement = document.getElementById('repeat-password');
    const checkBoxElement = document.getElementById('reg-form-check');
    const myAlert = document.getElementById('my-alert');
    const alertText = document.getElementById('alert-text');
    const alertButton = document.getElementById('alert-button');
    const form = document.getElementById('reg-forms');
    const linkAccount = document.getElementById('link-account');


    fullNameElement.onkeydown = (e) => {
        if (!isNaN(parseInt(e.key))) {
            return false;
        }
    }


    usernameElement.addEventListener('input', function () {
        this.value = this.value.replace(/[.,]/g, '');
    });
    checkBoxElement.addEventListener('change', function () {
        if (checkBoxElement.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен');
        }
    })

    form.addEventListener('submit', registerFormListener)


    function registerFormListener(event) {
        event.preventDefault();
        const fullName = fullNameElement.value.trim();
        const email = emailElement.value.trim();
        const username = usernameElement.value.trim();
        const password = passwordElement.value;
        const repeatPassword = repeatPasswordElement.value;
        const agree = checkBoxElement.checked;


        if (!fullName) {
            myAlertMessage('Пожалуйста, введите имя.');
            return;
        }
        if (!username) {
            myAlertMessage('Пожалуйста, введите имя пользователя.');
            return;
        }
        if (!email) {
            myAlertMessage('Пожалуйста, введите email.');
            return;
        }
        if (!password) {
            myAlertMessage('Пожалуйста, введите пароль.');
            return;
        }
        if (!repeatPassword) {
            myAlertMessage('Пожалуйста, повторите пароль.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            myAlertMessage('Пожалуйста, введите корректный адрес электронной почты.');
            return;
        }

        if (password !== repeatPassword) {
            myAlertMessage('Пароли не совпадают.');
            return;
        }
        if (password.length < 8) {
            myAlertMessage('Пароль должен быть не менее 8 символов.');
            return;
        }

        if (!agree) {
            myAlertMessage('Вы должны согласиться с условиями обслуживания.');
            return;
        }

        myAlertPopUp('На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию');
        form.reset();
    }

    function alertButtonPopUp() {
        myAlert.style.display = 'none';
        showSignInPage()
    }

    function myAlertPopUp(message) {
        myAlert.style.display = 'flex';
        alertText.innerText = message;
        alertButton.addEventListener('click', alertButtonPopUp)
    }

    function myAlertMessage(message) {
        myAlert.style.display = 'flex';
        alertText.innerText = message;
        alertButton.removeEventListener('click', alertButtonPopUp);
        alertButton.addEventListener('click', alertButtonSimple)
    }

    function alertButtonSimple() {
        myAlert.style.display = 'none';

    }

    linkAccount.addEventListener('click', e => {
        e.preventDefault();
        showSignInPage();
    })


    function showSignInPage() {

        document.getElementById('repeat-password-label').style.display = 'none';
        document.getElementById('email-label').style.display = 'none';
        document.getElementById('full-name-label').style.display = 'none';
        document.getElementById('check-label').style.display = 'none';
        document.getElementById('button').innerText = 'Sign In';
        document.getElementById('form-info-title').innerText = 'Log in to the system';
        linkAccount.style.display = 'none';

        form.removeEventListener('submit', registerFormListener);
        form.addEventListener('submit', authorizationFormListener);

        function authorizationFormListener(event) {
            event.preventDefault();
            const password = passwordElement.value.trim();
            const username = usernameElement.value.trim();


            if (!username) {
                myAlertMessage('Пожалуйста, введите имя.');
                return;
            }

            if (!password) {
                myAlertMessage('Пожалуйста, введите пароль.');
                return;
            }

            myAlertMessage('Добро пожаловать, ' + username + '!')
        }
    }
}

console.log('hello world!')