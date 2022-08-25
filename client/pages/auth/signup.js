import {useState} from 'react';
import axios from 'axios';

export default ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event)=>{
        event.preventDefault();
        const form = event.target;

        console.log(form);
        console.log(email, password)
        
        var response =await axios.post('/api/users/signup', {
            email,
            password
        })
        console.log(response)
        
    }

    return <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}  className="form-control" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>

    </form>
}