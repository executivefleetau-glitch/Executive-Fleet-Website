export const menuItems = [
  {
    id: 1,
    title: "Home",
    link: "/",

  },
  {
    id: 2,
    title: "About Us",
    link: "/about/",

  },
  {
    id: 3,
    title: "Our Fleet",
    link: "/fleet-list/",

  },
  {
    id: 4,
    title: "Services",
    link: "/services/",
    subMenu: [
      { id: 41, title: "Airport Transfers", link: "/airport-transfer/" },
      { id: 42, title: "Corporate Travel", link: "/corporate-travel/" },
      { id: 43, title: "Family Travel", link: "/family-travel/" },
      { id: 44, title: "Special Event", link: "/special-event/" },
      { id: 45, title: "Winery Tour", link: "/winery-tour/" },
    ],
  },
  {
    id: 5,
    title: "Blog",
    link: "/blogs/",

  },
];
