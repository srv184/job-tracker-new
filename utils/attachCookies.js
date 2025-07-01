const attachCookie = ({ res, token }) => {
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + thirtyDays),
    secure: process.env.NODE_ENV === "production", // true for Render
    sameSite: "None", // <- this is MANDATORY for cross-origin cookies
  });
};

export default attachCookie;
