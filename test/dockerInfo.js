'use strict';
const chai = require('chai');
const should = chai.should();
const expect = require('chai').expect;
const nock = require('nock');


describe('#getDockerInfo', () => {

    let cadvisorApi;
    let requestHost;
    let requestPort;
    let requestVersion;
    let requestUri;

    it('request with default hostname and port', () => {
        requestHost = 'localhost';
        requestPort = 8080;
        requestVersion = 'v1.3';
        requestUri = `/api/${requestVersion}/docker/`;

        cadvisorApi = require('./../lib/cadvisor-api')();

        nock(`http://${requestHost}:${requestPort}`)
            .get(requestUri)
            .reply(200, function (uri, requestBody, cb) {
                this.req.headers.should.be.instanceof(Object);
                this.req.headers.should.have.property('host', `${requestHost}:${requestPort}`);
                uri.should.equal(requestUri);
            });

        cadvisorApi.getDockerInfo();

    });

    it('request with custom hostname,port and version', () => {
        requestHost = 'git.hub';
        requestPort = 8787;
        requestVersion = 'v1.2';
        requestUri = `/api/${requestVersion}/docker/`;

        cadvisorApi = require('./../lib/cadvisor-api')(
            {
                hostname: requestHost,
                port: requestPort,
                version : requestVersion
            }
            );

        nock(`http://${requestHost}:${requestPort}`)
            .get(requestUri)
            .reply(200, function (uri, requestBody, cb) {
                this.req.headers.should.be.instanceof(Object);
                this.req.headers.should.have.property('host', `${requestHost}:${requestPort}`);
                uri.should.equal(requestUri);
            });

        cadvisorApi.getDockerInfo();

    });

    it('request with custom container data', () => {
        let containerName = 'data';
        requestHost = 'git.hub';
        requestPort = 8787;
        requestVersion = 'v1.3';
        requestUri = `/api/${requestVersion}/docker/${containerName}`;

        cadvisorApi = require('./../lib/cadvisor-api')(
            {
                hostname: requestHost,
                port: requestPort
            }
            );

        nock(`http://${requestHost}:${requestPort}`)
            .get(requestUri)
            .reply(200, function (uri, requestBody, cb) {
                this.req.headers.should.be.instanceof(Object);
                this.req.headers.should.have.property('host', `${requestHost}:${requestPort}`);
                uri.should.equal(requestUri);
            });

        cadvisorApi.getDockerInfo(containerName);

    });
    
});

