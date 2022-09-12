import { useQuery } from "react-query"
import { getNumbers } from "../lib/search"



export const useGetNumber = () => {
  return useQuery('getNumbers', getNumbers)
}