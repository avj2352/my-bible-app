# Mongo DB - Indexing, Search,

## Important Links

- [Pluralsight Course - Search for text in MongoDB](https://app.pluralsight.com/library/courses/searching-for-text-mongodb/table-of-contents)
- [Creating multiple fields index](https://stackoverflow.com/questions/24257390/mongodb-text-search-with-multiple-fields)
- [Difference between createIndex & ensureIndex](https://stackoverflow.com/questions/25968592/difference-between-createindex-and-ensureindex-in-java-using-mongodb)

## How does Text Queries work ?

- One of the main core part of Querying Full text search in Mongo DB is ***indexing***
- Full text search is done using - Stemming & Tokenization

## $text - operator

The `$text` operator works in conjunction with a `text` index

- "startsWith" search : This is equivalent to a full text match
- "stem" search: This is equivalent to a partial text match

$text receives an object which has th following fields

- **$search** : search query
- **language**: the locale that we need to query the match (default - english)
- **caseSensitive**: whether the search should be case sensitive - true or false
- **discriticSensitive**: search should be dialect sensitive (papa and papá)

## How does $search field work ?

- **Tokenizes**: Converts a string into keywords (using unicode 3.0)
- Removes stop word (You, I, we, will, before, shall, can)
- Each surviving word it "stems" (eg: Paprica & Papa have the stem - pap)
- Sets the entire search string to lowercase

## AND OR NOT operators in $search

### Using the AND operator

```bash
# query bedroom AND apartment
db.rent.find({$text: {$search: "\bedroom apartment\"},{"_id": 0, "name": 1, "description": 1}).limit(5);
```

### Using the OR operator

```bash
# bedroom AND apartment OR sunny
db.rent.find({$text: {$search: ""\bedroom apartment\" sunny"}},{"_id": 0, "name": 1, "description": 1}).limit(5);
```

### Using NOT operator

```bash
# bedroom AND apartment NOT sunny
db.rent.find({$text: {$search: ""\bedroom apartment\" -sunny"}},{"_id": 0, "name": 1, "description": 1}).limit(5);
```

## Refining Text queries

### case sensitive

> NOTE: CaseSensitive when enabled becomes EXACT match.

```bash
# using caseSensitive - true or false
db.rent.find({$text: {$search: ""\bedroom apartment\" sunny", $caseSensitive: true}},{"_id": 0, "name": 1, "description": 1}).limit(5);
```

- Case Sensitive field only accepts boolean values - true or false

### what is $meta

- Mongo DB recalculates the relevance of a steam in a text via the `textScore` meta-field
- We can leverage that meta-field with the `$meta` field

```bash
score: {$meta: "textScore"}
```

> NOTE: This `textScore` should not be confused with the score in **Atlas cloud solution** which is based on the Lucene engine

## How to sort using "relevance"

```bash
# sorting using $meta for relevance - called a "projection"
db.rent.find({$text: {$search: ""\bedroom apartment\" sunny"}},{"_id": 0, "name": 1, "description": 1, score: {$meta:"textScore"}}).sort({score: {$meta:"textScore"}}).limit(5);
```

- If we set `.sort({score: 1})` as it was a normal field. it will try to do a normal sort in a meta-field

- sorts default - descending using "score" field with relevance value
- Adds a new field **"score"** with relevance value, called - "Projection"

## Create a Search Index - first

- Text index in Mongo DB is a multi-key, special, key [set] index
- NOTE: Text index should be unique per collection
- The following is the syntax _(in mongo)_ to create an index

```bash
# create an index of type - text
db.rent.createIndex({"name": "text"});
```

- you can also create an index with multiple field - called as a "Compound index"

```bash
# create a compound index
db.groups.createIndex({"name": "text", "description": "text", "slug": "text"});
```

- To Retrieve a list of created indexes, use the following command

```bash
# get a list of all indexes in a collection
db.groups.getIndexes();
```

- To drop all indexes, use the drop command

```bash
# drop all indexes in a collection
db.groups.dropIndexes();
```

- the following command will create the text index for all the fields in the collection

```bash
# create text index for all the fields
db.groups.createIndex({"$**", "text"});
```

## Using Mongoose to create a Schema and Text Index

In Mongoose (or an express application), you can use Mongoose to create an index when the Schema is generated. 

- The following code creates a Model - Group
- Creates a text based index for it
- Uses the service layer for a full text and a partial text search

- NOTE: partial search cannot be applied on a text index, you need to specify the field (or column) in order to apply partial search

### Create an index

```javascript
/**
 * Model for Group server side schema
 */
import mongoose, { Schema } from 'mongoose';

export const GroupSchema = new Schema({
    title: {
        type: String,
        required: 'Enter group title',
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: 'Enter group slug',
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: 'Provide group description'
    },
    // premium true is only made available for subscribed users
    premium: {
        type: Boolean,
        required: 'Public or Private collection'
    }
});

// Create Text index for Full search
GroupSchema.index({ title: 'text', description: 'text', slug: 'text' });
export const GroupModel = mongoose.model('groups', GroupSchema);
GroupModel.createIndexes();

```

>  NOTE: partial search cannot be applied on a text index, you need to specify the field (or column) in order to apply partial search

- The following script shows how to query a full text and a partial text using a "Service" layer

### Query - Full text search / Partial text search

```javascript
/**
     * search full text in Group Model
     * @param text {string} full text query string
     * @returns Promise<any>
     */
    async searchFullText (text) {
        console.log('Calling Full text query: ', text);
        return new Promise((resolve, reject) => {
            GroupModel.find({$text: {$search: text}}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }

    /**
     * search partial text in Group Model
     * @param partial {string} partial query string
     * @returns Promise<any>
     */
    async searchPartialText (partial) {
        return new Promise((resolve, reject) => {
            GroupModel.find({description: {$regex: new RegExp(partial)}}, {_id:0, __v:0}, (err, data) => {
                if (err) reject(err);
                else resolve(data); // Get JSON format of contact
            });
        });
    }
```

