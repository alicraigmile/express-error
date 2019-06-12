import request from 'supertest';
import express from 'express';
import mocha from 'mocha';

const expressError = require('../src/express-error').default;

const { Router } = express;
const { describe } = mocha;
const { it } = mocha;

const router = Router({ mergeParams: true })
    .get('/a', async (req, res) => res.error.json(500, 'Software failure - very bad'))
    .get('/b', async (req, res) => res.error.html(500, 'Software failure - very bad'))
    .get('/b', async (req, res) => res.error.text(500, 'Software failure - very bad'));

const app = express();
app.use(expressError());
app.use(router);

describe('Status', () => {
    it('json error response', done => {
        request(app)
            .get('/a')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(err => (err ? done(err) : done()));
    });

    it('html error response', done => {
        request(app)
            .get('/a')
            .expect('Content-Type', /html/)
            .expect(500)
            .end(err => (err ? done(err) : done()));
    });

    it('text error response', done => {
        request(app)
            .get('/a')
            .expect('Content-Type', /text/)
            .expect(500)
            .end(err => (err ? done(err) : done()));
    });
});
