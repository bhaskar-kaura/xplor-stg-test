import { contextSchema } from "./context.schema";

export const onSearchSchema = {
  type: "object",
  properties: {
    context: contextSchema,
    message: {
      type: "object",
      properties: {
        catalog: {
          type: "object",
          properties: {
            descriptor: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
              },
              required: ["name"],
            },
            providers: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    descriptor: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        short_desc: {
                          type: "string",
                        },
                        images: {
                          type: "array",
                          items: [
                            {
                              type: "object",
                              properties: {
                                url: {
                                  type: "string",
                                },
                              },
                              required: ["url"],
                            },
                          ],
                        },
                      },
                      required: ["name"],
                    },
                    categories: {
                      type: "array",
                      items: [
                        {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            descriptor: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                name: {
                                  type: "string",
                                },
                              },
                              required: ["code", "name"],
                            },
                          },
                          required: ["id", "descriptor"],
                        },
                      ],
                    },
                    fulfillments: {
                      type: "array",
                      items: [
                        {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            type: {
                              type: "string",
                            },
                            tracking: {
                              type: "boolean",
                            },
                            contact: {
                              type: "object",
                              properties: {
                                phone: {
                                  type: "string",
                                },
                                email: {
                                  type: "string",
                                },
                              },
                              required: ["phone", "email"],
                            },
                            stops: {
                              type: "array",
                              items: [
                                {
                                  type: "object",
                                  properties: {
                                    type: {
                                      type: "string",
                                    },
                                    time: {
                                      type: "object",
                                      properties: {
                                        timestamp: {
                                          type: "string",
                                        },
                                      },
                                      required: ["timestamp"],
                                    },
                                  },
                                  required: ["type", "time"],
                                },
                                {
                                  type: "object",
                                  properties: {
                                    type: {
                                      type: "string",
                                    },
                                    time: {
                                      type: "object",
                                      properties: {
                                        timestamp: {
                                          type: "string",
                                        },
                                      },
                                      required: ["timestamp"],
                                    },
                                  },
                                  required: ["type", "time"],
                                },
                              ],
                            },
                          },
                          required: [
                            "id",
                            "type",
                            "tracking",
                            "contact",
                            "stops",
                          ],
                        },
                      ],
                    },
                    items: {
                      type: "array",
                      items: [
                        {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            descriptor: {
                              type: "object",
                              properties: {
                                name: {
                                  type: "string",
                                },
                                long_desc: {
                                  type: "string",
                                },
                              },
                              required: ["name", "long_desc"],
                            },
                            price: {
                              type: "object",
                              properties: {
                                currency: {
                                  type: "string",
                                },
                                value: {
                                  type: "string",
                                },
                              },
                              required: ["currency", "value"],
                            },
                            rateable: {
                              type: "boolean",
                            },
                            tags: {
                              type: "array",
                              items: [
                                {
                                  type: "object",
                                  properties: {
                                    display: {
                                      type: "boolean",
                                    },
                                    descriptor: {
                                      type: "object",
                                      properties: {
                                        code: {
                                          type: "string",
                                        },
                                        name: {
                                          type: "string",
                                        },
                                      },
                                      required: ["code", "name"],
                                    },
                                    list: {
                                      type: "array",
                                      items: [
                                        {
                                          type: "object",
                                          properties: {
                                            descriptor: {
                                              type: "object",
                                              properties: {
                                                code: {
                                                  type: "string",
                                                },
                                                name: {
                                                  type: "string",
                                                },
                                              },
                                              required: ["code", "name"],
                                            },
                                            value: {
                                              type: "string",
                                            },
                                            display: {
                                              type: "boolean",
                                            },
                                          },
                                          required: [
                                            "descriptor",
                                            "value",
                                            "display",
                                          ],
                                        },
                                      ],
                                    },
                                  },
                                  required: ["display", "descriptor", "list"],
                                },
                              ],
                            },
                            category_ids: {
                              type: "array",
                              items: [
                                {
                                  type: "string",
                                },
                              ],
                            },
                            fulfillment_ids: {
                              type: "array",
                              items: [
                                {
                                  type: "string",
                                },
                              ],
                            },
                          },
                          required: [
                            "id",
                            "descriptor",
                            "price",
                            "rateable",
                            "tags",
                            "category_ids",
                            "fulfillment_ids",
                          ],
                        },
                      ],
                    },
                    rateable: {
                      type: "boolean",
                    },
                  },
                  required: [
                    "id",
                    "descriptor",
                    "categories",
                    "fulfillments",
                    "items",
                    "rateable",
                  ],
                },
              ],
            },
          },
          required: ["descriptor", "providers"],
        },
      },
      required: ["catalog"],
    },
  },
  required: ["context", "message"],
};
