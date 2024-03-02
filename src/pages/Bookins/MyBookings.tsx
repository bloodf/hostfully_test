import {useEffect, useState} from 'react';
import AccommodationCard from "@/components/Accommodation/Card";
import {useBookings} from "@/hooks/useBookings";
import {Booking} from "@/types/booking.ts";
import {getHotelData} from "@/api/fakeHotel.ts";
import NoBookings from "@/components/Accommodation/NoBoookins.tsx";
import AccommodationSearchBar from "@/components/Search/AccommodationSearchBar.tsx";
import BookingUpdate from "@/components/Dialog/BookingUpdate.tsx";
import {startOfDay} from "date-fns";
import {DateRange} from "react-day-picker";
import {HotelAccommodation} from "@/types/api.ts";

const MyBookingsPage = () => {
    const {getUserBookings, removeBooking, addOrUpdateBooking} = useBookings();
    const [bookedAccommodations, setBookedAccommodations] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [selectedAccommodation, setSelectedAccommodation] = useState<HotelAccommodation | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    useEffect(() => {
        const userBookings = getUserBookings();
        setBookedAccommodations(userBookings || []);
    }, [getUserBookings]);

    const handleCancelBooking = (bookingId: string) => {
        removeBooking(bookingId);
        setBookedAccommodations(prev => prev.filter(booking => booking.id !== bookingId));
    };

    const handleCloseDialog = () => {
        setSelectedBooking(null);
        setSelectedAccommodation(null);
        setIsUpdateDialogOpen(false);
    }

    const handleSaveBooking = (selectedRange: DateRange, guests: number) => {
        if (!selectedBooking) return;

        const updatedBooking: Booking = {
            ...selectedBooking,
            startDate: startOfDay(selectedRange.from ?? new Date()),
            endDate: startOfDay(selectedRange.to ?? new Date()),
            guests,
        };

        addOrUpdateBooking(updatedBooking);
        setBookedAccommodations(prev => prev.map(booking => booking.id === updatedBooking.id ? updatedBooking : booking));
        handleCloseDialog();
    };


    const allAccommodations = getHotelData();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Booked Accommodations</h1>
            <div className="grid md:grid-cols-3 gap-4">
                {bookedAccommodations.map((booking) => {
                    const accommodation = allAccommodations.find(acc => acc.id === booking.accommodationId);
                    if (!accommodation) return null;

                    return (
                        <AccommodationCard
                            key={booking.id}
                            accommodation={accommodation}
                            isBooked={true}
                            guests={booking.guests}
                            bookedDates={{
                                from: new Date(booking.startDate),
                                to: new Date(booking.endDate)
                            }}
                            onCancel={() => handleCancelBooking(booking.id)}
                            onUpdate={() => {
                                setSelectedBooking(booking);
                                setSelectedAccommodation(accommodation);
                                setIsUpdateDialogOpen(true);
                            }}
                        />
                    );
                })}
            </div>
            {!bookedAccommodations.length && <NoBookings>
              <AccommodationSearchBar/>
            </NoBookings>}
            {selectedBooking && (
                <BookingUpdate
                    isOpen={isUpdateDialogOpen}
                    capacity={selectedAccommodation?.capacity || 1}
                    initialGuests={selectedBooking.guests}
                    selectedDates={{
                        from: startOfDay(selectedBooking.startDate),
                        to: startOfDay(selectedBooking.endDate)
                    }}
                    onClose={handleCloseDialog}
                    onSave={handleSaveBooking}
                />
            )}
        </div>
    );
};

export default MyBookingsPage;
