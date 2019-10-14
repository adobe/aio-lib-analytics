/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const sdk = require('../src/index')
const util = require("util")

var sdkClient = {}
const company = process.env['ANALYTICS_COMPANY']
const apiKey = process.env['ANALYTICS_APIKEY']
const token = process.env['ANALYTICS_TOKEN']
const rsid = process.env['ANALYTICS_RSID']

test('sdk init test', async () => {

  sdkClient = await sdk.init(company, apiKey, token)

  expect(sdkClient.companyId).toBe(company)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)

});

test('test getCollections', async () => {
  //check success response
  var res = await sdkClient.getCollections({limit:5, page:0})
  expect(res.totalElements).toEqual(6)
})

test('test getMetrics', async () => {
  //check success response
  const metrics = await sdkClient.getMetrics(rsid)
  expect(metrics.length).toEqual(99)

})
