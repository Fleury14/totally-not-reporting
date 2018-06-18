import { Application } from "express";
import { testEndpoint } from "./endpoints/test-endpoint";
import { testBodyEndpoint } from "./endpoints/test-body-endpoint";
import { listTest } from "./endpoints/test-list-endpoint";

export function initAPI (app:Application) {
    app.route('/api/test').get(testEndpoint);
    app.route('/api/body-test').post(testBodyEndpoint);
    app.route('/api/test-list').get(listTest);
}