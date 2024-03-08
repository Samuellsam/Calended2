import { ShepherdOptionsWithType } from "react-shepherd";

const steps: ShepherdOptionsWithType[] = [
  {
    id: "intro",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "NO THANKS 👌",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "GUIDE ME! 😱",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    title: `
    <div>
      <p class="font-caveat tour-title">Welcome to Calended2!</p>
    </div>
    `,
    text: [
      `
      <div>
      <p><b>Calended2</b> is minimalistic Work Calendar.</p>
      <br/>
      <p>created to help you manage WFO & WFH calendar for your team.</p>
      <br/>
      <p>do you need a guide?</p>
      </div>
      `,
    ],
    cancelIcon: {
      enabled: false,
    },
  },
  {
    id: "prevYear",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".prev-year-control",
      on: "bottom",
    },
    text: ["You can use this arrow to go to previous year"],
    cancelIcon: {
      enabled: false,
    },
  },
  {
    id: "nextYear",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".next-year-control",
      on: "bottom",
    },
    text: ["You can use this arrow to go to next year"],
    cancelIcon: {
      enabled: false,
    },
  },
  {
    id: "todayCalendar",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".today-scroll",
      on: "bottom",
    },
    text: ["You can use this button to scroll to current day"],
    cancelIcon: {
      enabled: false,
    },
  },
  {
    id: "calendarMode",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".calendar-mode",
      on: "bottom",
    },
    text: [
      "You can use this button to change calendar mode, 'year' or 'month' mode",
    ],
    cancelIcon: {
      enabled: false,
    },
  },
  {
    id: "languageMode",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".language-mode",
      on: "bottom",
    },
    text: [
      "You can use this button to change language for the calendar, 'English' or 'Indonesian' language",
    ],
    cancelIcon: {
      enabled: false,
    },
  },
  // {
  //   id: "calendarTheme",
  //   buttons: [
  //     {
  //       classes: "tour-btn-secondary",
  //       text: "EXIT",
  //       type: "cancel",
  //     },
  //     {
  //       classes: "tour-btn-primary",
  //       text: "PREV",
  //       type: "back",
  //     },
  //     {
  //       classes: "tour-btn-primary",
  //       text: "NEXT",
  //       type: "next",
  //     },
  //   ],
  //   classes: "tour-dialog",
  //   attachTo: {
  //     element: ".theme-calendar",
  //     on: "bottom",
  //   },
  //   text: [
  //     "You can use this button to change theme for the calendar, 'Dark' or 'Light' mode",
  //   ],
  //   cancelIcon: {
  //     enabled: false,
  //   },
  // },
  {
    id: "prevMonth",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".prev-month-control",
      on: "bottom",
    },
    text: ["You can use this arrow to go to previous month"],
    cancelIcon: {
      enabled: false,
    },
  },
  {
    id: "nextMonth",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".next-month-control",
      on: "bottom",
    },
    text: ["You can use this arrow to go to next month"],
    cancelIcon: {
      enabled: false,
    },
  },
  {
    id: "calendarDetail",
    buttons: [
      {
        classes: "tour-btn-secondary",
        text: "EXIT",
        type: "cancel",
      },
      {
        classes: "tour-btn-primary",
        text: "PREV",
        type: "back",
      },
      {
        classes: "tour-btn-primary",
        text: "NEXT",
        type: "next",
      },
    ],
    classes: "tour-dialog",
    attachTo: {
      element: ".calendar-detail",
      on: "bottom-end",
    },
    text: ["You can click on this button to view calendar detail for that day"],
    cancelIcon: {
      enabled: false,
    },
  },
];

export default steps;
