export interface EftelingPoi {
  id: string;
  fields: {
    category: string,
    hide_in_app: boolean,
    properties: string[],
    subtitle: string,
    name: string,
    detail_text: string,
    text: string,
    can_order: boolean,
    latlon: string,
    targetgroups: [
      string
    ],
    language: string,

    // Detailed image
    string: string,

    // Quick View image
    image: string,

    empire: string,
    showduration: number,
    type: string,
    id: string,
    has_assortment: boolean

    alternateid?: string,
    alternatetype?: string,
    alternatelabel?: string,
    image_detailview1?: string,
    image_detailview2?: string,
    image_detailview3?: string,
    image_detailview4?: string,
    name_in_context?: string,
  };
}
