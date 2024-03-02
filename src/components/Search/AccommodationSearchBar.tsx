import DatePickerWithRange from "@/components/UI/DatePickerWithRange.tsx";
import {Button} from "@/components/UI/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {format} from "date-fns";
import {DateRange} from "@/types/ui.ts";

const AccommodationSearchBar = () => {
    const [dates, setDates] = useState<DateRange>({ from: null, to: null });
    const navigate = useNavigate();

    const handleSearch = () => {
        if (dates.from && dates.to) {
            const queryParams = new URLSearchParams({
                start: format(dates.from, 'yyyy-MM-dd'),
                end: format(dates.to, 'yyyy-MM-dd'),
            }).toString();

            navigate(`/accommodation-list?${queryParams}`);
        } else {
           throw new Error('Please select start and end dates.');
        }
    };

    return (
        <div className="w-full flex space-x-5 md:w-auto bg-white p-2 rounded-md">
            <DatePickerWithRange
                onChange={(range) => setDates(range)}
            />
            <Button onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
}
export default AccommodationSearchBar;
