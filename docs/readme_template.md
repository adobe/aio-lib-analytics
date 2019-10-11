# I/O CNA Adobe Analytics Core SDK
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
