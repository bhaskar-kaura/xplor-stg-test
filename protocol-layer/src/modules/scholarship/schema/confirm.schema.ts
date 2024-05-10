import { contextSchema } from './context.schema';

export const confirmSchema = {
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        order: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
            },
            provider: {
              type: 'object',
              properties: {
                id: { type: 'string' },
              },
            },
            billing: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                organization: {
                  type: 'object',
                  properties: {
                    descriptor: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        code: { type: 'string' },
                      },
                    },
                    contact: {
                      type: 'object',
                      properties: {
                        phone: { type: 'string' },
                        email: { type: 'string' },
                      },
                    },
                  },
                },
                address: { type: 'string' },
                phone: { type: 'string' },
              },
            },
            fulfillments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  customer: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      person: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          age: { type: 'string' },
                          gender: { type: 'string' },
                        },
                      },
                      contact: {
                        type: 'object',
                        properties: {
                          phone: { type: 'string' },
                          email: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
            payment: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  params: {
                    type: 'object',
                    properties: {
                      bank_code: { type: 'string' },
                      bank_account_number: { type: 'string' },
                      bank_account_name: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
