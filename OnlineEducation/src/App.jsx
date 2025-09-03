import { Routes , Route, Navigate } from 'react-router-dom'
import Home from './pages/homePage/home'
import Progress from './pages/homePage/ProgressDashboard'
import './App.css'
import Navebar from './components/Navebar'
import AccountPage from './pages/AccountPage'
import Footer from './components/Footer'
import LearningPage from './components/LearningPage'
import AuthPage from './pages/homePage/AuthPage'
import ConnectPage from './pages/ConnectPage'
import CategoryPage from './pages/CategoryPage'

function App() {
  

  return (
    <>
      <Navebar/>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <Routes>
            <Route path='/login' element={<AuthPage isSignup={false} />}/>
            <Route path='/signup' element={<AuthPage isSignup={true} />}/>
            <Route path='/' element={
               <Home/> 
            }/>
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/course/:courseId" element={<LearningPage />} />
            <Route path='/connect' element={<ConnectPage />} />
            <Route path='/progress' element={<Progress/>}/>
            <Route path='/account' element={<AccountPage/>}/>
          </Routes>
        </main>
      </div>
      <Footer/>
    </>
  )
}

export default App
