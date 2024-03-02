import {useState, useEffect} from 'react';
import {DateRange} from 'react-day-picker';
import DatePickerWithRange from "@/components/UI/DatePickerWithRange";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle
} from "@/components/UI/AlertDialog";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/UI/Select.tsx";

const BookingUpdate = ({
                           capacity,
                           initialGuests,
                           isOpen,
                           onClose,
                           onSave,
                           selectedDates,
                       }: {
    capacity: number;
    initialGuests: number;
    isOpen: boolean;
    onClose: () => void;
    onSave: (selectedRange: DateRange, guests: number) => void;
    selectedDates: DateRange;
}) => {
    const [selectedRange, setSelectedRange] = useState<DateRange>(selectedDates || {
        from: undefined,
        to: undefined
    });
    const [guestNumber, setGuestNumber] = useState<number>(initialGuests || 1);
    const [error, setError] = useState<string>('');

    const capacityArray = Array.from({length: capacity}, (_, i) => i + 1);

    useEffect(() => {
        setSelectedRange(selectedDates || {from: undefined, to: undefined});
        setGuestNumber(initialGuests || 1);
        setError('');
    }, [isOpen, initialGuests, selectedDates]);

    const handleSave = () => {
        if (!selectedRange.from || !selectedRange.to) {
            setError('Please select a valid date range.');
            return;
        }

        onSave(selectedRange, guestNumber);
    };

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Select New Dates and Guests</AlertDialogTitle>
                </AlertDialogHeader>
                    <div className="mt-4">
                        <div className="flex items-center space-x-2">
                            <p className="block">Number of guests:</p>
                            <Select defaultValue={`${guestNumber}`}
                                    onValueChange={(v) => setGuestNumber(Number(v))}
                                    data-testid="guest-select"
                            >
                                <SelectTrigger className="w-auto border rounded-md p-2">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    {capacityArray.map((number) => (
                                        <SelectItem key={number}
                                                    value={`${number}`}>{number}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <hr className="my-4"/>
                        <p>New dates:</p>
                        {error && <p className="text-red-500 my-2">{error}</p>}
                        <DatePickerWithRange
                            selectedDates={selectedRange}
                            onChange={setSelectedRange}
                        />
                    </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Update</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default BookingUpdate;
