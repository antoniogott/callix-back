const fetch = require('node-fetch');

const SPACEX_URL = 'https://api.spacexdata.com/v4';

module.exports = function (fastify, opts, done) {
    fastify.get('/latest', async function (request, reply) {
        const response = await fetch(`${SPACEX_URL}/launches/latest`);
        const result = new Launch(await response.json());
        const rocket = await fetch(`${SPACEX_URL}/rockets/${result.rocketId}`);
        result.rocket = new Rocket(await rocket.json());
        reply.send(result);
    });

    fastify.get('/next', async function (request, reply) {
        const response = await fetch(`${SPACEX_URL}/launches/next`);
        const result = new Launch(await response.json());
        const rocket = await fetch(`${SPACEX_URL}/rockets/${result.rocketId}`);
        result.rocket = new Rocket(await rocket.json());
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

    fastify.get('/:id', async function (request, reply) {
        const response = await fetch(`${SPACEX_URL}/launches/${request.params.id}`);
        const result = new Launch(await response.json());
        const rocket = await fetch(`${SPACEX_URL}/rockets/${result.rocketId}`);
        result.rocket = new Rocket(await rocket.json());
        reply.send(result);
    });

    done();
};

class Launch {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.details = data.details;
        this.success = data.success;
        this.rocketId = data.rocket;
        this.rocket = undefined;
        this.date_utc = data.date_utc;
        this.patch = data.links.patch.small;
        this.imgs = data.links.flickr.original;
        this.youtube_id = data.links.youtube_id;
    }
}

class Rocket {
    constructor(data) {
        this.name = data.name;
        this.wikipedia = data.wikipedia;
        this.imgs = data.flickr_images;
    }
}