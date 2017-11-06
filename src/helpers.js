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

export function availableNow(room) {
  // Room must be any time bewtween now and 1 hour from now
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
}

export function getRoomSlots(room) {
  let slots = [];
  for (const rangeString of room.avail) {
    const range = rangeString.split(" - ");
    slots = slots.concat(timeRangeToSlots(range[0], range[1]));
  }
  return slots;
}

export function dateStringToUnixTime(dateString) {
  return new Date(dateString).getTime() / 1000;
}

export function minutesAfterMidnightToUnix(minutes) {
  const date = new Date();
  date.setHours(minutes / 60, minutes % 60, 0, 0);
  return date.getTime() / 1000;
}
