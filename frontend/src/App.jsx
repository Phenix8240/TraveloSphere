import { useState } from 'react';
import './index.css';
import './App.css';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingScreen from './screens/BookingScreen';
import Register from './components/Register';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import MyBookings from './components/MyBookings';
import PaymentSuccess from './components/PaymentSuccess';
import CancelBookingConfirmation from './components/CancelBooking';
import AdminScreen from './screens/AdminScreen';
import AllBookings from './components/AllBookings';
import AllHotels from './components/AllHotels';
import AllUsers from './components/AllUsers';
import AddHotel from './components/AddHotel';
import Home from './HomeSection/Home';
import Review from './Reviews/Review';
import ImageGalleryComponent from './imgGal/ImageGalleryComponent';
// import CreateTrip from './create-trip/CreateTrip'
// import Viewtrip from './view-trip/[tripId]/index' 
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> {/* Wrap everything with BrowserRouter */}
      <Navbar />
      
      <Routes> {/* Use Routes to define your routes */}
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} /> {/* Optional, as '/' will work as home */}
        <Route path='/booking/:id/:fromDate/:toDate' element={<BookingScreen />} /> {/* Update here */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<MyProfile/>} />
        <Route path='/mybookings' element={<MyBookings/>} />
        <Route path='/payment-success' element={<PaymentSuccess/>} />
        <Route path='/cancel-booking/:id' element={<CancelBookingConfirmation/>} />
        <Route path='/admin' element={<AdminScreen/>} />
        <Route path='/admin/bookings' element={<AllBookings/>} />
        <Route path='/admin/hotels' element={<AllHotels/>} />
        <Route path='/admin/users' element={<AllUsers/>} />
        <Route path='/admin/add-hotel' element={<AddHotel/>} />
        <Route path='/homescreen' element={<HomeScreen/>} />
        <Route path='/review' element={<Review/>} />
        <Route path='/imggallery' element={<ImageGalleryComponent/>} />
        {/* <Route path='/view-trip/:tripId' element={<Viewtrip/>} />
        <Route path='/create-trip' element={<CreateTrip/>} /> */}

      </Routes>
     
    </Router>
  );
}

export default App;
