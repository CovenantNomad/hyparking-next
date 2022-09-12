import { useQuery } from "react-query"
import { searchVehicle } from "../lib/search"


export const useSearchVehicle = (searchOption, pageSize, cursor) => {
  return useQuery(['searchVehicle', { searchOption, pageSize, cursor }], () => searchVehicle(searchOption, pageSize, cursor), {
    enabled: !!searchOption
  })
}