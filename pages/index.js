import { useRecoilState } from "recoil";
import { authAtom } from "../stores/state";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig';
// components
import AuthInput from "../components/AuthInput";
import Logo from "../components/Logo";
import { HYPARKING_AUTH } from "../constants/constant";


export default function Onboarding() {
  const [ authState, setAuthState ] = useRecoilState(authAtom)
  const { handleSubmit, formState: { errors }, register } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    const { email, password } = data

    setPersistence(auth, browserLocalPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential
        setAuthState({
          isLoggedIn: true,
          token: user.accessToken
        })
        localStorage.setItem(HYPARKING_AUTH, JSON.stringify(user.accessToken))
        router.push('/home')
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center">
      <div className="container py-16 px-5 mx-auto md:flex md:flex-col md:justify-center md:border md:rounded-lg md:max-w-xl md:min-h-[50vh]">
        <Logo />
        <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <AuthInput 
              name={"email"}
              type={"email"}
              placeholder={"이메일"}
              register={register}
              required
              top
            />
            <AuthInput 
              name={"password"}
              type={"password"}
              placeholder={"비밀번호"}
              register={register}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
