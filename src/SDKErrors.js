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

const { ErrorWrapper, createUpdater } = require('@adobe/aio-lib-core-errors').AioCoreSDKErrorWrapper

const codes = {}
const messages = new Map()

/**
 * Create an Updater for the Error wrapper
 */
const Updater = createUpdater(
  // object that stores the error classes (to be exported)
  codes,
  // Map that stores the error strings (to be exported)
  messages
)

/**
 * Provides a wrapper to easily create classes of a certain name, and values
 */
const E = ErrorWrapper(
  // The class name for your SDK Error. Your Error objects will be these objects
  'AnalyticsSDKError',
  // The name of your SDK. This will be a property in your Error objects
  'AnalyticsSDK',
  // the object returned from the CreateUpdater call above
  Updater
  // the base class that your Error class is extending. CNACoreSDKError is the default
  /* CNACoreSDKError, */
)

module.exports = {
  codes,
  messages
}

// Define your error codes with the wrapper
E('ERROR_SDK_INITIALIZATION', 'SDK initialization error(s). Missing arguments: %s')
E('ERROR_GET_CALCULATED_METRICS', '%o')
E('ERROR_GET_CALCULATED_METRIC_BY_ID', '%o')
E('ERROR_GET_COLLECTIONS', '%o')
E('ERROR_GET_COLLECTION_BY_ID', '%o')
E('ERROR_GET_DATE_RANGES', '%o')
E('ERROR_GET_DATE_RANGE_BY_ID', '%o')
E('ERROR_GET_DIMENSIONS', '%o')
E('ERROR_GET_DIMENSION_BY_ID', '%o')
E('ERROR_GET_METRICS', '%o')
E('ERROR_GET_METRIC_BY_ID', '%o')
E('ERROR_GET_REPORT', '%o')
E('ERROR_GET_SEGMENTS', '%o')
E('ERROR_VALIDATE_SEGMENT', '%o')
E('ERROR_GET_USERS', '%o')
E('ERROR_GET_CURRENT_USER', '%o')
E('ERROR_GET_USAGE_LOGS', '%o')
