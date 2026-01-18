import Course from "../models/CourseModel.js";

// ✅ Get all courses with optional filters
export async function getCourses(req, res) {
  try {
    const { category, minPrice, maxPrice, keyword } = req.query;

    // Start with empty filter
    let filter = {};

    // ✅ Category filter
    if (category) {
      filter.category = category;
    }

    // ✅ Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // ✅ Keyword filter (title or description)
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    const courses = await Course.find(filter)
      .populate("category", "name")
      .populate("instructor", "name email");

    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
}

export async function getCourseById(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .populate("category", "name")
      .populate("instructor", "name email");
    if (!course) {
      return res.status(404).json({ msg: "Course not Found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
}
