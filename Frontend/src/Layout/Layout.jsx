import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Router from '../Routers/Routers'




const Layout = () => {
  return (
    <>
      <Header />
      <div>
        <Router />
      </div>
      <Footer />
    </>
  )
}

export default Layout
