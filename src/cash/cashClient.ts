import { createClient } from "redis";

const client = createClient({
    username: 'default',
    password: '9A9JZHho3YECKguKxxWoirSaRrapXe3k',
    socket: {
        host: 'redis-10772.crce176.me-central-1-1.ec2.redns.redis-cloud.com',
        port: 10772
    }
});

client.on('error', err => console.log('Redis Client Error', err));

export default client;

