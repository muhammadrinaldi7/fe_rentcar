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

  // Booking
  booking: "/booking",
  createBook: "/bookings",

  // Promo
  Allpromos: "/promos",
  promosActive: "/get-active-promos",

  uploadImage: "/images/upload",
};

export default endpoints;
