// const logInbutton = document.getElementById('btn');
// const usernameField = document.getElementById('username');
// const passwordField = document.getElementById('password');
// const form = document.getElementById('form');

// logInbutton.addEventListener('click', function(event) {
//     event.preventDefault();

//     let userText = usernameField.value;
//     let passText = passwordField.value;
//     const devUser = "{{ dev_user }}";
//     const devPass = "{{ dev_pass }}";
//     const wesleyUser = "{{ wes_user";
//     const wesleyPass = " {{ wes_pass }}";

//     const isDev = (userText === devUser && passText === devPass);
//     const isWesley = (userText === wesleyUser && passText === wesleyPass);

//     if (isDev || isWesley) {
//         form.submit();
//     } else {
//         event.preventDefault();
//     }

// });