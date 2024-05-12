import { contextSchema } from './context.schema';

export const onSearchSchema = {
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        catalog: {
          type: 'object',
          properties: {
            seller_platform: {
              type: 'object',
              properties: {
                descriptor: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                    symbol: {
                      type: 'string',
                    },
                    short_desc: {
                      type: 'string',
                    },
                    long_desc: {
                      type: 'string',
                    },
                    images: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    tags: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          code: {
                            type: 'string',
                          },
                          list: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                code: {
                                  type: 'string',
                                },
                                value: {
                                  type: 'string',
                                },
                              },
                              required: ['code', 'value'],
                            },
                          },
                        },
                        required: ['code', 'list'],
                      },
                    },
                  },
                  required: [
                    'name',
                    'symbol',
                    'short_desc',
                    'long_desc',
                    'images',
                    'tags',
                  ],
                },
                location: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      gps: {
                        type: 'string',
                      },
                      address: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                          },
                          symbol: {
                            type: 'string',
                          },
                          short_desc: {
                            type: 'string',
                          },
                          long_desc: {
                            type: 'string',
                          },
                          images: {
                            type: 'array',
                            items: {
                              type: 'string',
                            },
                          },
                          tags: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                title: {
                                  type: 'string',
                                },
                                list: {
                                  type: 'array',
                                  items: {
                                    type: 'object',
                                    properties: {
                                      sub_title: {
                                        type: 'string',
                                      },
                                      value: {
                                        type: 'string',
                                      },
                                    },
                                    required: ['sub_title', 'value'],
                                  },
                                },
                              },
                              required: ['title', 'list'],
                            },
                          },
                        },
                        required: [
                          'name',
                          'symbol',
                          'short_desc',
                          'long_desc',
                          'images',
                          'tags',
                        ],
                      },
                      availability: {
                        type: 'string',
                      },
                      holiday: {
                        type: 'object',
                        properties: {
                          date: {
                            type: 'string',
                          },
                          time: {
                            type: 'string',
                          },
                          range: {
                            type: 'object',
                            properties: {
                              start: {
                                type: 'string',
                              },
                              end: {
                                type: 'string',
                              },
                            },
                            required: ['start', 'end'],
                          },
                        },
                        required: ['date', 'time', 'range'],
                      },
                    },
                    required: [
                      'id',
                      'gps',
                      'address',
                      'availability',
                      'holiday',
                    ],
                  },
                },
                categories: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      name: {
                        type: 'string',
                      },
                    },
                    required: ['id', 'name'],
                  },
                },
                fulfillments: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      type: {
                        type: 'string',
                      },
                      person: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                          },
                          contact: {
                            type: 'object',
                            properties: {
                              phone: {
                                type: 'string',
                              },
                              email: {
                                type: 'string',
                              },
                            },
                            required: ['phone', 'email'],
                          },
                        },
                        required: ['name', 'contact'],
                      },
                    },
                    required: ['id', 'type', 'person'],
                  },
                },
              },
              required: [
                'descriptor',
                'location',
                'categories',
                'fulfillments',
              ],
            },
            providers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  descriptor: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                      symbol: {
                        type: 'string',
                      },
                      short_desc: {
                        type: 'string',
                      },
                      long_desc: {
                        type: 'string',
                      },
                      images: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                    },
                    required: [
                      'name',
                      'symbol',
                      'short_desc',
                      'long_desc',
                      'images',
                    ],
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                        },
                        descriptor: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string',
                            },
                            code: {
                              type: 'string',
                            },
                            symbol: {
                              type: 'string',
                            },
                            short_desc: {
                              type: 'string',
                            },
                            long_desc: {
                              type: 'string',
                            },
                            images: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                            },
                          },
                          required: [
                            'name',
                            'code',
                            'symbol',
                            'short_desc',
                            'long_desc',
                            'images',
                          ],
                        },
                        quantity: {
                          type: 'object',
                          properties: {
                            unitized: {
                              type: 'object',
                              properties: {
                                measure: {
                                  type: 'object',
                                  properties: {
                                    unit: {
                                      type: 'string',
                                    },
                                    value: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['unit', 'value'],
                                },
                              },
                              required: ['measure'],
                            },
                            available: {
                              type: 'object',
                              properties: {
                                count: {
                                  type: 'string',
                                },
                              },
                              required: ['count'],
                            },
                            maximum: {
                              type: 'object',
                              properties: {
                                count: {
                                  type: 'string',
                                },
                              },
                              required: ['count'],
                            },
                          },
                          required: ['unitized', 'available', 'maximum'],
                        },
                        price: {
                          type: 'object',
                          properties: {
                            currency: {
                              type: 'string',
                            },
                            value: {
                              type: 'string',
                            },
                            maximum_value: {
                              type: 'string',
                            },
                          },
                          required: ['currency', 'value', 'maximum_value'],
                        },
                        rateable: {
                          type: 'string',
                        },
                        rating: {
                          type: 'string',
                        },
                        returnable: {
                          type: 'string',
                        },
                        cod: {
                          type: 'string',
                        },
                        return_time: {
                          type: 'string',
                        },
                        consumer_care: {
                          type: 'string',
                        },
                        time_to_ship: {
                          type: 'string',
                        },
                        packaging_details: {
                          type: 'object',
                          properties: {
                            manufacturer_or_packer_name: {
                              type: 'string',
                            },
                            manufacturer_or_packer_address: {
                              type: 'string',
                            },
                            common_or_generic_name_of_commodity: {
                              type: 'string',
                            },
                            month_year_of_manufacture_packing_import: {
                              type: 'string',
                            },
                          },
                          required: [
                            'manufacturer_or_packer_name',
                            'manufacturer_or_packer_address',
                            'common_or_generic_name_of_commodity',
                            'month_year_of_manufacture_packing_import',
                          ],
                        },
                        additional_packaging_details: {
                          type: 'object',
                          properties: {
                            manufacturer_or_packer_name: {
                              type: 'string',
                            },
                            manufacturer_or_packer_address: {
                              type: 'string',
                            },
                            common_or_generic_name_of_commodity: {
                              type: 'string',
                            },
                            month_year_of_manufacture_packing_import: {
                              type: 'string',
                            },
                          },
                          required: [
                            'manufacturer_or_packer_name',
                            'manufacturer_or_packer_address',
                            'common_or_generic_name_of_commodity',
                            'month_year_of_manufacture_packing_import',
                          ],
                        },
                        tags: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              title: {
                                type: 'string',
                              },
                              list: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    sub_title: {
                                      type: 'string',
                                    },
                                    value: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['sub_title', 'value'],
                                },
                              },
                            },
                            required: ['title', 'list'],
                          },
                        },
                      },
                      required: [
                        'id',
                        'descriptor',
                        'quantity',
                        'price',
                        'rateable',
                        'rating',
                        'returnable',
                        'cod',
                        'return_time',
                        'consumer_care',
                        'time_to_ship',
                        'packaging_details',
                        'additional_packaging_details',
                        'tags',
                      ],
                    },
                  },
                  required: ['id', 'descriptor', 'items'],
                },
                fulfillments: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      type: {
                        type: 'string',
                      },
                      person: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                          },
                          contact: {
                            type: 'object',
                            properties: {
                              phone: {
                                type: 'string',
                              },
                              email: {
                                type: 'string',
                              },
                            },
                            required: ['phone', 'email'],
                          },
                        },
                        required: ['name', 'contact'],
                      },
                    },
                    required: ['id', 'type', 'person'],
                  },
                },
              },
              required: ['id', 'descriptor', 'items', 'fulfillments'],
            },
          },
          required: ['seller_platform'],
        },
      },
      required: ['message'],
    },
  },
  additionalProperties: true,
};
