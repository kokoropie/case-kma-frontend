export const PRODUCT_PRICES = {
  material: {
    silicone: 0,
    polycarbonate: 5_00,
  },
  finish: {
    smooth: 0,
    textured: 3_00,
  },
} as const;

export const BASE_PRICE = 14_00;

export enum OrderStatus {
  fulfilled,
  shipped,
  awaiting_shipment,
}

export enum PhoneModel {
  iphonex,
  iphone11,
  iphone12,
  iphone13,
  iphone14,
  iphone15,
}

export enum CaseMaterial {
  silicone,
  polycarbonate,
}

export enum CaseFinish {
  smooth,
  textured,
}

export enum CaseColor {
  black,
  blue,
  rose,
}

export type Configurator = {
  color: keyof typeof CaseColor; // This restricts the color to the values of the CaseColor enum
  finish: keyof typeof CaseFinish; // This restricts the finish to the values of the CaseFinish enum
  material: keyof typeof CaseMaterial; // This restricts the material to the values of the CaseMaterial enum
  model: keyof typeof PhoneModel; // This restricts the model to the values of the PhoneModel enum
};
