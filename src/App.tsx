import {Route, Routes} from "react-router-dom";
import {NoMatch} from "@/pages/NoMatch.tsx";
import MainLayout from "@/layout/MainLayout.tsx";
import HomePage from "@/pages/Home.tsx";
import AccommodationListPage from "@/pages/Accommodations/List.tsx";
import MyBookingsPage from "@/pages/Bookins/MyBookings.tsx";
import NotificationPopup from "@/components/Dialog/ErrorNotificationDialog.tsx";
import {BookingProvider} from "@/state/booking/provider.tsx";


function App() {
    return (
        <BookingProvider>
            <NotificationPopup/>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route
                        path="accommodation-list"
                        element={<AccommodationListPage/>}
                    />
                    <Route
                        path="bookings/my-bookings"
                        element={<MyBookingsPage/>}
                    />
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </BookingProvider>
    )
}

export default App
