// task 1

// Find all books in a specific genre
db.books.find({ genre: "Programming" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: "Robert C. Martin" })

// Update the price of a specific book
db.books.updateOne(
  { title: "Clean Code" },
  { $set: { price: 35 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "The Pragmatic Programmer" })

//task 2

// Find books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// Projection: only return title, author, and price
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
)

// Sort books by price (ascending)
db.books.find().sort({ price: 1 })

// Sort books by price (descending)
db.books.find().sort({ price: -1 })

// Pagination - page 1 (first 5 books)
db.books.find().skip(0).limit(5)

// Pagination - page 2 (next 5 books)
db.books.find().skip(5).limit(5)

// task 3 


// Calculate average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
])

// Find the author with the most books
db.books.aggregate([
  { $group: { _id: "$author", book_count: { $sum: 1 } } },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [ { $substr: [ { $toString: "$published_year" }, 0, 3 ] }, "0s" ] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  }
])

// task 4

// Create index on title
db.books.createIndex({ title: 1 })

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to show performance improvement
db.books.find({ title: "Clean Code" }).explain("executionStats")
