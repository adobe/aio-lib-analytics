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
const path = require('path')

// load .env values in the e2e folder, if any
require('dotenv').config({ path: path.join(__dirname, '.env') })

var sdkClient = {}
const company = process.env.ANALYTICS_COMPANY
const apiKey = process.env.ANALYTICS_APIKEY
const token = process.env.ANALYTICS_TOKEN
const rsid = process.env.ANALYTICS_RSID

test('sdk init test', async () => {
  sdkClient = await sdk.init(company, apiKey, token)

  expect(sdkClient.companyId).toBe(company)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
})

test('test getCollections', async () => {
  // check success response
  var res = await sdkClient.getCollections({ limit: 5, page: 0 })
  expect(res.status).toEqual(200)
})

test('test getMetrics', async () => {
  // check success response
  const res = await sdkClient.getMetrics(rsid)
  expect(res.status).toEqual(200)
})

test('test getCalculatedMetrics', async () => {
  // check success response
  const res = await sdkClient.getCalculatedMetrics()
  expect(res.status).toEqual(200)
})

test('test getDateRanges', async () => {
  // check success response
  const res = await sdkClient.getDateRanges()
  expect(res.status).toEqual(200)
})

test('test getDimensions', async () => {
  // check success response
  const res = await sdkClient.getDimensions(rsid)
  expect(res.status).toEqual(200)
})

test('test getSegments', async () => {
  // check success response
  const res = await sdkClient.getSegments()
  expect(res.status).toEqual(200)
})
