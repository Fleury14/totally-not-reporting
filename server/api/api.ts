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
import { getAllClients } from "./endpoints/crm-queries/get-all-clients";
import { getClientNames } from "./endpoints/crm-queries/get-client-names";
import { getClientById } from "./endpoints/crm-queries/get-client-by-id";
import { getTypeById } from "./endpoints/crm-queries/get-type-name-by-id";
import { getBranchById } from "./endpoints/crm-queries/get-branch-by-id";
import { getEmployeeById } from "./endpoints/crm-queries/get-employee-by-id";

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

    app.route('/api/crm/get-all-clients').get(getAllClients);
    app.route('/api/crm/get-client-names').get(getClientNames);
    app.route('/api/crm/get-client-by-id').post(getClientById);
    app.route('/api/crm/get-type-by-id').post(getTypeById);
    app.route('/api/crm/get-branch-by-id').post(getBranchById);
    app.route('/api/crm/get-employee-by-id').post(getEmployeeById);
}