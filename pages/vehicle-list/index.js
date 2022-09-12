import Container from "../../components/Container/Container";
import VehicleItem from "../../components/Items/VehicleItem";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import SkeletonTagItem from "../../components/Skeletons/SkeletonTagItem";
import SkeletonVehicle from "../../components/Skeletons/SkeletonVehicle";
import TagItem from "../../components/Items/TagItem";
import { useState } from "react";
import { useGetNumber } from "../../hooks/useGetNumber";
import { useSearchVehicle } from "../../hooks/useSearchVehicle";
import { useInfiniteQuery } from "react-query";
import { searchVehicle } from "../../lib/search";
import React from "react";

export default function VehicleList() {
  const [ pageSize, setPageSize ] = useState(24)
  const [ vehicleList, setVehicleList ] = useState([])
  const [ searchOption, setSearchOption ] = useState("전체")
  const { data: numberOfVehicle, isLoading: numberIsLoading } = useGetNumber()
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading
  } = useInfiniteQuery(
    ['searchVehicle', { searchOption, pageSize }], 
    ({queryKey, pageParam}) => searchVehicle(queryKey, pageParam), 
    {
      getNextPageParam: (response) => { 
        if (response.size < pageSize) return null
        else return response.docs[response.docs.length - 1]
      },
      onSuccess: (data) => {
        let temp = []
        data.pages.map((group, index) => {
          group.forEach(doc => {
            temp.push(doc.data())
          })
        })
        setVehicleList(temp)
      }
    }
  )

  const onClickHandler = (condition) => {
    setSearchOption(condition)
  }

  return (
    <Container>
      <Navbar />
      <Logo />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        { numberIsLoading ? (
          [...Array(8)].map((_, index) => <SkeletonTagItem key={index} />)
        ) : (
          numberOfVehicle?.map((item, index) => <TagItem key={index} item={item} onClickHandler={onClickHandler} />)
        )}
      </div>
      <div className="h-1 border-t border-gray-300 my-4"></div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          [...Array(2)].map((_, index) => <SkeletonVehicle key={index} />)
        ) : (
          vehicleList.map((item, i) => <VehicleItem key={i} item={item} />)
        )}
      </div>
      <div
        className="my-6 flex justify-center lg:my-8"
      >
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isFetchingNextPage
            ? '로딩 중...'
            : hasNextPage
            ? '더 불러오기'
            : '데이터 없음'}
        </button>
      </div>

{/* <div className="text-center my-8 sm:col-span-2 md:col-span-3">
<h3 className="text-2xl font-bold">등록된 차량이 없습니다</h3>
</div> */}
    </Container>
  )
}