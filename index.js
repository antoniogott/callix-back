const fastify = require('fastify')({
    logger: true
});
const fastifyCors = require('fastify-cors');

fastify.register(fastifyCors);

fastify.register(require('./routes/v1/launch.js'), { prefix: '/v1/launch' });

fastify.listen(process.env.PORT || 3001, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is now listening on ${address}`);
});
