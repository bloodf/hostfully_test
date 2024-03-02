import {format, startOfTomorrow, isBefore, isSameDay} from "date-fns";
import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/UI/Popover.tsx";
import {Button} from "@/components/UI/Button.tsx";
import {Calendar} from "@/components/UI/Calendar.tsx";
import {useEffect, useState} from "react";
import {DateRange} from "react-day-picker";

const DatePickerWithRange = ({onChange, selectedDates}: {
    onChange: (range: DateRange) => void;
    selectedDates?: DateRange;
}) => {
    const [date, setDate] = useState<DateRange>(selectedDates || {
        from: undefined,
        to: undefined,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        onChange?.(date);
    }, [date, onChange]);

    const handleDateSelect = (range: DateRange | undefined) => {
        setError(null);

        if (!range) return;

        if (range?.from && isBefore(range.from, startOfTomorrow())) {
            setError('Please select a date starting from tomorrow.');
            return;
        }

        if ((range?.from && range?.to) && isSameDay(range.from, range.to)) {
            setError('Start and end dates cannot be the same.');
            return;
        }

        setDate(range);
        onChange?.(range);
    };

    return (
        <div className="grid gap-2">
            {error && <div className="text-red-500">{error}</div>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <Icon icon="mdi:calendar-range" className="mr-2 h-4 w-4"/>
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateSelect}
                        numberOfMonths={2}
                        fromDate={startOfTomorrow()}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default DatePickerWithRange;
