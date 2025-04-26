const endpoints = {
  // Auth
  logout: "/logout",
  login: "login",
  register: "/register",
  // User
  user: "/user",
  users: "/all-user",
  updateUser: "/update-profile",
  updateRole: `/update-user-role/`,

  // Cars
  cars: "/get-all-cars",
  carsReady: "/get-ready-cars",
  carsBooked: "/get-booked-cars",
  detailCar: "/cars/",
  car: "/car/",
  createCar: "/cars",
  carsOtw: "/get-otw-cars",

  // Booking
  booking: "/booking",
  createBook: "/bookings",
  myBook: "/my-booking",
  bookToPay: "/booktopay/",

  // Promo
  Allpromos: "/promos",
  promosActive: "/get-active-promos",
  applyPromo: "/apply-promo",
  uploadImage: "/images/upload",

  xenditCreatePayment: "/xendit/create-invoice",
};

export default endpoints;
