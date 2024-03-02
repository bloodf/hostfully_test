import {useAccommodations} from "@/hooks/useAccommodations";
import {useBookings} from "@/hooks/useBookings";
import {HotelAccommodation} from "@/types/api.ts";
import NoAccommodationsAvailable from "@/components/Accommodation/NoAccommodationsAvailable.tsx";
import AccommodationSearchBar from "@/components/Search/AccommodationSearchBar.tsx";
import {useNavigate} from "react-router-dom";
import AccommodationCard from "@/components/Accommodation/Card.tsx";

const AccommodationListPage = () => {
    const {getAvailableAccommodations, startDate, endDate} = useAccommodations();
    const {addOrUpdateBooking} = useBookings();
    const navigate = useNavigate();

    const accommodations = getAvailableAccommodations();
    const handleBookAccommodation = (acc: HotelAccommodation, guests: number) => {
        if(addOrUpdateBooking({
            accommodationId: acc.id,
            startDate,
            endDate,
            guests,
        })){
            navigate("/bookings/my-bookings");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Available Accommodations</h1>
            <div className="grid md:grid-cols-3 gap-4">
                {accommodations.map((acc) => {
                    return (
                        <AccommodationCard
                            key={acc.id}
                            accommodation={acc}
                            isBooked={false}
                            onSave={handleBookAccommodation}
                        />
                    );
                })}
                {!accommodations &&
                  <NoAccommodationsAvailable startDate={startDate} endDate={endDate}>
                    <AccommodationSearchBar/>
                  </NoAccommodationsAvailable>}
            </div>
        </div>
    );
};

export default AccommodationListPage;
