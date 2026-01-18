import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import Category from "../models/CategoryModel.js";
import Course from "../models/CourseModel.js";
import Cart from "../models/CartModel.js";
import connectDB from "../config/db.js";

async function seedDatabase() {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected");

    // 1. Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Course.deleteMany();
    await Cart.deleteMany();

    console.log("🧹 Old data cleared");

    // 2. Users
    const rawUsers = [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "password1",
        role: "instructor",
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "password2",
        role: "student",
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        password: "password3",
        role: "instructor",
      },
      {
        name: "Diana Prince",
        email: "diana@example.com",
        password: "password4",
        role: "student",
      },
      {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        password: "password5",
        role: "admin",
      },
    ];

    const users = rawUsers.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    }));

    const createdUsers = await User.insertMany(users);
    console.log("✅ Users seeded");

    // 3. Categories
    const categories = await Category.insertMany([
      { name: "Web Development" },
      { name: "Data Science" },
      { name: "Machine Learning" },
      { name: "Mobile Development" },
      { name: "Cloud Computing" },
    ]);
    console.log("✅ Categories seeded");

    // 4. Courses
    const courses = [
      {
        title: "Full Stack Web Development",
        description:
          "Learn to build complete web applications with MERN stack.",
        price: 199,
        instructor: createdUsers[0]._id, // Alice
        category: categories[0]._id, // Web Development
      },
      {
        title: "Data Science Bootcamp",
        description:
          "Hands-on course covering Python, Pandas, and data visualization.",
        price: 249,
        instructor: createdUsers[2]._id, // Charlie
        category: categories[1]._id, // Data Science
      },
      {
        title: "Machine Learning Fundamentals",
        description:
          "Introduction to ML concepts including regression, classification, and clustering.",
        price: 299,
        instructor: createdUsers[0]._id, // Alice
        category: categories[2]._id, // Machine Learning
      },
      {
        title: "React Native Mobile Apps",
        description: "Build cross-platform mobile apps using React Native.",
        price: 179,
        instructor: createdUsers[2]._id, // Charlie
        category: categories[3]._id, // Mobile Development
      },
      {
        title: "Cloud Computing with AWS",
        description:
          "Learn cloud fundamentals and AWS services for deployment.",
        price: 229,
        instructor: createdUsers[0]._id, // Alice
        category: categories[4]._id, // Cloud Computing
      },
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log("✅ Courses seeded");

    // 5. Carts
    const carts = [
      {
        userId: createdUsers[1]._id, // Bob (student)
        items: [
          { courseId: createdCourses[0]._id, price: createdCourses[0].price }, // Full Stack
          { courseId: createdCourses[1]._id, price: createdCourses[1].price }, // Data Science
        ],
      },
      {
        userId: createdUsers[3]._id, // Diana (student)
        items: [
          { courseId: createdCourses[2]._id, price: createdCourses[2].price }, // Machine Learning
          { courseId: createdCourses[3]._id, price: createdCourses[3].price }, // React Native
        ],
      },
    ];

    await Cart.insertMany(carts);
    console.log("✅ Carts seeded");

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
