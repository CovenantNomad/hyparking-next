import { divisions } from "../constants/division"

export const getColor = (division) => {
  return divisions.filter((item) => item.name === division)[0].color
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}