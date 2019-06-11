const request = require('supertest');
const express = require('express');
const Router = express.Router;
const expressError  = require('../src/express-error');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const expect = require('chai').expect;

const app = express();
app.use(expressError());
import { Router } from 'express';

const router = Router({ mergeParams: true })
    .get('/a', async (req, res) => res.error.json(500, 'Software failure - very bad'))
    .get('/b', async (req, res) => res.error.html(500, 'Software failure - very bad'))
    .get('/b', async (req, res) => res.error.text(500, 'Software failure - very bad'));


describe('Status', () => {
    it('json error response', done => {
        request(app)
            .get('/a')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(err => (err ? done(err) : done()));

    it('html error response', done => {
        request(app)
            .get('/a')
            .expect('Content-Type', /html/)
            .expect(500)
            .end(err => (err ? done(err) : done()));

    it('text error response', done => {
        request(app)
            .get('/a')
            .expect('Content-Type', /text/)
            .expect(500)
            .end(err => (err ? done(err) : done()));
    });

});
