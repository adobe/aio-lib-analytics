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

'use strict'

const Swagger = require('swagger-client')
const fs = require('fs')
const path = require('path')

function init (companyId, apiKey, token) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new AnalyticsCoreAPI()

    clientWrapper.init(companyId, apiKey, token)
      .then(initializedSDK => {
        console.log('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch(err => {
        console.log('sdk init error ' + err)
      })
  })
}

class AnalyticsCoreAPI {
  async init (companyId, apiKey, token) {
    // init swagger client
    const swaggerJsonPath = path.join(__dirname, './../spec/analytics_api.json')
    const swaggerJson = JSON.parse(fs.readFileSync(swaggerJsonPath, 'UTF-8'))
    const swagger = new Swagger({
      spec: swaggerJson,
      requestInterceptor: req => {
        this.__setHeaders(req, this)
      },
      usePromise: true
    })
    this.sdk = (await swagger)
    this.companyId = companyId
    this.apiKey = apiKey
    this.token = token
    return this
  }

  getCalculatedMetrics ({ calculatedMetricFilter, expansion, limit = 10, locale, name, ownerId, page = 0, rsids, tagNames } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.calculatedmetrics.findCalculatedMetrics(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getCalculatedMetrics - ' + err)
          reject(err)
        })
    })
  }

  getCalculatedMetricsById (id, { expansion, locale } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.calculatedmetrics.findOneCalculatedMetric(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getCalculatedMetricsById - ' + err)
          reject(err)
        })
    })
  }

  getCollections ({ expansion, limit = 10, page = 0, rsidContains, rsids } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.collections.getCollections(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getCollections - ' + err)
          reject(err)
        })
    })
  }

  getCollectionsById (rsid, { expansion } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.rsid = rsid
    return new Promise((resolve, reject) => {
      this.sdk.apis.collections.findOne(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getCollectionsById - ' + err)
          reject(err)
        })
    })
  }

  getDateRanges ({ expansion, filterByIds, limit = 10, locale, page = 0 } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.dateranges.getDateRanges(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getDateRanges - ' + err)
          reject(err)
        })
    })
  }

  getDateRangesById (dateRangeId, { expansion, locale } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.dateRangeId = dateRangeId
    return new Promise((resolve, reject) => {
      this.sdk.apis.dateranges.getDateRange(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getDateRangesById - ' + err)
          reject(err)
        })
    })
  }

  getDimensions ({ classifiable, expansion, locale, reportable, rsid, segmentable } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.dimensions.dimensions_getDimensions(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getDimensions - ' + err)
          reject(err)
        })
    })
  }

  getDimensionsById (dimensionId, rsid, { expansion, locale } = {}) {
    var params = (typeof arguments[2] === 'undefined') ? {} : arguments[2]
    params.dimensionId = dimensionId
    params.rsid = rsid
    return new Promise((resolve, reject) => {
      this.sdk.apis.dimensions.dimensions_getDimension(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getDimensionsById - ' + err)
          reject(err)
        })
    })
  }

  getMetrics (rsid, { expansion, locale, segmentable } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.rsid = rsid
    return new Promise((resolve, reject) => {
      this.sdk.apis.metrics.getMetrics(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getMetrics - ' + err)
          reject(err)
        })
    })
  }

  getMetricsById (id, rsid, { expansion, locale } = {}) {
    var params = (typeof arguments[2] === 'undefined') ? {} : arguments[2]
    params.rsid = rsid
    params.id = id
    return new Promise((resolve, reject) => {
      this.sdk.apis.metrics.getMetric(params, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getMetricsById - ' + err)
          reject(err)
        })
    })
  }

  getReport (body) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.runReport({}, this.__createRequest(body))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getReport - ' + err)
          reject(err)
        })
    })
  }

  getSegments ({ expansion, includeType, limit = 10, locale, name, page = 0, rsids, segmentFilter, tagNames } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.segments.segments_getSegments(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getSegments - ' + err)
          reject(err)
        })
    })
  }

  validateSegment (rsid) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.segments.segments_validateSegment({ rsid: rsid }, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling validateSegment - ' + err)
          reject(err)
        })
    })
  }

  getUsers ({ limit = 10, page = 0 } = {}) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.users.findAllUsers(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getUsers - ' + err)
          reject(err)
        })
    })
  }

  getCurrentUser () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.users.getCurrentUser({}, this.__createRequest({}))
        .then(response => {
          resolve(response.body)
        })
        .catch(err => {
          console.log('Error while calling getCurrentUser - ' + err)
          reject(err)
        })
    })
  }

  __createRequest (body, query) {
    return {
      requestBody: body,
      'server': 'https://analytics.adobe.io/api/{companyId}/',
      serverVariables: {
        companyId: this.companyId
      }
    }
  }

  __setHeaders (req, coreAPIInstance) {
    // set headers required for Analytics API calls
    if (!req.headers['x-api-key']) {
      req.headers['x-api-key'] = coreAPIInstance.apiKey
    }
    if (!req.headers['x-proxy-global-company-id']) {
      req.headers['x-proxy-global-company-id'] = coreAPIInstance.companyId
    }
    if (!req.headers['Authorization']) {
      req.headers['Authorization'] = 'Bearer ' + coreAPIInstance.token
    }
    if (!req.headers['Content-Type']) {
      req.headers['Content-Type'] = 'application/json'
    }
  }
}

module.exports = {
  init: init
}
