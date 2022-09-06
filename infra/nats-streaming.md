# What is NATS streaming server?
NATS Streaming is a data streaming system powered by NATS. The executable name for the NATS Streaming server is nats-streaming-server. NATS Streaming embeds, extends, and interoperates seamlessly with the core NATS platform.

-------------------------------------------

# Docker Hub: https://hub.docker.com/_/nats-streaming

-------------------------------------------

# Communication with NATS
To communicate with NATS, we will use a client library called node-nats-streaming

Client library: https://www.npmjs.com/package/node-nats-streaming

-------------------------------------------

Practically, Events are being saved in memory.
NATS Streaming stores all events in memory (default), flat files or in a MySQL/Postgres DB

-------------------------------------------

NATS Streaming Server:

Option 1:
Publisher Program -> [Ingress-Nginx <--> NATS ClusterIP Service <--> NATS Pod]

Option 2:
Publisher program -> [NodePort Service <--> NATS Pod]

Option 3:
Publisher program -> [Port Forward Port 4222 <--> NATS Pod]

