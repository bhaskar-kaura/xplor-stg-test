export interface Catalog {
    descriptor: {
        name: string;
        code?:string
    };
    providers: Provider[];
  }
  
  export interface Provider {
    id: string;
    descriptor: {
      name: string;
      short_desc: string;
      images: Image[];
    };
    categories?: Category[];
    locations?: Location[];
    fulfillments?: Fulfillment[];
    items: Item[];
  }
  
  interface Image {
    url: string;
  }
  
  interface Category {
    id: string;
    descriptor: {
      code: string;
      name: string;
    };
  }
  
  interface Location {
    id: string;
    city?: {
      name: string;
      code: string;
    };
    state?: {
      name: string;
      code: string;
    };
  }
  
  interface Fulfillment {
    id: string;
    type: string;
    tracking?: boolean;
    contact?: {
      phone: string;
      email: string;
    };
  }
  
  interface Item {
    id: string;
    descriptor: {
      name: string;
      long_desc: string;
    };
    price: {
      currency: string;
      value: string;
    };
    quantity?: {
      maximum?: {
        count:string,
      },
      minimum?: {
        count: string,
      },
    }
    rating: string;
    rateable: boolean;
    time: {
      label: string;
      range: {
        start: string;
        end: string;
      };
    };
    fulfillments: Fulfillment[];
    tags: Tag[];
    category_ids: string[];
    fulfillment_ids: string[];
    location_ids: string[];
  }
  
  interface Tag {
    display: boolean;
    descriptor: {
      code?: string;
      name: string;
    };
    list: List[];
  }
  
  interface List {
    descriptor: {
      code?: string;
      name: string;
    };
    value: string;
  }
  export interface MessageResponse{
  message: {
     catalog: Catalog
   }
  }