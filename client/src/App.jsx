import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import {Button} from './components/ui/button'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        {/* todo: to wrap the below routes to lazy load */}
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />
        {/* Adding route redirecting */}
        
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App