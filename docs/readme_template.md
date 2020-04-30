<!--
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/aio-lib-analytics.svg)](https://npmjs.org/package/@adobe/aio-lib-analytics)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-lib-analytics.svg)](https://npmjs.org/package/@adobe/aio-lib-analytics)
[![Build Status](https://travis-ci.com/adobe/aio-lib-analytics.svg?branch=master)](https://travis-ci.com/adobe/aio-lib-analytics)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-lib-analytics.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-lib-analytics/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-lib-analytics/)

# Adobe I/O Adobe Analytics SDK
Javascript Core SDK wrapping [Adobe Analytics 2.0 APIs](https://adobedocs.github.io/analytics-2.0-apis/#/).


### Installing

```bash
$ npm install
```

### Usage
1) Initialize the SDK

```
var sdk = require('@adobe/aio-lib-analytics');

async function sdkTest() {
  //initialize sdk
  const analyticsClient = await sdk.init('<companyID>', 'x-api-key', '<valid auth token>')
}
```
Init method returns an Instance of Class [<code>AnalyticsCoreAPI</code>](#AnalyticsCoreAPI)

2) Call methods using initialized sdk

```
var sdk = require('@adobe/aio-lib-analytics');

async function sdkTest() {
    //initialize sdk
    const analyticsClient = await sdk.init('<companyID>', 'x-api-key', '<valid auth token>')

    //get report suites
    const collections = await analyticsClient.getCollections({limit:5, page:0})

    //get metrics
    const metrics = await analyticsClient.getMetrics(rsid)

    //generate report
    const report = await analyticsClient.getReport(queryJSON)
}
```
All Methods available under sdk are documented [<code>here</code>](#AnalyticsCoreAPI)

{{>main-index~}}

{{>all-docs~}}

### Debug Logs

LOG_LEVEL=debug  <your_call_here>

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
