import { Tab } from "@headlessui/react";
import { useState } from "react";
import CardHeader from "../../components/Card/CardHeader";
import CategoryCard from "../../components/Card/CategoryCard";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table/Table";
import TableHeader from "../../components/Table/TableHeader";
import { classNames } from "../../utils/utils";

export default function Setting() {
  const [ isLeft, setIsLeft ] = useState(true)

  return (
    <Container>
      <Navbar />
      <Logo />
      <div className="w-full px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              onClick={() => setIsLeft(true)}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              카테고리
            </Tab>
            <Tab
              onClick={() => setIsLeft(false)}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              엑셀
            </Tab>
          </Tab.List>
        </Tab.Group>
        {isLeft ? (
          <div className="p-4 sm:p-6 lg:p-8">
            <CardHeader title={"카테고리"} description={"카테고리 분류를 확인해보세요"}/>
            <CategoryCard />
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8">
            <TableHeader />
            <Table />
          </div>
        )}
      </div>
    </Container>
  )
}