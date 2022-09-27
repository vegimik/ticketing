# Postman testing: Process flow

1.  Sign in with your user's credentials.

2. Create a new ticket.

3. Create an order for that ticket.

4. Send payment for that order within 60 seconds of the initial order.

You should see some Skaffold output similar to below:

[tickets] Event published to subject ticket:created

[orders] Message received: ticket:created / orders-service

[orders] Event published to subject order:created

[tickets] Message received: order:created / tickets-service

[expiration] Message received: order:created / expiration-service

[payments] Message received: order:created / payments-service

[expiration] Waiting this many milliseconds to process the job: 59959

[tickets] Event published to subject ticket:updated

[orders] Message received: ticket:updated / orders-service

[orders] Message received: payment:created / orders-service

[payments] Event published to subject payment:created

[expiration] Event published to subject expiration:complete

[orders] Message received: expiration:complete / orders-service