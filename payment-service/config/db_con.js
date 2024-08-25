import mongoose from 'mongoose';

export const connect = async () => {
  return (
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log(`Database has been connected...`))
      //error occurs while connecting to the database,catch it here.
      .catch((err) => console.log(err))
  );
};
