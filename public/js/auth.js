const loginForm = document.querySelector('form');

let url = (window.location.hostname.includes('localhost')) ? 'http://localhost:8080/api/auth/' : 'https://restserver-curso-node-jpa.herokuapp.com/api/auth/';

loginForm.addEventListener('submit', event => {
    event.preventDefault(); //evito hacer el refresh del browser
    const formData = {}
    for(let el of loginForm.elements){
        if(el.namespaceURI.length > 0)
            formData[el.name] = el.value;
    }
    fetch(url + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data.body.token);
        if(data.statusCode !== 200)
            return console.error(data.body);
        localStorage.setItem('token', data.body.token)
    })
    .catch(error => {
        console.log(error);
    });
})

function handleCredentialResponse(response) {
    //Google Token:ID_TOKEN
    console.log('id_token', response.credential);
    const body = { id_token: response.credential };

    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(resp => {
            //seteo el email en el local storage ya que lo necesito para hacer el logout
            localStorage.setItem('email', resp.body.user.email);
            //console.log(resp);
            //console.log('TOKEN', resp.body.token);
            localStorage.setItem('token', resp.body.token);
        })
        .catch(console.warn);
}
const button = document.getElementById('google_signout');

button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear(); //limpio el correo electronico que tenia almacenado
        location.reload(); //recargo la pagina
    });
}