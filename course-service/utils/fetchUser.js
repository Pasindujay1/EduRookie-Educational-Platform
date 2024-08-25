import axios from "axios";

// export const fetchUser = async (req, res) => {
//   const jwtToken = req.headers.authorization;
//   console.log("🚀 ~ fetchUser ~ jwtToken:", jwtToken);
//   // try {
//   const response = await axios.get(`${process.env.USER_SERVICE_URL}/user/me`, {
//     headers: {
//       Authorization: jwtToken,
//     },
//   });
//   console.log("🚀 ~ fetchUser ~ response:", response.data);
//   req.user = response.data;

//   next();
//   // } catch (error) {
//   //   return res.status(404).json({ error: "User cannot be found!" });
//   // }
// };
