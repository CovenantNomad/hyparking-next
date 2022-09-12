import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import ProtectRouter from '../components/ProtectRouter'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ProtectRouter>
          <Component {...pageProps} />
        </ProtectRouter>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
