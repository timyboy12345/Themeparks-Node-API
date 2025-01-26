interface BeekseBergenApiResponse {
  "results": BeekseBergenApiResponseItem[],
  "total_results": number
}

interface BeekseBergenApiResponseItem {
  "parent_id": number,
  "id": number,
  "active": boolean,
  "title": string,
  "short_title": string,
  "description": string,
  "slug": string,
  "created_at": string,
  "updated_at": string,
  "publish_at": string,
  "attributes": {
    "diersoort"?: BeekseBergenApiResponseAttribute[],
    "horecasoort"?: BeekseBergenApiResponseAttribute[],
    "attractiesoort"?: BeekseBergenApiResponseAttribute[],
    "icon": BeekseBergenApiResponseAttribute[],
    "list_description": string,
    "button_text": string
  },
  "content_type": {
    "id": number,
    "name": string
  },
  "medias": BeekseBergenApiResponseMediaItem[],
  "children": [],
  "coverImage": string,
  "path": string
}

interface BeekseBergenApiResponseMediaItem {
  "file_type": string,
  "readable_filesize": string,
  "id": number,
  "name": string,
  "provider": string,
  "reference": string,
  "content_type": string,
  "metadata": {
    "width": number,
    "height": number
  },
  "filesize": number,
  "created_at": string,
  "images": {
    "medialibrary": string
  },
  "original": string
}

interface BeekseBergenApiResponseAttribute {
  "id": number,
  "name": string
}
