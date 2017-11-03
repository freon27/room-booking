import { MIN_BOOKABLE_SLOT, BOOKABLE_START_TIME } from "./constants";

// TODO: handle time zones

export function timeToMinutesAfterMidnight(time) {
  const el = time.split(":");
  return Number(el[0]) * 60 + Number(el[1]);
}

export function timeRangeToSlots(startTime, endTime) {
  let slots = [];

  const startMinutes = timeToMinutesAfterMidnight(startTime);
  const endMinutes = timeToMinutesAfterMidnight(endTime);

  for (let i = startMinutes; i < endMinutes; i = i + MIN_BOOKABLE_SLOT) {
    slots.push((i - BOOKABLE_START_TIME) / MIN_BOOKABLE_SLOT);
  }
  return slots;
}
