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

const BadRequest = {
  err: {
    throws: new Error('Bad Request')
  },
  message: 'Bad Request'

}
const UnauthorizedRequest = {
  err: {
    throws: new Error('Unauthorized')
  },
  message: 'Unauthorized'
}
const ForbiddenRequest = {
  err: {
    throws: new Error('Forbidden Request')
  },
  message: 'Forbidden Request'
}
const NotFound = {
  err: {
    throws: new Error('Not Found')
  },
  message: 'Not Found'
}
const InternalServerError = {
  err: {
    throws: new Error('Internal Server Error')
  },
  message: 'Internal Server Error'
}
const collection = {
  name: 'testcollection',
  currency: 'string',
  parentRsid: 'string',
  collectionItemType: 'reportsuite',
  timezoneZoneInfo: 'string',
  calendarType: {
    rsid: 'string',
    type: 'gregorian',
    anchorDate: '2019-07-24T13:48:14.360Z'
  },
  rsid: '123'
}
const calculatedMetric = {
  id: '123',
  name: 'string',
  description: 'string',
  rsid: 'string',
  reportSuiteName: 'string',
  owner: {
    id: 0,
    name: 'string',
    login: 'string'
  },
  polarity: 'positive',
  precision: 0,
  type: 'CURRENCY',
  definition: {},
  tags: [
    {
      id: 0,
      name: 'string',
      description: 'string',
      components: [
        {
          componentType: 'string',
          componentId: 'string',
          tags: [
            null
          ]
        }
      ]
    }
  ],
  siteTitle: 'string',
  modified: '2019-07-24T13:39:16.547Z',
  created: '2019-07-24T13:39:16.547Z'
}
const dateRange = {
  id: '123',
  name: 'string',
  description: 'string',
  rsid: 'string',
  reportSuiteName: 'string',
  owner: {
    id: 0,
    name: 'string',
    login: 'string'
  },
  definition: {},
  tags: [
    {
      id: 0,
      name: 'string',
      description: 'string',
      components: [
        {
          componentType: 'string',
          componentId: 'string',
          tags: [
            null
          ]
        }
      ]
    }
  ],
  siteTitle: 'string',
  modified: '2019-07-24T14:02:33.342Z',
  created: '2019-07-24T14:02:33.342Z'
}
const dimension = {
  id: '111',
  title: 'string',
  name: 'string',
  type: 'STRING',
  category: 'string',
  support: [
    'string'
  ],
  pathable: true,
  parent: 'string',
  extraTitleInfo: 'string',
  segmentable: true,
  reportable: [
    'string'
  ],
  description: 'string',
  tags: [
    {
      id: 0,
      name: 'string',
      description: 'string',
      components: [
        {
          componentType: 'string',
          componentId: 'string',
          tags: [
            null
          ]
        }
      ]
    }
  ]
}
const metric = {
  id: '111',
  title: 'string',
  name: 'string',
  type: 'STRING',
  extraTitleInfo: 'string',
  category: 'string',
  support: [
    'string'
  ],
  allocation: true,
  precision: 0,
  calculated: true,
  segmentable: true,
  description: 'string',
  polarity: 'positive',
  helpLink: 'string',
  tags: [
    {
      id: 0,
      name: 'string',
      description: 'string',
      components: [
        {
          componentType: 'string',
          componentId: 'string',
          tags: [
            null
          ]
        }
      ]
    }
  ]
}
const report = {
  totalPages: 10,
  firstPage: true,
  lastPage: true,
  numberOfElements: 100,
  number: 0,
  totalElements: 0,
  message: 'string',
  request: {
    rsid: 'string',
    dimension: 'string',
    locale: {
      language: 'string',
      script: 'string',
      country: 'string',
      variant: 'string',
      extensionKeys: [
        'string'
      ],
      unicodeLocaleAttributes: [
        'string'
      ],
      unicodeLocaleKeys: [
        'string'
      ],
      iso3Language: 'string',
      iso3Country: 'string',
      displayLanguage: 'string',
      displayScript: 'string',
      displayCountry: 'string',
      displayVariant: 'string',
      displayName: 'string'
    },
    globalFilters: [
      {
        id: 'string',
        type: 'DATE_RANGE',
        dimension: 'string',
        itemId: 'string',
        itemIds: [
          'string'
        ],
        segmentId: 'string',
        segmentDefinition: {
          additionalProp1: {},
          additionalProp2: {},
          additionalProp3: {}
        },
        dateRange: 'string',
        excludeItemIds: [
          'string'
        ]
      }
    ],
    search: {
      clause: 'string',
      excludeItemIds: [
        'string'
      ],
      itemIds: [
        'string'
      ],
      includeSearchTotal: true,
      empty: true
    },
    settings: {
      limit: 0,
      page: 0,
      dimensionSort: 'string',
      countRepeatInstances: true,
      reflectRequest: true,
      includeAnomalyDetection: true,
      includePercentChange: true,
      includeLatLong: true
    },
    statistics: {
      functions: [
        'string'
      ],
      ignoreZeroes: true
    },
    metricContainer: {
      metricFilters: [
        {
          id: 'string',
          type: 'DATE_RANGE',
          dimension: 'string',
          itemId: 'string',
          itemIds: [
            'string'
          ],
          segmentId: 'string',
          segmentDefinition: {
            additionalProp1: {},
            additionalProp2: {},
            additionalProp3: {}
          },
          dateRange: 'string',
          excludeItemIds: [
            'string'
          ]
        }
      ],
      metrics: [
        {
          id: 'string',
          columnId: 'string',
          filters: [
            'string'
          ],
          sort: 'string',
          metricDefinition: {
            additionalProp1: {},
            additionalProp2: {},
            additionalProp3: {}
          },
          predictive: {
            anomalyConfidence: 0
          }
        }
      ]
    },
    rowContainer: {
      rowFilters: [
        {
          id: 'string',
          type: 'DATE_RANGE',
          dimension: 'string',
          itemId: 'string',
          itemIds: [
            'string'
          ],
          segmentId: 'string',
          segmentDefinition: {
            additionalProp1: {},
            additionalProp2: {},
            additionalProp3: {}
          },
          dateRange: 'string',
          excludeItemIds: [
            'string'
          ]
        }
      ],
      rows: [
        {
          rowId: 'string',
          filters: [
            'string'
          ]
        }
      ]
    },
    anchorDate: 'string'
  },
  reportId: 'string',
  columns: {
    dimension: {
      id: 'string',
      type: 'STRING'
    },
    columnIds: [
      'string'
    ],
    columnErrors: [
      {
        columnId: 'string',
        errorCode: 'unauthorized_metric',
        errorId: 'string',
        errorDescription: 'string'
      }
    ]
  },
  rows: [
    {
      itemId: 'string',
      value: 'string',
      rowId: 'string',
      data: [
        0
      ],
      dataExpected: [
        0
      ],
      dataUpperBound: [
        0
      ],
      dataLowerBound: [
        0
      ],
      dataAnomalyDetected: [
        true
      ],
      percentChange: [
        0
      ],
      latitude: 0,
      longitude: 0
    }
  ],
  summaryData: {}
}
const reportReq = {
  rsid: '123',
  globalFilters: [
    {
      type: 'dateRange',
      dateRange: '2017-12-31T00:00:00.000/2018-01-06T23:59:59.999'
    }
  ],
  metricContainer: {
    metrics: [
      {
        columnId: '0',
        id: 'metrics/pageviews',
        filters: [
          '0'
        ]
      },
      {
        columnId: '1',
        id: 'metrics/pageviewspervisit',
        filters: [
          '0'
        ]
      }
    ],
    metricFilters: [
      {
        id: '0',
        type: 'dateRange',
        dateRange: '2017-12-31T00:00:00.000/2018-01-06T23:59:59.999'
      }
    ]
  },
  dimension: 'variables/daterangeday',
  settings: {
    dimensionSort: 'asc'
  }
}
const segment = {
  id: '111',
  name: 'string',
  description: 'string',
  rsid: '123',
  reportSuiteName: 'string',
  owner: {
    id: 0,
    name: 'string',
    login: 'string'
  },
  definition: {
    additionalProp1: {},
    additionalProp2: {},
    additionalProp3: {}
  },
  compatibility: {
    additionalProp1: {},
    additionalProp2: {},
    additionalProp3: {}
  },
  version: 'string',
  siteTitle: 'string',
  tags: [
    {
      id: 0,
      name: 'string',
      description: 'string',
      components: [
        {
          componentType: 'string',
          componentId: 'string',
          tags: [
            null
          ]
        }
      ]
    }
  ],
  modified: '2019-07-24T14:38:42.093Z',
  created: '2019-07-24T14:38:42.093Z'
}
const validSegment = {
  valid: true,
  message: 'string',
  validator_version: 'string',
  supported_products: [
    'string'
  ],
  supported_schema: [
    'string'
  ],
  supported_features: [
    'string'
  ]
}
const user = {
  companyid: '123',
  loginId: 0,
  login: 'string',
  changePassword: true,
  createDate: '2019-07-24T14:42:22.803Z',
  disabled: true,
  email: 'string',
  firstName: 'string',
  fullName: 'string',
  imsUserId: 'string',
  lastName: 'string',
  lastLogin: '2019-07-24T14:42:22.803Z',
  lastAccess: '2019-07-24T14:42:22.803Z',
  phoneNumber: 'string',
  tempLoginEnd: '2019-07-24T14:42:22.803Z',
  title: 'string'
}
const data = {
  calculatedMetrics: [calculatedMetric],
  calculatedMetric: calculatedMetric,
  collections: [collection],
  collection: collection,
  dateRanges: [dateRange],
  dateRange: dateRange,
  dimensions: [dimension],
  dimension: dimension,
  metrics: [metric],
  metric: metric,
  report: report,
  reportReq: reportReq,
  segments: [segment],
  segment: segment,
  validSegment: validSegment,
  users: [user],
  user: user

}

module.exports = {
  data: data,
  errors: {
    Bad_Request: BadRequest,
    Unauthorized_Request: UnauthorizedRequest,
    Forbidden_Request: ForbiddenRequest,
    Not_Found: NotFound,
    Internal_Server_Error: InternalServerError
  }
}
