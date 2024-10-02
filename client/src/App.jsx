import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home.page';
import LoginPage from './pages/Login/Login.page';
import SignupPage from './pages/Signup/Signup.page';
import DepartmentList from './components/Department/DepartmentList';
import DepartmentTicketList from './components/Ticket/DepartmentTicketList';
import { DepartmentProvider } from './contexts/Department.context';
import { TicketContextProvider } from './contexts/Ticket.context';
import VerifyOtpPage from './pages/verifyOtp/verifyOtp.page';
import { UserContextProvider } from './contexts/UserContext';
import TicketDetail from './components/Ticket/TicketDetails';

function App() {
  return (
    <>
      <UserContextProvider>
        <DepartmentProvider>
          <TicketContextProvider>
            <Router>
              <main>
                <Routes>
                  <Route exact path='/' element={<HomePage />} >
                    <Route path='/departments' element={<DepartmentList />} />
                    <Route path='/dashboard' />
                    <Route path='/latestTickets' />
                    <Route path="/department/:departmentId/ticket" element={<DepartmentTicketList />} />
                    <Route path="/department/:departmentId/ticket/:ticketId" element={<TicketDetail />} />
                  </Route>
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignupPage />} />
                  <Route path='/verify-otp' element={<VerifyOtpPage />} />
                  <Route path='*' element={<HomePage />} />
                </Routes >
              </main>
            </Router>
          </TicketContextProvider>
        </DepartmentProvider>
      </UserContextProvider>
    </>
  )
}

export default App
