/** @format */

export const validateRegistration = (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const errors = {};

  if (!/^[A-Z][a-z]*$/.test(firstName)) {
    errors.firstName = "First name must start with a capital letter.";
  }

  if (!/^[A-Z][a-z]*$/.test(lastName)) {
    errors.lastName = "Last name must start with a capital letter.";
  }

  if (!/(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
    errors.password =
      "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
  }

  if (!/@/.test(email)) {
    errors.email = "Invalid email address.";
  }

  if (!/^\d{10,}$/.test(phoneNumber)) {
    errors.phoneNumber = "Phone number must be at least 10 digits long.";
  }

  if (errors.firstName || errors.lastName || errors.email || errors.password || errors.phoneNumber) {
    return res.status(400).json({ errors });
  }

  next();
};
