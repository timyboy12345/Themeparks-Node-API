export interface WalibiHollandRide {
  state: string,
  queueLength: number,
  queueLengthLastModified: string,
  useVirtualQueue: boolean,
  throughput: number,
  openingTime: null,
  currentBufferQueueWait: number,
  targetBufferQueueWait: number,
  emergencyDuration: number,
  hideUnavailableWaitTime: boolean,
  bufferQueueLastModified: string,
  closedAt: string,
  minWait: number,
  waitTimeMins: number,
  category: number,
  attractionGroupId: null,
  tags: [],
  location: {
    longitude: null,
    latitude: null
  },
  queues: [
    {
      id: string,
      rideId: string,
      addonId: null,
      queueLength: number,
      queueLengthLastModified: string,
      bufferQueueNeedsFilling: boolean,
      minWait: number,
      throughput: number,
      isPrimary: boolean,
      isDefault: boolean,
      fillGaps: boolean,
      name: string,
      waitTimeMins: number,
      useVirtualQueue: boolean,
      openingTime: null,
      futureDayTimeSlotsEnabled: boolean,
      futureDayTimeSlotsMaxDays: null
    }
  ],
  shortId: number,
  thumbHash: string,
  imageCount: number,
  images: string[]
  ordinal: number,
  localizations:
    {
      culture: string,
      name: string,
      description: string,
      shortName: null,
      info: {
        'visible.restrictions.min_daredevil_height': string
      }
    }[],
  lastChanged: number,
  maxReservationSize: number,
  maxOverReserveSize: number,
  id: string,
  name: string,
  description: string,
  poiType: string,
  info: {
    'localization.en-US': object,
    'localization.de-DE': object,
    'visible.restrictions.min_daredevil_height': string,
    'visible.restrictions.wet_warn': string,
    'hide_unavailable_wait_time': boolean,
    'max_over_reserve_size': number,
    'max_reservation_size': number,
    'emergency.durationMins': number,
    'throughput_measurement.consecutive_zeros': number,
    'throughput_measurement.start_periods_remaining': number,
    'throughput_measurement.anomaly_count': number,
    'throughput_measurement.correction_count': number,
    'throughput_measurement.anomaly_direction': number,
    'throughput_measurement.use_alternative_algorithm': boolean,
    'throughput_measurement.use_detection_percentage_sampling': boolean,
    'throughput_measurement.acceptable_decreasing_rate': number,
    'throughput_measurement.acceptable_increasing_rate': number,
    'throughput_measurement.negligible_decreasing_rate': number,
    'throughput_measurement.negligible_increasing_rate': number,
    'throughput_measurement.current_period_proportion': number,
    'throughput_measurement.max_anomalies': number,
    'throughput_measurement.start_periods': number,
    'throughput_measurement.short_term_average_samples': number,
    'throughput_measurement.max_long_term_average_samples': number,
    'throughput_measurement.anomaly_percentage': number,
    'throughput_measurement.max_corrections': number,
    'throughput_measurement.reset_on_no_buffer_queue': boolean,
    'throughput_measurement.reset_on_ride_closure': boolean,
    'last_pending_entries': number,
    'hide_physical_wait_time_control': boolean,
    'localizations.en-US': object,
    'localizations.de-DE': object,
    'is_swappable': boolean,
    'buffer_queue_cooldown.durationMins': number,
    'allow_attendant_buffer_queue_updates': boolean
  }
}
