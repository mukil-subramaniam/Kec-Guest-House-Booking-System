import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Checkavaibility from './components/Checkavaibility';
import Scrolltop from './components/Scrolltop';
import AdminallBookings from './Pages/AdminallBookings';
import AdminLoginpage from './Pages/Adminlogin';
import Detail from './Pages/Adminpagedetails';
import Adminwebsite from './Pages/Adminwebsite';
import Allrooms from './Pages/Allrooms';
import Book from './Pages/Book';
import Bookings from './Pages/Bookings';
import Formsumission from './Pages/Formsumission';
import Homepage from './Pages/Homepage';

import Gallery from './components/Gallery';
import Newbook from './Pages/AdminBooking';
import Roomd from './Pages/Adminnewroom';
import InitialPage from './Pages/initialPage';

import Studentlogin from './Pages/staffLogin';
function App() {
  return (
    <Router>
      <Scrolltop />
       <Routes>
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/' element={<InitialPage />}/>
          <Route path='/staff-login' element={<Studentlogin />} />
          <Route path='/admin-login' element={<AdminLoginpage />} />
          <Route path="/dashboard/admins" element={<Adminwebsite />}>
              <Route path="/dashboard/admins" element ={<AdminallBookings />}/>
              <Route path="/dashboard/admins/details" element ={<Detail />}/>
              <Route path="/dashboard/admins/rooms" element ={<Roomd />}/>
              <Route path="/dashboard/admins/newbooking" element ={<Newbook />}/>
          </Route>
          <Route path='/home' element={<Homepage />} />
         
          <Route path="/booknow" element={<Book />}>
            <Route path="/booknow" element={<Checkavaibility />} />            <Route path="/booknow/rooms" element={<Allrooms />} />
            <Route path='/booknow/bookingpage' element={<Formsumission />} />
          </Route>
          <Route path='/Bookings' element={<Bookings />} />
          
        </Routes>
    </Router>
  );
}

export default App;
