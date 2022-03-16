const fastify = require('fastify')({
    logger: true
});
const fetch = require('node-fetch');

const SPACEX_URL = 'https://api.spacexdata.com/v4';

fastify.get('/latest', async function (request, reply) {
    const response = await fetch(`${SPACEX_URL}/launches/latest`);
    const result = new Launch(await response.json());
    reply.send(result);
});

fastify.get('/next', async function (request, reply) {
    const response = await fetch(`${SPACEX_URL}/launches/next`);
    const result = new Launch(await response.json());
    reply.send(result);
});

fastify.get('/past', async function (request, reply) {
    const response = await fetch(`${SPACEX_URL}/launches/past`);
    const result = (await response.json()).map(x => new Launch(x));
    reply.send(result);
});

fastify.get('/upcoming', async function (request, reply) {
    const response = await fetch(`${SPACEX_URL}/launches/upcoming`);
    const result = (await response.json()).map(x => new Launch(x));
    reply.send(result);
});

fastify.listen(3001, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
});

class Launch {
    constructor (data) {
        this.id = data.id;
        this.name = data.name;
        this.details = data.details;
        this.success = data.success;
        this.rocket = data.rocket;
        this.flight_number = data.flight_number;
        this.upcoming = data.upcoming;
        this.date_utc = data.date_utc;
        this.imgs = {
            patch: data.links.patch.small,
            gallery: data.links.flickr.original
        };
        this.youtube_id = data.links.youtube_id;
    }
}