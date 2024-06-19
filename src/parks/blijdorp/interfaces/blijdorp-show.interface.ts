export interface BlijdorpShow {
  "id": string,
  "all_day": 0 | 1,
  "start_time": string | "ALLDAY",
  "end_time": string | null,
  "label": string,
  "body": string,
  "feature_id": string
}
