const TableHeader = () => {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">전체목록</h1>
        <p className="mt-2 text-sm text-gray-700">
          등록된 차량 전체목록을 볼 수 있습니다
        </p>
      </div>
    </div>
  )
}

export default TableHeader