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

var fetchMock = require('fetch-mock');
const sdk = require('../src')
const mock = require("./mock")
const company = "test-company"
const apiKey = "test-apikey"
const token = "test-token"
var sdkClient = {}
var util = require("util")

function mockResponseWithMethod (url, method, response) {
  fetchMock.reset()
  fetchMock.mock((u, opts) => u === url && opts.method === method, response)
}

test('sdk init test', async () => {

  sdkClient = await sdk.init(company, apiKey, token)


  expect(sdkClient.companyId).toBe(company)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
 
});

test('test getCalculatedMetrics', async () => {
  const url = "https://analytics.adobe.io/api/test-company/calculatedmetrics"
  const method = "GET"
  const api = "getCalculatedMetrics"

  mockResponseWithMethod(url, method, mock.data.calculatedMetrics)
  //check success response
  var res = await sdkClient.getCalculatedMetrics()
  expect(res.length).toEqual(1)
  expect(res[0].id).toEqual("123")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Bad_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Bad_Request.message)
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Unauthorized_Request.message)
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Forbidden_Request.message)
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message)
})

test('test getCalculatedMetricsById', async () => {
  const url = "https://analytics.adobe.io/api/test-company/calculatedmetrics/123"
  const method = "GET"
  const api = "getCalculatedMetricsById"

  mockResponseWithMethod(url, method, mock.data.calculatedMetric)
  //check success response
  var res = await sdkClient.getCalculatedMetricsById(123)
  expect(res.id).toEqual("123")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Forbidden_Request.message, [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message, [123])
})

test('test getCollections', async () => {
  const url = "https://analytics.adobe.io/api/test-company/collections/suites"
  const method = "GET"
  const api = "getCollections"

  mockResponseWithMethod(url, method, mock.data.collections)
  //check success response
  var res = await sdkClient.getCollections()
  expect(res.length).toEqual(1)
  expect(res[0].name).toEqual("testcollection")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message)
})

test('test getCollectionsById', async () => {
  const url = "https://analytics.adobe.io/api/test-company/collections/suites/123"
  const method = "GET"
  const api = "getCollectionsById"

  mockResponseWithMethod(url, method, mock.data.collection)
  //check success response
  var res = await sdkClient.getCollectionsById(123)
  expect(res.rsid).toEqual("123")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Forbidden_Request.message, [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message, [123])
})

test('test getDateRanges', async () => {
  const url = "https://analytics.adobe.io/api/test-company/dateranges"
  const method = "GET"
  const api = "getDateRanges"

  mockResponseWithMethod(url, method, mock.data.dateRanges)
  //check success response
  var res = await sdkClient.getDateRanges()
  expect(res.length).toEqual(1)
  expect(res[0].id).toEqual("123")
})

test('test getDateRangesById', async () => {
  const url = "https://analytics.adobe.io/api/test-company/dateranges/123"
  const method = "GET"
  const api = "getDateRangesById"

  mockResponseWithMethod(url, method, mock.data.dateRange)
  //check success response
  var res = await sdkClient.getDateRangesById(123)
  expect(res.id).toEqual("123")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message, [123])
})

test('test getDimensions', async () => {
  const url = "https://analytics.adobe.io/api/test-company/dimensions?rsid=123"
  const method = "GET"
  const api = "getDimensions"

  mockResponseWithMethod(url, method, mock.data.dimensions)
  //check success response
  var res = await sdkClient.getDimensions(123)
  expect(res.length).toEqual(1)
  expect(res[0].id).toEqual("111")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Bad_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Bad_Request.message, [123])
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Unauthorized_Request.message, [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message, [123])
})

test('test getDimensionsById', async () => {
  const url = "https://analytics.adobe.io/api/test-company/dimensions/111?rsid=123"
  const method = "GET"
  const api = "getDimensionsById"

  mockResponseWithMethod(url, method, mock.data.dimension)
  //check success response
  var res = await sdkClient.getDimensionsById(111, 123)
  expect(res.id).toEqual("111")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Unauthorized_Request.message,[111,123])
})

test('test getMetrics', async () => {
  const url = "https://analytics.adobe.io/api/test-company/metrics?rsid=123"
  const method = "GET"
  const api = "getMetrics"

  mockResponseWithMethod(url, method, mock.data.metrics)
  //check success response
  var res = await sdkClient.getMetrics(123)
  expect(res.length).toEqual(1)
  expect(res[0].id).toEqual("111")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Bad_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Bad_Request.message, [123])
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Forbidden_Request.message, [123])
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message, [123])
})

test('test getMetricsById', async () => {
  const url = "https://analytics.adobe.io/api/test-company/metrics/111?rsid=123"
  const method = "GET"
  const api = "getMetricsById"

  mockResponseWithMethod(url, method, mock.data.metric)
  //check success response
  var res = await sdkClient.getMetricsById(111, 123)
  expect(res.id).toEqual("111")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Unauthorized_Request.message,[111,123])
})

test('test getReport', async () => {
  const url = "https://analytics.adobe.io/api/test-company/reports"
  const method = "POST"
  const api = "getReport"

  mockResponseWithMethod(url, method, mock.data.report)
  //check success response
  var res = await sdkClient.getReport(mock.data.reportReq)
  expect(res.totalPages).toEqual(10)
  expect(res.numberOfElements).toEqual(100)

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Bad_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Bad_Request.message, [{}])
})

test('test getSegments', async () => {
  const url = "https://analytics.adobe.io/api/test-company/segments"
  const method = "GET"
  const api = "getSegments"

  mockResponseWithMethod(url, method, mock.data.segments)
  //check success response
  var res = await sdkClient.getSegments()
  expect(res.length).toEqual(1)
  expect(res[0].id).toEqual("111")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Bad_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Bad_Request.message)
  mockResponseWithMethod(url, method, mock.errors.Unauthorized_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Unauthorized_Request.message)
  mockResponseWithMethod(url, method, mock.errors.Forbidden_Request.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Forbidden_Request.message)
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message)
})

test('test getUsers', async () => {
  const url = "https://analytics.adobe.io/api/test-company/users"
  const method = "GET"
  const api = "getUsers"

  mockResponseWithMethod(url, method, mock.data.users)
  //check success response
  var res = await sdkClient.getUsers()
  expect(res.length).toEqual(1)
  expect(res[0].companyid).toEqual("123")
})

test('test getCurrentUser', async () => {
  const url = "https://analytics.adobe.io/api/test-company/users/me"
  const method = "GET"
  const api = "getCurrentUser"

  mockResponseWithMethod(url, method, mock.data.user)
  //check success response
  var res = await sdkClient.getCurrentUser()
  expect(res.companyid).toEqual("123")

  //check error responses
  mockResponseWithMethod(url, method, mock.errors.Internal_Server_Error.err)
  res = await checkErrorResponse(api, url, method, mock.errors.Internal_Server_Error.message)
})

function checkErrorResponses(fn, url, method, args) {
  var mockMethod = mockResponseWithMethod
  const client = sdkClient
  return new Promise((resolve, reject) => {
    for(var i=0; i < mock.errors.length; i++) {
      var errObj = mock.errors[i]
      mockMethod(url, method, errObj.err)

      checkErrorResponse(fn, url, method, errObj.message, args)
      .then(res => {
        //continue
      })
      .catch(e => {
        reject(e)
      })
    }
    resolve()
  })
}

function checkErrorResponse(fn, url, method, error, args = []) {
  const client = sdkClient
  return new Promise((resolve, reject) => {

    (client[fn](args[0], args[1]))
    .then(res => {
      var ret = 
      reject(" No error response")
    })
    .catch(e => {
      expect(e).toEqual(new Error(error))
      resolve()
    })
  })
}