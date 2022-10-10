import {useState, useEffect } from 'react';
import Router from 'next/router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserShow = ({ user, currentUser }) => {
    console.log('====================================');
    console.log(user, currentUser);
    console.log('====================================');

    return (
            <div class="card">
                <div class="card-header">
                User
                </div>
                <div class="card-body">
                <h5 class="card-title">{user.email}</h5>
                <p class="card-text"></p>
                {/* <a  class="btn btn-primary" >Go Somewhere</a> */}
                </div>
            </div>
    );
};

UserShow.getInitialProps = async (context, client) => {
    const { userId } = context.query;
    const {data}= await client.get(`/api/users/${orderId}`);
    return { user: data };
};

export default UserShow;