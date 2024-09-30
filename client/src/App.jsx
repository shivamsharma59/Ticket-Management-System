import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/Home.page';
import LoginPage from './pages/Login/Login.page';
import SignupPage from './pages/Signup/Signup.page';
import DepartmentList from './components/Department/DepartmentList';
import DepartmentForm from './components/Department/DepartmentForm';
import DepartmentTicketList from './components/Ticket/DepartmentTicketList';
import { DepartmentProvider } from './contexts/Department.context';
import { TicketContextProvider } from './contexts/Ticket.context';

function App() {
  return (
    <>
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
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
              </Routes >
            </main>
          </Router>
        </TicketContextProvider>
      </DepartmentProvider>
    </>
  )
}

export default App
