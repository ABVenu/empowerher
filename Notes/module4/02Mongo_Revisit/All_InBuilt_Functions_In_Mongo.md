### **List Of All Functions Available In Mongo**

MongoDB provides a wide range of inbuilt functions and operators for performing operations on data. These are categorized into different groups based on their usage.

---

### **1. Query Operators**
Used in queries to filter documents based on conditions.

#### **Comparison Operators**
- `$eq`: Equal to  
  **Example**: `db.users.find({ age: { $eq: 25 } })`  
- `$ne`: Not equal to  
  **Example**: `db.users.find({ age: { $ne: 25 } })`  
- `$gt`: Greater than  
  **Example**: `db.users.find({ age: { $gt: 30 } })`  
- `$gte`: Greater than or equal to  
  **Example**: `db.users.find({ age: { $gte: 30 } })`  
- `$lt`: Less than  
  **Example**: `db.users.find({ age: { $lt: 30 } })`  
- `$lte`: Less than or equal to  
  **Example**: `db.users.find({ age: { $lte: 30 } })`  
- `$in`: Matches any value in an array  
  **Example**: `db.users.find({ age: { $in: [25, 30, 35] } })`  
- `$nin`: Does not match any value in an array  
  **Example**: `db.users.find({ age: { $nin: [25, 30] } })`

#### **Logical Operators**
- `$and`: Logical AND  
  **Example**: `db.users.find({ $and: [{ age: { $gt: 20 } }, { age: { $lt: 40 } }] })`  
- `$or`: Logical OR  
  **Example**: `db.users.find({ $or: [{ age: { $lt: 20 } }, { age: { $gt: 40 } }] })`  
- `$not`: Logical NOT  
  **Example**: `db.users.find({ age: { $not: { $lt: 20 } } })`  
- `$nor`: Logical NOR  
  **Example**: `db.users.find({ $nor: [{ age: { $lt: 20 } }, { age: { $gt: 40 } }] })`

#### **Element Operators**
- `$exists`: Checks if a field exists  
  **Example**: `db.users.find({ age: { $exists: true } })`  
- `$type`: Matches fields based on their BSON type  
  **Example**: `db.users.find({ age: { $type: "int" } })`

#### **Evaluation Operators**
- `$regex`: Matches a regular expression  
  **Example**: `db.users.find({ name: { $regex: /^A/ } })`  
- `$expr`: Allows the use of aggregation expressions in queries  
  **Example**: `db.users.find({ $expr: { $gt: ["$age", 30] } })`  
- `$mod`: Modulus operation  
  **Example**: `db.users.find({ age: { $mod: [2, 0] } })`  
- `$text`: Text search  
  **Example**: `db.users.find({ $text: { $search: "developer" } })`  
- `$where`: Matches documents based on a JavaScript expression  
  **Example**: `db.users.find({ $where: "this.age > 30" })`

---

### **2. Update Operators**
Used to update fields in documents.

#### **Field Update Operators**
- `$set`: Sets a field to a specified value  
  **Example**: `db.users.updateOne({ _id: 1 }, { $set: { age: 28 } })`  
- `$unset`: Removes a field  
  **Example**: `db.users.updateOne({ _id: 1 }, { $unset: { age: "" } })`  
- `$rename`: Renames a field  
  **Example**: `db.users.updateOne({ _id: 1 }, { $rename: { age: "years" } })`  
- `$inc`: Increments a field by a specified value  
  **Example**: `db.users.updateOne({ _id: 1 }, { $inc: { age: 1 } })`  
- `$mul`: Multiplies a field by a value  
  **Example**: `db.users.updateOne({ _id: 1 }, { $mul: { age: 2 } })`  
- `$min`: Updates the field if the specified value is less than the existing value  
  **Example**: `db.users.updateOne({ _id: 1 }, { $min: { age: 30 } })`  
- `$max`: Updates the field if the specified value is greater than the existing value  
  **Example**: `db.users.updateOne({ _id: 1 }, { $max: { age: 30 } })`

#### **Array Update Operators**
- `$push`: Adds an element to an array  
  **Example**: `db.users.updateOne({ _id: 1 }, { $push: { hobbies: "reading" } })`  
- `$pop`: Removes the first or last element from an array  
  **Example**: `db.users.updateOne({ _id: 1 }, { $pop: { hobbies: 1 } })`  
- `$pull`: Removes elements from an array that match a condition  
  **Example**: `db.users.updateOne({ _id: 1 }, { $pull: { hobbies: "reading" } })`  
- `$addToSet`: Adds a value to an array only if it doesn’t already exist  
  **Example**: `db.users.updateOne({ _id: 1 }, { $addToSet: { hobbies: "cycling" } })`  
- `$each`: Used with `$push` or `$addToSet` to add multiple elements  
  **Example**: `db.users.updateOne({ _id: 1 }, { $push: { hobbies: { $each: ["reading", "cycling"] } } })`  
- `$slice`: Limits the number of elements in an array  
  **Example**: `db.users.updateOne({ _id: 1 }, { $push: { hobbies: { $each: ["reading", "cycling"], $slice: 2 } } })`  
- `$sort`: Sorts elements in an array  
  **Example**: `db.users.updateOne({ _id: 1 }, { $push: { hobbies: { $each: ["reading", "cycling"], $sort: 1 } } })`

#### **Positional Operators**
- `$`: Updates the first array element that matches the query condition  
  **Example**: `db.users.updateOne({ _id: 1, "hobbies": "cycling" }, { $set: { "hobbies.$": "swimming" } })`  
- `$[]`: Updates all array elements  
  **Example**: `db.users.updateOne({ _id: 1 }, { $set: { "hobbies.$[]": "sports" } })`  
- `$[<identifier>]`: Updates array elements that match array filters  
  **Example**: `db.users.updateOne({ _id: 1 }, { $set: { "hobbies.$[elem]": "sports" } }, { arrayFilters: [{ "elem": { $eq: "reading" } }] })`

---

### **3. Aggregation Pipeline Operators**
Used in the aggregation framework for advanced data transformations.

#### **Pipeline Stages**
- `$match`: Filters documents  
  **Example**: `db.users.aggregate([ { $match: { age: { $gt: 20 } } } ])`  
- `$group`: Groups documents by a specified key  
  **Example**: `db.users.aggregate([ { $group: { _id: "$age", total: { $sum: 1 } } } ])`  
- `$project`: Reshapes documents and includes/excludes fields  
  **Example**: `db.users.aggregate([ { $project: { name: 1, age: 1 } } ])`  
- `$sort`: Sorts documents  
  **Example**: `db.users.aggregate([ { $sort: { age: 1 } } ])`  
- `$limit`: Limits the number of documents  
  **Example**: `db.users.aggregate([ { $limit: 5 } ])`  
- `$skip`: Skips the specified number of documents  
  **Example**: `db.users.aggregate([ { $skip: 5 } ])`  
- `$unwind`: Deconstructs an array field  
  **Example**: `db.users.aggregate([ { $unwind: "$hobbies" } ])`  
- `$lookup`: Performs a left outer join with another collection  
  **Example**: `db.users.aggregate([ { $lookup: { from: "orders", localField: "_id", foreignField: "user_id", as: "order_details" } } ])`  
- `$facet`: Processes multiple pipelines within a single stage  
  **Example**: `db.users.aggregate([ { $facet: { "age_groups": [{ $group: { _id: "$age", count: { $sum: 1 } } }] } } ])`  
- `$bucket`: Categorizes documents into groups  
  **Example**: `db.users.aggregate([ { $bucket: { groupBy: "$age", boundaries: [20, 30, 40, 50], default: "Other", output: { count: { $sum: 1 } } } } ])`  
- `$bucketAuto`: Automatically categorizes documents into groups  
  **Example**: `db.users.aggregate([ { $bucketAuto: { groupBy: "$age", buckets: 3, output: { count: { $sum: 1 } } } } ])`  
- `$replaceRoot`: Replaces the root document  
  **Example**: `db.users.aggregate([ { $replaceRoot: { newRoot: "$order_details" } } ])`  
- `$merge`: Merges the results of the pipeline into another collection  
  **Example**: `db.users.aggregate([ { $merge: { into: "user_summary" } } ])`

#### **Expression Operators**
- `$sum`: Calculates the sum of numeric values  
  **Example**: `db.orders.aggregate([ { $group: { _id: null, totalAmount: { $sum: "$amount" } } } ])`  
- `$avg`: Calculates the average  
  **Example**: `db.orders.aggregate([ { $group: { _id: null, averageAmount: { $avg: "$amount" } } } ])`  
- `$min`: Finds the minimum value  
  **Example**: `db.orders.aggregate([ { $group: { _id: null, minAmount: { $min: "$amount" } } } ])`  
- `$max`: Finds the maximum value  
  **Example**: `db.orders.aggregate([ { $group: { _id: null, maxAmount: { $max: "$amount" } } } ])`  
- `$first`: Returns the first value  
  **Example**: `db.orders.aggregate([ { $group: { _id: null, firstOrder: { $first: "$date" } } } ])`  
- `$last`: Returns the last value  
  **Example**: `db.orders.aggregate([ { $group: { _id: null, lastOrder: { $last: "$date" } } } ])`  
- `$count`: Counts the number of documents  
  **Example**: `db.orders.aggregate([ { $count: "totalOrders" } ])`  
- `$concat`: Concatenates strings  
  **Example**: `db.orders.aggregate([ { $project: { orderDescription: { $concat: ["$item", " - ", "$amount"] } } } ])`  
- `$substr`: Extracts a substring  
  **Example**: `db.orders.aggregate([ { $project: { shortDescription: { $substr: ["$description", 0, 10] } } } ])`  
- `$toUpper`: Converts to uppercase  
  **Example**: `db.orders.aggregate([ { $project: { upperItem: { $toUpper: "$item" } } } ])`  
- `$toLower`: Converts to lowercase  
  **Example**: `db.orders.aggregate([ { $project: { lowerItem: { $toLower: "$item" } } } ])`  
- `$arrayElemAt`: Returns an element from an array  
  **Example**: `db.orders.aggregate([ { $project: { firstItem: { $arrayElemAt: ["$items", 0] } } } ])`  
- `$size`: Returns the size of an array  
  **Example**: `db.orders.aggregate([ { $project: { itemCount: { $size: "$items" } } } ])`  
- `$split`: Splits a string into an array  
  **Example**: `db.orders.aggregate([ { $project: { itemArray: { $split: ["$item", ","] } } } ])`

--- 

### **4. Array Operators**
Used to manipulate array fields.

- `$all`: Matches arrays that contain all specified elements  
  **Example**: `db.users.find({ hobbies: { $all: ["reading", "cycling"] } })`  
- `$elemMatch`: Matches documents containing an array with at least one element that matches the specified condition  
  **Example**: `db.users.find({ hobbies: { $elemMatch: { $eq: "reading" } } })`  
- `$size`: Matches arrays with a specified number of elements  
  **Example**: `db.users.find({ hobbies: { $size: 3 } })`

---

### **5. Text Search Operators**
- `$text`: Performs text search on a collection with a text index  
  **Example**: `db.articles.find({ $text: { $search: "MongoDB" } })`  
- `$search`: The query string for text search  
  **Example**: `db.articles.find({ $text: { $search: "MongoDB" } })`  
- `$language`: The language for the text search  
  **Example**: `db.articles.find({ $text: { $search: "MongoDB", $language: "english" } })`  
- `$caseSensitive`: Enables case-sensitive search  
  **Example**: `db.articles.find({ $text: { $search: "MongoDB", $caseSensitive: true } })`  
- `$diacriticSensitive`: Enables diacritic-sensitive search  
  **Example**: `db.articles.find({ $text: { $search: "monografía", $diacriticSensitive: true } })`

---

### **6. Geospatial Operators**
Used to perform queries on geospatial data.

- `$geoWithin`: Finds documents within a geometry  
  **Example**: `db.locations.find({ location: { $geoWithin: { $geometry: { type: "Polygon", coordinates: [...] } } } })`  
- `$geoIntersects`: Finds documents that intersect with a geometry  
  **Example**: `db.locations.find({ location: { $geoIntersects: { $geometry: { type: "Point", coordinates: [0, 0] } } } })`  
- `$near`: Finds documents near a point  
  **Example**: `db.locations.find({ location: { $near: { $geometry: { type: "Point", coordinates: [0, 0] }, $maxDistance: 500 } } })`  
- `$nearSphere`: Finds documents near a point on a sphere  
  **Example**: `db.locations.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [0, 0] }, $maxDistance: 500 } } })`

---

### **7. Miscellaneous Operators**
- `$currentDate`: Sets a field to the current date  
  **Example**: `db.users.updateOne({ _id: 1 }, { $currentDate: { lastModified: true } })`  
- `$type`: Matches fields based on their BSON type  
  **Example**: `db.users.find({ age: { $type: "int" } })`  
- `$expr`: Allows aggregation expressions in queries  
  **Example**: `db.users.find({ $expr: { $gt: ["$age", 30] } })`  
- `$jsonSchema`: Validates documents against a JSON schema  
  **Example**: `db.users.find({ $jsonSchema: { bsonType: "object", required: ["name", "age"], properties: { name: { bsonType: "string" } } } })`

---

For more comprehensive and up-to-date details, check MongoDB's official [documentation](https://www.mongodb.com/docs/manual/).
