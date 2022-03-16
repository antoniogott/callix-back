const fastify = require('fastify')({
    logger: true
});
const fetch = require('node-fetch');

const SPACEX_URL = 'https://api.spacexdata.com/v4';

fastify.get('/latest', async function (request, reply) {
    const response = await fetch(`${SPACEX_URL}/launches/latest`);
    const data = await response.text();
    reply.send(data);
});

fastify.get('/next', function (request, reply) {
    reply.send({ hello: 'world' });
});

fastify.get('/past', function (request, reply) {
    reply.send({ hello: 'world' });
});

fastify.get('/upcoming', function (request, reply) {
    reply.send({ hello: 'world' });
});

fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
});