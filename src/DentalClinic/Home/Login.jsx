export const Login = () => {
    const login = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var credentials = JSON.stringify({
            "username": e.target.username.value,
            "password":e.target.password.value
          });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: credentials,
            redirect: 'follow'
        };
        
        fetch("http://localhost:8080/authenticate", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                sessionStorage.setItem("jwt", data.jwt)
                console.log(sessionStorage.jwt);
                window.location.replace("")
            })
            
            .catch(error => console.log('error', error));
    }
    return (
        <form action="" className="flex d-col align justify mb-3" onSubmit={login}>
            <input id="username" type="text" placeholder="Username" />
            <input id="password" type="password" placeholder="********" />
            <input type="submit" value="Login" className="btn btn-primary px-5 py-2"/>
        </form>
    )
}