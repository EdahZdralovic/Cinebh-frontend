import 'react-datepicker/dist/react-datepicker.css';
import {CustomDatePicker} from "./custom-date-picker/CustomDatePicker.tsx";
import SelectFilterComponent from "./genres-filter/SelectFilterComponent.tsx";
import SelectVenuesFilter from "./venues-filter/SelectVenuesFilter.tsx";
import SelectLocationsFilter from "./locations-filter/SelectLocationsFilter.tsx";




export function UpcomingFilter() {

    return (
        <section className="mt-4 text-[var(--color-primary)]">
            <input type="text" name="fullName" placeholder={"  Search Movies"}
                   className="w-full h-10 border-1 shadow-lg border-gray-300 rounded-md"/>
            <div className="grid grid-cols-4 mt-4  gap-4 h-10 justify-evenly ">

                <SelectFilterComponent endpoint={"locations"} placeholder={"locations"}/>
                <SelectFilterComponent endpoint={"venues"} placeholder={"venues"}/>
                <SelectFilterComponent endpoint={"genres"} placeholder={"genres"} />
                <div className="">
                    <CustomDatePicker/>
                </div>
            </div>
        </section>

    );

}