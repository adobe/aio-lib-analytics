# Adobe Analytics SDK
Javascript SDK for Adobe Analytics APIs.


### Installing 

```bash
$ npm install
```

### Usage
```

var sdk = require('adobeio-cna-core-analytics');

//initialize sdk
const analyticsClient = await sdk.init('<companyID>', 'x-api-key', '<valid auth token>')

//call methods

    //get report suites
    const collections = await analyticsClient.getCollections({limit:5, page:0})

    //get metrics
    const metrics = await analyticsClient.getMetrics(rsid)


    //generate report
    // const report = await analyticsClient.getReport(queryJSON)
``` 

### Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
