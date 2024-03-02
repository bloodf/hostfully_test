import BookingHero from "@/components/Hero/BookingHero.tsx";
import AccommodationSearchBar from "@/components/Search/AccommodationSearchBar.tsx";

const HomePage = () => {
    return (
        <>
            <BookingHero>
                <AccommodationSearchBar/>
            </BookingHero>
        </>
    );
};

export default HomePage;
