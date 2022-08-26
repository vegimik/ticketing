import {useState} from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {email, password},
        onSuccess: ()=>Router.push('/')
    });

    const onSubmit = async (event)=>{
        event.preventDefault();
        const form = event.target;
        
        await doRequest()
        Router.push('/');   
    }

    return <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}  className="form-control" id="password" placeholder="Password" />
        </div>
        {errors}
        <button type="submit" className="btn btn-primary">Submit</button>

    </form>
}