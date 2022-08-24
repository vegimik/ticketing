export async function mongoDB(mongoose: any) {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb!");
  } catch (error) {
    console.log(error);
  }
}
