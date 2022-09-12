import { useQuery } from "react-query"
import { getTotalVehicleList } from "../lib/search"


export const useGetTotalVehicleList = () => {
  return useQuery('getTotalVehicleList', getTotalVehicleList)
}