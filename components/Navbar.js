import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
// components
import Logo from '../public/logo.jpg'
import { HYPARKING_AUTH } from '../constants/constant';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import { authAtom } from '../stores/state';


const navigation = [
  { name: '홈', pathname: '/home'},
  { name: '등록차량목록', pathname: '/vehicle-list'},
  { name: '신규차량등록', pathname: '/registration'},
]


const Navbar = () => {
  const [ open, setOpen ] = useState(false)
  const [ profileOpen, setProfileOpen ] = useState(false)
  const [ authState, setAuthState ] = useRecoilState(authAtom)
  const router = useRouter()
  const profileRef = useRef(null)

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem(HYPARKING_AUTH)
      setAuthState({
        isLoggedIn: false,
        token: null
      })
      router.push('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleClickOutside = (e) => {
    if (profileOpen && !profileRef.current.contains(e.target)) {
      setProfileOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [profileOpen])

  return (
    <>
      <nav className='h-16 relative flex items-center justify-between'>
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* #1 Mobile menu button*/}
          <button 
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
            )}
          </button>
        </div>
        {/* #1.2 Desktop menu */}
        <div className='hidden sm:block'>
          <div className='flex space-x-4'>
            {navigation.map((item) => (
              <Link href={item.pathname} key={item.name}>
                <a
                  className={`${item.pathname === router.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                  aria-current={item.pathname === router.pathname ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        {/* #2 Profile menu button*/}
        <div className="absolute inset-y-0 right-0 flex items-center" ref={profileRef}>
          <div className='relative'>
            <button 
              
              onClick={() => setProfileOpen(!profileOpen)}
              className='bg-gray-700 flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-400'
            >
              <span className="sr-only">Open user menu</span>
              <Image
                className="rounded-full"
                src={Logo}
                width={32}
                height={32}
                alt="profileImage"
              />
            </button>
          </div>
        </div>
        {profileOpen && (
          <div className='origin-top-right absolute right-0 top-12 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <button
              onClick={() => router.push("/setting")}
              className="active:bg-gray-100 hover:bg-gray-100 block w-full text-left px-4 py-2 text-sm text-gray-700"
            >
              설정
            </button> 
            <button
              onClick={logout}
              className="active:bg-gray-100 hover:bg-gray-100 block w-full text-left px-4 py-2 text-sm text-gray-700"
            >
              로그아웃
            </button>      
          </div>
        )}
      </nav>
      {/* #1.1 Mobile menu */}
      {open && (
        <div className='mt-4 sm:hidden'>
          <div className='flex flex-col space-y-1'>
            {navigation.map((item) => (
              <Link href={item.pathname} key={item.name}>
                <a
                  className={`${item.pathname === router.pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}
                  aria-current={item.pathname === router.pathname ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;