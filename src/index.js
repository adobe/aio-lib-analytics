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
const { codes } = require('./SDKErrors')
const logger = require('@adobe/aio-lib-core-logging')('aio-lib-analytics', { level: process.env.LOG_LEVEL })

/**
* Returns a Promise that resolves with a new AnalyticsCoreAPI object.
*
* @param companyId {string} company ID to be used with Adobe Analytics.
* @param apiKey {string} Your api key
* @param token {string} Valid auth token
* @returns {Promise<AnalyticsCoreAPI>}
*/
function init (companyId, apiKey, token) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new AnalyticsCoreAPI()

    clientWrapper.init(companyId, apiKey, token)
      .then(initializedSDK => {
        logger.debug('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch(err => {
        logger.debug(`sdk init error: ${err}`)
        reject(err)
      })
  })
}

/**
* This class provides methods to call Adobe Analytics APIs.
* Before calling any method initialize the instance by calling init method on it
* with valid company id, apiKey and auth token
*/
class AnalyticsCoreAPI {
  /** Initialize sdk.
  *
  * @param companyId {string} company ID to be used with Adobe Analytics.
  * @param apiKey {string} Your api key
  * @param token {string} Valid auth token
  * @returns {AnalyticsCoreAPI}
  */
  async init (companyId, apiKey, token) {
    const initErrors = []
    if (!companyId) {
      initErrors.push('companyId')
    }
    if (!apiKey) {
      initErrors.push('apiKey')
    }
    if (!token) {
      initErrors.push('token')
    }

    if (initErrors.length) {
      const sdkDetails = { companyId, apiKey, token }
      throw new codes.ERROR_SDK_INITIALIZATION({ sdkDetails, messageValues: `${initErrors.join(', ')}` })
    } else {
      // init swagger client
      const spec = require('../spec/analytics_api.json')
      const swagger = new Swagger({
        spec: spec,
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
  }

  /** Retrieve many calculated metrics.
  * A calculated metric response will always include these default items: *id, name, description, rsid, owner, polarity, precision, type
  * Other attributes can be optionally requested through the 'expansion' field:\n\n*
  *     modified: Date that the metric was last modified (ISO 8601)
  *     definition: Calculated metric definition as JSON object
  *     compatibility: Products that the metric is compatible with
  *     reportSuiteName*: Also return the friendly Report Suite name for the RSID
  *     tags*: Gives all existing tags associated with the calculated metric
  *
  * For more information about calculated metrics go [here](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/calculatedmetrics.md)
  *
  * @param options {Object} to control calculated metrics search.
  * @param options.calculatedMetricFilter Filter list to only include calculated metrics in the specified list\n(comma-delimited list of IDs).
  * @param options.expansion Comma-delimited list of additional metadata fields\nto include on response.
  * @param options.limit Number of results per page. Default 10.
  * @param options.locale Locale.
  * @param options.name Filter list to only include calculated metrics that contains the Name.
  * @param options.ownerId Filter list to only include calculated metrics owned by the\nspecified loginId.
  * @param options.page Page number (base 0 - first page is \"0\"). Default 0.
  * @param options.rsids Filter list to only include calculated metrics tied to specified\nRSID list (comma-delimited).
  * @param options.tagNames Filter list to only include calculated metrics that contains one of\nthe tags.
  */
  getCalculatedMetrics ({ calculatedMetricFilter, expansion, limit = 10, locale, name, ownerId, page = 0, rsids, tagNames } = {}) {
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.calculatedmetrics.findCalculatedMetrics(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_CALCULATED_METRICS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Retrieve a single calculated metric by id.
  * A calculated metric response will always include these default items: *id, name, description, rsid, owner, polarity, precision, type
  * Other attributes can be optionally requested through the 'expansion' field:\n\n*
  *     modified: Date that the metric was last modified (ISO 8601)
  *     definition: Calculated metric definition as JSON object
  *     compatibility: Products that the metric is compatible with
  *     reportSuiteName*: Also return the friendly Report Suite name for the RSID
  *     tags*: Gives all existing tags associated with the calculated metric
  *
  * For more information about calculated metrics go [here](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/calculatedmetrics.md)
  * @param id {string} The calculated metric ID to retrieve.
  * @param options {Object} to control calculated metric result
  * @param options.expansion Comma-delimited list of additional metadata fields\nto include on response.
  * @param options.locale Locale.
  */
  getCalculatedMetricById (id, { expansion, locale } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.id = id
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.calculatedmetrics.findOneCalculatedMetric(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_CALCULATED_METRIC_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Retrieves report suites that match the given filters.
  * Returns all report suite types in a single collection.
  *
  * @param options {Object} to control report suites search.
  * @param options.expansion Comma-delimited list of additional metadata fields to include on\nresponse.
  * @param options.limit Number of results per page. Default 10.
  * @param options.page Page number (base 0 - first page is \"0\"). Default 0.
  * @param options.rsids Filter list to only include suites in this RSID list\n(comma-delimited).
  * @param options.rsidContains Filter list to only include suites whose rsid contains rsidContains.
  */
  getCollections ({ expansion, limit = 10, page = 0, rsidContains, rsids } = {}) {
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.collections.getCollections(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_COLLECTIONS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Retrieves report suite by id.
  * Returns all report suite types in a single collection.
  *
  * @param rsid {string} The rsid of the suite to return.
  * @param options {Object} to control eport suites search.
  * @param options.expansion Comma-delimited list of additional metadata fields to include on\nresponse.
  */
  getCollectionById (rsid, { expansion } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.rsid = rsid
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.collections.findOne(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_COLLECTION_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Returns a list of dateranges for the user.
  * This function allows users to store commonly used date ranges so that they\ncan be reused throughout the product.
  *
  * @param options {Object} to control date range search.
  * @param options.expansion Comma-delimited list of additional metadata fields to include on\nresponse.
  * @param options.filterByIds Filter list to only include date ranges in the specified list\n(comma-delimited list of IDs).
  * @param options.limit Number of results per page. Default 10.
  * @param options.locale Locale.
  * @param options.page Page number (base 0 - first page is \"0\"). Default 0.
  */
  getDateRanges ({ expansion, filterByIds, limit = 10, locale, page = 0 } = {}) {
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.dateranges.getDateRanges(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_DATE_RANGES({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Retrieves configuration for a DateRange..
  *
  * @param dateRangeId {string} The DateRange id for which to retrieve information.
  * @param options {Object} to control date range result.
  * @param options.expansion Comma-delimited list of additional metadata fields to include on\nresponse.
  * @param options.locale Locale.
  */
  getDateRangeById (dateRangeId, { expansion, locale } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.dateRangeId = dateRangeId
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.dateranges.getDateRange(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_DATE_RANGE_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Returns a list of dimensions for a given report suite.
  *
  * @param rsid {string} A Report Suite ID.
  * @param options {Object} to control dimensions search.
  * @param options.classifiable Only include classifiable dimensions.
  * @param options.expansion Comma-delimited list of additional metadata fields\nto include on response.
  * @param options.locale Locale.
  * @param options.reportable Only include dimensions that are valid within a report.
  * @param options.segmentable Only include dimensions that are valid within a segment.
  */
  getDimensions (rsid, { classifiable, expansion, locale, reportable, segmentable } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.rsid = rsid
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.dimensions.dimensions_getDimensions(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_DIMENSIONS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Returns a dimension for the given report suite and dimension Id.
  *
  * @param dimensionId {string} The dimension ID. For example a valid id is a value like 'evar1'.
  * @param rsid {string} A Report Suite ID.
  * @param options {Object} to control dimension result.
  * @param options.expansion Comma-delimited list of additional metadata fields\nto include on response.
  * @param options.locale Locale.
  */
  getDimensionById (dimensionId, rsid, { expansion, locale } = {}) {
    var params = (typeof arguments[2] === 'undefined') ? {} : arguments[2]
    params.dimensionId = dimensionId
    params.rsid = rsid
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.dimensions.dimensions_getDimension(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_DIMENSION_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Returns a list of metrics for the given report suite.
  * This returns the metrics list primarily for the Analytics product.
  * The platform identity API Returns a list of all possible metrics for the supported systems.
  *
  * @param rsid {string} A Report Suite ID.
  * @param options {Object} to control dimension result.
  * @param options.expansion Comma-delimited list of additional metadata fields\nto include on response.
  * @param options.locale Locale that system named metrics should be returned in.
  * @param options.segmentable Filter the metrics by if they are valid in a segment.
  */
  getMetrics (rsid, { expansion, locale, segmentable } = {}) {
    var params = (typeof arguments[1] === 'undefined') ? {} : arguments[1]
    params.rsid = rsid
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.metrics.getMetrics(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_METRICS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Returns a metric for the given report suite.
  * This returns the metrics list primarily for the Analytics product.
  * The platform identity API Returns a list of all possible metrics for the supported systems.
  *
  * @param id {string} The id of the metric for which to retrieve info. Note ids are values\nlike pageviews, not metrics/pageviews.
  * @param rsid {string} A Report Suite ID.
  * @param options {Object} to control dimension result.
  * @param options.expansion Comma-delimited list of additional metadata fields\nto include on response.
  * @param options.locale Locale that system named metrics should be returned in.
  */
  getMetricById (id, rsid, { expansion, locale } = {}) {
    var params = (typeof arguments[2] === 'undefined') ? {} : arguments[2]
    params.rsid = rsid
    params.id = id
    const sdkDetails = params
    return new Promise((resolve, reject) => {
      this.sdk.apis.metrics.getMetric(params, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_METRIC_BY_ID({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Runs a report for the request.
  * See the [Reporting User\nGuide](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/reporting-guide.md) for details.
  *
  * @param body {Object} report query.
  */
  getReport (body) {
    const sdkDetails = body
    return new Promise((resolve, reject) => {
      this.sdk.apis.reports.runReport({}, this.__createRequest(body))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_REPORT({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Retrieve All Segments.
  *
  * @param options {Object} to control segments search.
  * @param options.expansion Comma-delimited list of additional metadata fields\nto include on response.
  * @param options.includeType Include additional segments not owned by user. The \"all\" option\ntakes precedence over \"shared\".
  * @param options.limit Number of results per page. Default 10.
  * @param options.locale Locale that system named metrics should be returned in.
  * @param options.name Filter list to only include segments that contains the Name.
  * @param options.page Page number (base 0 - first page is \"0\"). Default 0.
  * @param options.rsids Filter list to only include segments tied to specified RSID list\n(comma-delimited).
  * @param options.segmentFilter Filter list to only include segments in the specified list\n(comma-delimited list of IDs).
  * @param options.tagNames Filter list to only include segments that contains one of the tags.
  */
  getSegments ({ expansion, includeType, limit = 10, locale, name, page = 0, rsids, segmentFilter, tagNames } = {}) {
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.segments.segments_getSegments(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_SEGMENTS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Validate a Segment.
  * Returns a segment validation for the segment contained in the post body of the report.
  *
  * @param rsid {string} A Report Suite ID.
  * @param body {Object} JSON Segment Definition.
  */
  validateSegment (rsid, body) {
    const sdkDetails = { rsid, body }
    return new Promise((resolve, reject) => {
      this.sdk.apis.segments.segments_validateSegment({ rsid: rsid }, this.__createRequest(body))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_VALIDATE_SEGMENT({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Returns a list of users for the current user's login company.
  * Retrieves a list of all users for the company designated by the auth\ntoken.
  *
  * @param options {Object} to control user search.
  * @param options.limit Number of results per page. Default 10.
  * @param options.page Page number (base 0 - first page is \"0\"). Default 0.
 */
  getUsers ({ limit = 10, page = 0 } = {}) {
    const sdkDetails = arguments[0]
    return new Promise((resolve, reject) => {
      this.sdk.apis.users.findAllUsers(arguments[0], this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_USERS({ sdkDetails, messageValues: err }))
        })
    })
  }

  /** Get the current user. */
  getCurrentUser () {
    const sdkDetails = {}
    return new Promise((resolve, reject) => {
      this.sdk.apis.users.getCurrentUser({}, this.__createRequest({}))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(new codes.ERROR_GET_CURRENT_USER({ sdkDetails, messageValues: err }))
        })
    })
  }

  __createRequest (body, query) {
    return {
      requestBody: body,
      server: 'https://analytics.adobe.io/api/{companyId}/',
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
    if (!req.headers.Authorization) {
      req.headers.Authorization = 'Bearer ' + coreAPIInstance.token
    }
    if (!req.headers['Content-Type']) {
      req.headers['Content-Type'] = 'application/json'
    }
  }
}

module.exports = {
  init: init
}
