import { useQuery } from "react-query"
import { searchPlate } from "../lib/search"


export const useSearch = (plateNumber) => {
  return useQuery(['searchPlate', plateNumber], () => searchPlate(plateNumber), {
    enabled: !!plateNumber
  })
}