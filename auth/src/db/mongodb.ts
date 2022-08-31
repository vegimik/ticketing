export async function mongoDB(mongoose: any) {
  console.log(process.env.ALLUSERSPROFILE);
  console.log(process.env.JWT_KEY);
  // console.log(process.env);
  
  if (!process.env.k) {
    throw new Error("JWT_KEY is not defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb!");
  } catch (error) {
    console.log(error);
  }
}
