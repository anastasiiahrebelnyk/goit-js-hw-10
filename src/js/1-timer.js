import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    // minDate: new Date(),
    minuteIncrement: 1,
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let userSelectedDate;

flatpickr("#datetime-picker", options);

