import type { ReactElement } from 'react'
import Layout from '../layouts/Layout'
import type { NextPageWithLayout } from './_app'
import Cards from '../components/Card'
 
const Page: NextPageWithLayout = () => {
  return (
    <Cards />
  )
}
 
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
 
export default Page