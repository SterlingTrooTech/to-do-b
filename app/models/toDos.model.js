module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      userName: String,
      gender: String,
      hobbies: Array,
      age: Number,
      date: Date,
      taskName: String,
      status: String
    },
  );

  

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ToDos = mongoose.model("todo", schema);
  return ToDos;
};
