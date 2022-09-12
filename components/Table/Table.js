import { useGetTotalVehicleList } from "../../hooks/useGetTotalVehicleList"
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef } from "react";

const Table = () => {
  const { isLoading, data } = useGetTotalVehicleList()
  const tableRef = useRef(null);

  const today = new Date()

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="pb-4">
            <DownloadTableExcel
              filename={`화양교회 주차관리대장(${today.getFullYear()}${today.getMonth().toString().padStart(2, '0')}${today.getDay().toString().padStart(2, '0')})`}
              sheet="전체목록"
              currentTableRef={tableRef.current}
            >
              <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"> 엑셀 다운로드 </button>
            </DownloadTableExcel>
          </div>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table ref={tableRef} className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    순서
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    이름
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    직분
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    소속
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    차량번호
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    전화번호
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td colspan='6' className="text-center py-4 animate-pulse">로딩중...</td>
                  </tr>
                ) : (
                  data.map((person, index) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {index+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.owner}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.position}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.division}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.fullPlateNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.phoneNumber}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table