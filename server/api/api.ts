import { Application } from "express";
import { testEndpoint } from "./endpoints/test-endpoint";
import { testBodyEndpoint } from "./endpoints/test-body-endpoint";
import { listTest } from "./endpoints/test-list-endpoint";
import { search } from "./endpoints/search-title-endpoint";
import { topTen } from "./endpoints/top-10-vote-endpoint";
import { getByYear } from "./endpoints/get-by-year-endpoint";
import { testJoin } from "./endpoints/test-join";
import { categorySearch } from "./endpoints/custom-queries/search-by-category-endpoint";
import { actorSearch } from "./endpoints/join-queries/actor-search-endpoint";
import { getYearRange } from "./endpoints/year-range-endpoint";
import { countYearRange } from "./endpoints/count-year";
import { runTimeByYearRange } from "./endpoints/run-time-by-year";

export function initAPI (app:Application) {
    app.route('/api/test').get(testEndpoint);
    app.route('/api/body-test').post(testBodyEndpoint);
    app.route('/api/test-list').get(listTest);

    app.route('/api/search-title').post(search);

    app.route('/api/top10').post(topTen);
    app.route('/api/get-by-year').post(getByYear);
    app.route('/api/get-year-range').post(getYearRange);
    app.route('/api/count-by-year').post(countYearRange);
    app.route('/api/run-time-by-year').post(runTimeByYearRange);

    app.route('/api/join-test').post(testJoin);
    app.route('/api/actor-search').post(actorSearch);

    app.route('/api/custom-search').post(categorySearch);
}