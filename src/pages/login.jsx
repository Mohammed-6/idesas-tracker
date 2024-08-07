
import {useState} from 'react'
import {useUser} from '../lib/context/user'

export function Login(){
    const user = useUser();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    return (
        <section>
            <h1>Login or register</h1>
            <form>
                <input type="email" value={email} onChange={(e) => setemail(e.target.value)} />

                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                <div>
                    <button className='button' onClick={() => user.login(email, password)}>Login</button>
                    <button className='button' onClick={() => user.register(email, password)}>regsiter</button>
                </div>
            </form>
        </section>
    )
}