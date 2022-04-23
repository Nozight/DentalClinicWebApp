export const Register = () => {
    const register = (e) => {
        e.preventDefault()
        console.log(e.target.username.value);
        var user = {
            name:e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password:e.target.password.value};

        var requestOptions = {
            method: 'POST',
            body: user.toString(),
            redirect: 'follow'
        };

        fetch("http://localhost:8080/register", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <form action="" className="flex d-col align justify mb-3" onSubmit={register}>
            <input id="name" type="text" placeholder="Name" />
            <input id="username" type="text" placeholder="Username" />
            <input id="password" type="password" placeholder="********" />
            <input id="email" type="email" placeholder="example@gmail.com" />
            <input type="submit" value="Register" className="btn btn-primary px-5 py-2" />
        </form>
    )
}