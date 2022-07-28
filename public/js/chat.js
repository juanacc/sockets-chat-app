// HTML References
const txtUid = document.querySelector('#txt-uid');
const txtMessage = document.querySelector('#txt-message');
const ulUsers = document.querySelector('#ul-users');
const ulMessage = document.querySelector('#ul-message');
const btnLeave = document.querySelector('#btn-leave');

let user = null;
let socket = null;
let url = (window.location.hostname.includes('localhost')) ? 'http://localhost:8080/api/auth/' : 'https://restserver-curso-node-jpa.herokuapp.com/api/auth/';

const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if(token.length <= 10){
        window.location = 'index.html';
        throw new Error('Invalid or non-existent token in the request')
    }

    const response = await fetch(url, {
        headers: {'x-token': token}
    });

    const {user: userDB, token: tokenDB} = await response.json(); //espero el user y lo renombro a userDB, lo mismo con el token
    localStorage.setItem('token', tokenDB); //renuevo el token
    user = userDB;
    document.title = user.name;
    await connectSocket();
}

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets online');
    });

    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });

    socket.on('server-receive-message', showMessage);

    socket.on('server-active-users', showUser);

    socket.on('server-private-message', (payload) => {
        console.log('Privado: ', payload);
    });
}

const showUser = (users = []) => {
    let usersHtml ='';
    users.forEach(({name, uid}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </>
            </li>
        `
    });
    ulUsers.innerHTML = usersHtml;
}

const showMessage = (messages = []) => {
    console.log(messages)
    let messagesHtml ='';
    messages.forEach(({name, message}) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${name}: </span>
                    <span>${message}</span>
                </>
            </li>
        `
    });
    ulMessage.innerHTML = messagesHtml;
}

txtMessage.addEventListener('keyup', (event) => {
    console.log(event.keyCode);
    const message = txtMessage.value;
    const uid = txtUid.value;
    if(event.keyCode !== 13)//keyCode = 13 es un enter
        return;
    if(message.length === 0) return;
    socket.emit('client-send-message', {message, uid});
    txtMessage.value = '';
})

const main = async () => {
    validateJWT();
}

main();