import {useState, useEffect } from 'react';
import Router from 'next/router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const UserShow = ({ user, currentUser }) => {
    console.log('====================================');
    console.log(user, currentUser);
    console.log('====================================');

    return (
        <div>  
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>User</Card.Title>
                <Card.Text>
                    {user.email}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        </div>
    );
};

UserShow.getInitialProps = async (context, client) => {
    const { userId } = context.query;
    const {data}= await client.get(`/api/users/${orderId}`);
    return { user: data };
};

export default UserShow;