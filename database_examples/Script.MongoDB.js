// db.persons.insertMany()

// ---------------------------------------
//db.getCollection("persons").find({}).count()

// ---------------------------------------
//db.getCollection("persons").find({})

// ---------------------------------------
db.getCollection("persons")
    .find({"gender":"female", "eyeColor":"green"})
    .count()
    
// ---------------------------------------

db.getCollection("persons")
    .find({"eyeColor": {"$ne":"green"}, "age":{"$gte":25, "$lt":35}, "name":{"$gt":"N"}})
    .sort({"name": 1})
    .count()
    

// ---------------------------------------
db.getCollection("persons")
    .find({"$and":[{"gender":"female"}, {"favoriteFruit":"banana"}]})
    .sort({"name": 1})
    .count()

db.getCollection("persons")
    .find({"gender":"female", "favoriteFruit":"banana"})
    .sort({"name": 1})
    .count()

// ---------------------------------------
db.getCollection("persons")
    .find({"$and":[{"age":{"$ne":25}},{"age":{$gte:25}}]})
    .sort({age: 1})
    .count()
    
// ---------------------------------------
db.getCollection("persons")
    .find({ "company.location.country": "USA", "company.title":"OVOLO"})
    .count()
// ---------------------------------------
db.getCollection("persons")
    .find({
        "tags" : [
        "enim",
        "id",
        "velit",
        "ad",
        "consequat"
    ]
        })
//    .count()

db.getCollection("persons")
    .find({
        "tags.0" : "ad"
        })
//    .count()
// ---------------------------------------
//    {<fileName.: { "$all": ["<value1>", "<vlaue2>", ...]}}
//    {<fileName.: { "$size": <number>}}
db.getCollection("persons")
    .find({
        "tags" : {
            $all:[
        "ad",
        "et"
    ]
        }
        })
//    .count()

db.getCollection("persons")
    .find({
        "tags" : {
        $size: 4
        }
        })
//    .count()

// ---------------------------------------
db.getCollection("friends").find({
    //"friends.age": {$gt:20, $lt:25}
    //$and:[{"friends.age":{$gt:20}},{"friends.age":{$lt:25}}]
    //friends:{"name" : "Steve","age" : 27}
    "friends.name": "Steve", 
    "friends.age": 27,
    "friends.registered": true
})
// ---------------------------------------
// {<arrayField>: {$elemMatch: {<condition1>, <condition2>, ...}}}
db.getCollection("friends").find({
    friends:{
        $elemMatch:{
            name:"Bob",
            age: 25,
            registered:false
        }
    }
})
// ---------------------------------------
db.getCollection("persons")
    .find({
        name:{$exists:true}
})


db.getCollection("persons")
    .find({
        index:{$type: "int", $eq:10}
})

// ---------------------------------------
db.getCollection("persons")
    .find(
        {},
        {name:1, age:1, eyeColor:1, _id:0}
)

db.getCollection("persons")
    .find(
        {},
        {name:0, age:0}
)
// ---------------------------------------
//    {<fieldName>: {$regex: /pattern/<options>}}
//    {<fieldName>: {$regex: /pattern/, $options: "<options>"}}
db.getCollection("persons")
    .find({
        //favoriteFruit: {$regex: /anan/i}
        //tags: {$regex: /^ad$/}
        
    }
)

//    {<fieldName>: {$regex: /pattern/<options>}}
//    {<fieldName>: {$regex: /pattern/, $options: "<options>"}}
db.getCollection("persons")
    .find({
        name: {$regex: /^Aur/, $options:"i"}
        
    }
)
//.count()

// ---------------------------------------
//	lookup operator
db.books
.aggregate([{
   $lookup:{
       from: "authors",
       localField: "authors",
       foreignField: "_id",
       as: "creators"
   } 
}])

//another exercise
{
	userName: "max",
	favBooks: ["id1", "id2"]
}

{
	_id: "id1",
	name: "Lord of the Ring 1"
}

customers.aggregate(
[
	$lookup:{
		from: "books",
		localField: favBooks",
		foreignField" "_id",
		as: "favBookData"
	}
])

db.users.insertMany([
    {
        name: "Max Scharzmueller",
        age: 29,
        email: "max@test.com"
    },
    {
        name: "Manuel Lorenz",
        age: 29,
        email: "manuel@test.com"
    }
])
 
db.posts
.insertOne({
    title: "My first Post!",
    text: "This is my first post, I hope you like it!",
    tag: ["new", "tech"],
    creator: ObjectId("6502b0b3a89e381466321bf0"),
    comments: [
        {
            text: "I like this post",
            author: ObjectId("6502b0b3a89e381466321bef"),
        }
    ]
})

db.posts
.aggregate([{
    $lookup:{
        from: "users",
        localField: "comments.author",
        foreignField: "_id",
        as: "authorData"
    }
}])

// ---------------------------------------
//	Schema validation
db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectid and is required'
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objectid and is required'
              }
            }
          }
        }
      }
    }
  }
});


db.posts
.insertOne(
    {
        "title" : "My first Post!",
        "text" : "This is my first post, I hope you like it!",
        "tag" : [
            "new",
            "tech"
        ],
        "creator" : ObjectId("6502b0b3a89e381466321bf0"),
        "comments" : [
            {
                "text" : "I like this post",
                "author" : 1
            }
        ]
    }
)

db.runCommand({
  collMod: 'posts',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectid and is required'
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objectid and is required'
              }
            }
          }
        }
      }
    }
  },
  validationAction: 'warn'
});


// ---------------------------------------
//	Working with order insertion through collection
db.hobbies
.insertMany([
    {
        "_id" : "sports",
        "name" : "Sports"
    },
    {
        "_id" : "cooking",
        "name" : "Cooking"
    },
    {
        "_id" : "cars",
        "name" : "Cars"
    },
    {
        "_id" : "yoga",
        "name" : "Yoga"
    },
    {
        "_id" : "yoga",
        "name" : "Yoga&Meditation"
    },
    {
        "_id" : "hiking",
        "name" : "Hiking"
    }
],
{
    ordered:false
})
// ---------------------------------------
//	The writeConcert definition over MongoDbServer
db.persons
.insertOne(
    {
        "name" : "Aliya",
        "age" : parseInt(22)
    },
    {
        writeConcern: 
        {
            w:1,
            j:true,
            wtimeout:1
        }
    }
)
// ---------------------------------------
/** Operations:
*OR, 
*AND, 
*NOT, 
*EQ, 
*EXIST, 
*TYPE, 
*REGEX, 
*EXPR, 
*SIZE, 
*ALL, 
*elemMatch

*/
db.movies
.find({
    $or:[
        {
        'rating.average':{$gt:9.3}
        },
        {
        'rating.average':{$lt: 5}
        }
    ]
})
.pretty()

db.movies
.find({
    $and:[
        {
        'rating.average':{$gt:9}
        },
        {
        'genres':'Drama'
        }
    ]
})
.pretty()

db.movies
.find({
    runtime:{
        $not:{
            $eq:60
        }
    }
})
.pretty()

db.movies
.find({
    runtime:{
        $ne:60
    }
})
.pretty()

db.users
.find({
    age: {$exists: true, $gt: 30}
})
.pretty()

db.users
.find({
    phone:{
        $type: ['double','string']
    }
})

db.movies
.find({
    summary: {
        $regex:  /musical/
    }
})

db.sales
.find({
    $expr:{
        $gt:['$volume', '$target']
    }
})
.pretty()

db.sales
.find({
    $expr:{
        $gt:[
            {
                $cond:{
                    $if:{
                        $gte:['$volume', 190]
                    },
                    then:{
                        $substract:[
                            '$volume', 10
                        ]
                    },
                    else: '$volume'
                }
            },
            '$target'
        ]
    }
})
.pretty()

db.users
.find({
    hobbies:{
        $size: 3
    }
})

db.getCollection("tv_shows")
.find({
    genres:{
        $all:[
        "Drama",
        "Science-Fiction"
        ]
    }
})

db.users
.find({
    $and:[
        {
            'hobbies.title':'Sports'
        },
        {
            'hobbies.frequency':{
                $gt:2
            }
        }
    ]
})

db.users
.find({
    hobbies:{
        $elemMatch:{
            title: 'Sports', 
            frequency:{$gte:3}
        }
    }
})


// ---------------------------------------
//	Applying Cursors

const dataCursor=db.movies.find({})
dataCursor.next()
 
 db.movies.find({})
.forEach(doc=> printjson(doc))

// ---------------------------------------
//	Sort, 
//	Limit
db.movies
.find({})
.sort({'rating.average':-1, runtime: -1})


db.movies
.find({})
.sort({'rating.average': 1, runtime: -1})
.skip(10)
.limit(3)
.itcount()

// ---------------------------------------
//	Projections to share result
db.movies
.find({
    genres:{
        $all:[
            'Drama', 'Horror'
        ]
    }
}, {
    name:1,
    genres:1,
    runtime:1,
    rating:1,
    'schedule.time':1,
    'genres':1,
    _id:0
})

db.movies
.find({
    genres:{
        $all:[
            'Drama', 'Horror'
        ]
    }
}, {
    name:1,
    genres:1,
    runtime:1,
    rating:1,
    'schedule.time':1,
    genres:{$slice:[1,2]},
    _id:0
})


// ---------------------------------------
// set, inc
db.users
.updateOne(
    {
        "name" : 'Manuel',
    },
    {
        $set:{
            age:40,
            phone: 64644468486
        }
    }
)

db.users
.updateOne(
    {
        "name" : 'Manuel',
    },
    {
        $inc:{
            age:1
        }
    }
)

db.users
.updateOne(
    {
        "name" : 'Manuel',
    },
    {
        $set:{age: 30}
    }
)

// ---------------------------------------
//	Min, Max, Mul, Rename,
db.users
.updateOne(
    {
        "name" : 'Chris',
    },
    {
        $min: {
            age:35
        }
    }
)

db.users
.updateOne(
    {
        "name" : 'Chris',
    },
    {
        $max: {
            age:38
        }
    }
)

db.users
.updateOne(
    {
        "name" : 'Chris',
    },
    {
        $mul: {
            age:1.1
        }
    }
)

db.users
.updateMany(
    {
    },
    {
        $rename:{
            age: "totalAge"
        }
    }
)

// ---------------------------------------
//	Upsert
db.users
.updateOne({name: 'Maria'},
{
    $set:{
            "hobbies" : [
                {
                    "title" : "Good food",
                    "frequency" : 3
                },
            ],
            "isSporty" : true,
            "age" : 29
            }

},
{
    upsert: true
})

// ---------------------------------------
//	Updating match Array
db.users
.updateMany({
    hobbies:{
        $elemMatch:{
            title: 'Sports',
            frequency: {
                $gte: 3
            }
        }
    }
},
{
    $set:{
        'hobbies.$.highFrequency':true
    }
}
)

db.users
.updateMany({
    totalAge:{
        $gt: 30
    }
},{
    $inc:{
        'hobbies.$[].frequency': -1
    }
})

db.users
.updateMany({
    'hobbies.frequency': {$gt: 2}
},
{
    $set:{
        'hobbies.$[el].goodFrequency':true
    }
},
{
    arrayFilters: [
    {
        'el.frequency': {
            $gt: 2
        }
    }
    ]
}
)


// ---------------------------------------
//	Push, 
//	Pull,
//	Pop,
//	AddToSet
db.users
.updateOne(
{
    name: 'Maria'
},
{
    $push:{
        hobbies:{
            "title" : "Sports",
            "frequency" : 2
        }
    }
})

db.users
.updateOne(
{name: 'Maria'},
{
    $push:{
        hobbies:{
            $each:[
                {
                    "title" : "Good Wine",
                    "frequency" : 1
                },
                {
                    "title" : "Hiking",
                    "frequency" : 2
                }
            ],
            $sort:{
                frequency:-1
            }
        }
    }
})

db.users
.updateOne(
{name: 'Maria'},
{
    $pull:{
        hobbies:{
            "title" : "Hiking"
        }
    }
})

db.users
.updateOne(
{name: 'Chris'},
{
    $pop:{
        hobbies:1
    }
})

db.users
.updateOne(
{
    name: 'Maria'
},
{
    $addToSet:{
        hobbies:
        {
            "title" : "Hiking 1",
            "frequency" : 2
        }
    }
})


// ---------------------------------------
//	Deletion
db.users
.deleteOne({
    "name" : "Maria2",
})

db.users
.drop()

db.dropDatabase()

// ---------------------------------------
//	Module: Indexes
db.contacts
.explain("executionStats")
.find({
    "dob.age":{
        $gt: 60
    }
})

db.contacts
.createIndex({
    "dob.age": -1
})

db.contacts
.dropIndex({ 
})

db.contacts
.explain()
.find({
    "dob.age": 35,
})
.sort({
    gender:1
})

db.contacts
.getIndexes()

db.contacts
.createIndex(
{
   email:1 
},
{
    unique: true
})

// ---------------------------------------
//	Partial Filter
db.contacts
.createIndex(
{
    "dob.age":1
},
{
    partialFilterExpression: {
        gender: "male"
    }
})

db.contacts
.createIndex(
{
    "dob.age":1
},
{
    partialFilterExpression: {
        "dob.age":{
            $gt: 60
        }
    }
})

db.contacts
.find({
    "dob.age":{
        $gt: 60
    },
    gender: "male"
})

// ---------------------------------------
//	Applying partial index
db.getCollection("users")
.insertMany([
{
    "name" : "Max",
    "email" : "max@test.com"
},
{
    "name" : "Manu",
}
])

db.users
.createIndex({
    email:1
},
{
    unique: true
})

db.users
.createIndex({
    email:1
},
{
    unique: true,
    partialFilterExpression:{
        email: {
            $exists: true
        }
    }
})


// ---------------------------------------
//	Understanding Time-To-Live (TTL) Index
db.sessions
.createIndex({
    "createdAt" : 1
},{
    expireAfterSeconds: 10
})
// ---------------------------------------
//	Query diagnosis and query planning
explain => {queryPlanner, executionStats, allPlansExecution}

db.customers
.explain("executionStats")
.find({
    name: "Max"
},{
    _id: 0,
    name:1
})

// ---------------------------------------
//	Winning Plans:
//	Approach 1:
//	Approach 2: 
//	Approach 3: Based on Cache
// ---------------------------------------
//	Multi-keys explanation:
db.contactsv2
.explain('executionStats')
.find({
    hobbies:'Sports'
})

// ---------------------------------------
//	Text Indexes
db.products
.explain('executionStats')
.find({
    $text:{
        $search:'awesome'
    }
})

db.products
//.explain('executionStats')
.find({
    $text:{
        $search:'awesome'
    }
},
{
    score:{
        $meta: 'textScore'
    }
})

db.products
//.explain('executionStats')
.find({
    $text:{
        $search:'awesome'
    }
},
{
    score:{
        $meta: 'textScore'
    }
})
.sort({
    score:{
        $meta: 'textScore'
    }
})

// ---------------------------------------
//	Building Indexes
db.rankings
.createIndex({
	age:1
},{
	background: true
})

// ---------------------------------------
//	GeoJSON application:
db.places
.insertOne(
{
    name: "Prishtina bus station",
    location:
    {
        type: "Point",
        coordinates: [21.1443001, 42.6501056 ]
    }
})

db.places
. dex({
    location: "2dsphere"
})

db.places
.find({
    location:{
        $near:{
            $geometry:{
                type:"Point",
                "coordinates" : [
                    22.1443001,
                    43.6501056
                ]

            }
        }
    }
})

db.places
.find({
    location:{
        $near:{
            $geometry:{
                type:"Point",
                "coordinates" : [
                    22.1443001,
                    43.6501056
                ]

            },
            $maxDistance:300000,
            $minDistance:10,
            
        }
    }
})


const p1=[21.0043001, 42.9901034]
const p2=[22.0043001, 41.9901034]
const p3=[21.0043001, 41.9901034]
const p4=[22.0043001, 42.9901034]


db.places
.find({
    location:{
        $geoWithin:{
            type: "Point",
            coordinantes:[[p1, p2, p3, p4]]
        }
    }
})


//	Finding places within an area
db.areas
.insertOne({
    "name" : "Vegims Area",
    "area" : {
        "type" : "Point",
        "coordinantes" : [
            [
                [
                    21.0043001,
                    42.9901034
                ],
                [
                    22.0043001,
                    41.9901034
                ],
                [
                    21.0043001,
                    41.9901034
                ],
                [
                    22.0043001,
                    42.9901034
                ]
            ]
        ]
    }
})

//	Finding intersected places
db.areas
.find({
    area:{
        $geoIntersects:{
            $geometry:{
                type : "Point",
                coordinantes : [21.0043001,43.9901034]
            }
        }
    }
})

//	Findingcertain places within a radius:
db.places
.find({
    location:{
        $geoWithin:{
            $geometry:{
                $centerSphere:[
                    [
                        21.1443001,
                        42.6501056
                    ],
                    1/6378.1
                ]
            }
        }
    }
})


// ---------------------------------------
//	Using aggregation framework
db.persons
.aggregate([
...
	{
		$match:{

		},
	},
	{
		$sort:{
			
		},
	},
	{
		$group:{
			
		},
	},
	{
		$project:{
			
		}
	},
])


// ---------------------------------------
//	Group Stage:
db.persons.aggregate([
    { 
        $match: 
        { 
            gender: 'female'
        } 
    },
    { 
        $group: 
        { 
            _id: 
            { 
                state: "$location.state" 
            }, 
            totalPersons: 
            { 
                $sum: 1 
            } 
        } 
    }
]).pretty();

db.persons.aggregate([
    { 
        $match: 
        { 
            gender: 'female'
        } 
    },
    { 
        $group: 
        { 
            _id: 
            { 
                state: "$location.state" 
            }, 
            totalPersons: 
            { 
                $sum: 1 
            } 
        } 
    },
    {
        $sort:{
            totalPersons: -1
        }
    }
])

db.persons.aggregate([
    { $match: { 'dob.age': { $gt: 50 } } },
    {
      $group: {
        _id: { gender: '$gender' },
        numPersons: { $sum: 1 },
        avgAge: { $avg: '$dob.age' }
      }
    },
    { $sort: { numPersons: -1,  avgAge:-1} }
  ])
	
// ---------------------------------------
//	Aggregation, project fucntionality:
//	Operators: 
//	1)	substrCP
//	2)	subtract
//	3)	strLenCP

db.persons.aggregate([
    {
      $project: {
        _id: 0,
        gender: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    }
  ]).pretty();

// ---------------------------------------
//	Turning a Location into a geoJSON object:
db.persons.aggregate([
    {
        $project:{
            _id:0,
            name:1,
            gender:1,
            email:1,
            location: {
                type: 'Point',
                coordinates:[
                    '$location.coordinates.longitude',
                    '$location.coordinates.latitude'
                    ]
            }
        }
    },
    {
      $project: {
        gender: 1,
        email:1,
        location:1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    }
  ])
 
//	Converting type of string to double
  db.persons.aggregate([
    {
        $project:{
            _id:0,
            name:1,
            gender:1,
            email:1,
            location: {
                type: 'Point',
                coordinates:[
                    {
                        $convert:{
                            input:'$location.coordinates.longitude',
                            to: "double",
                            onError: 0,
                            onNull: 0
                        }
                    },
                    {
                        $convert:{
                            input: '$location.coordinates.latitude',
                            to: "double",
                            onError: 0,
                            onNull: 0
                        }
                    },
                    ]
            }
        }
    },
    {
      $project: {
        gender: 1,
        email:1,
        location:1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    }
  ])
  
//	Converting string to date (example date of birth):
db.persons.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { 
			$convert: { 
				input: '$dob.date', 
				to: 'date' 
			} 
		},
        age: "$dob.age",
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            }
          ]
        }
      }
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    }
  ]).pretty();

//	Built-in method: toDate
db.persons.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        /*{
            $convert:{
                input: '$dob.date',
                to: 'date',
                onError: 0,
                onNull: 0
            }
        },
        */
        age: "$dob.age",
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            }
          ]
        }
      }
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    }
  ]).pretty();

//	Built-in operator "isoWeekYear"
db.persons.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: "$dob.age",
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            }
          ]
        }
      }
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    },
    { 
        $group: { 
            _id: { 
                birthYear: { 
                    $isoWeekYear: "$birthdate" 
                    } 
                }, 
                numPersons: { 
                    $sum: 1 
                    } 
                } 
        },
    { 
        $sort: { 
            numPersons: -1 
            } 
        }
  ]).pretty();


// ---------------------------------------
/*
=>	Comparison $group vs $project:
	1.	$group is an operator that is going to be executed throught he documents in the concept of n:1, like oeprations: Sum, Count, Average, Build Array.
	2.	$project is an oeprator that is going to be executed in the conecpt of 1:1. Example: Include/Excelude fields, Transform fields (with a single document)
*/
// ---------------------------------------
//	$push operator over $group:
db.friends
.aggregate([
    {
        $group: {
            _id:{
                age: '$age'
            },
            allHobbies: {
                $push: '$hobbies'
            }
        }
    }
])

//	$unwind operation flats the data to the array element 
db.friends
.aggregate([
    { 
        $unwind: "$hobbies" 
        }, 
    { 
        $group: { 
            _id: { 
                age: "$age" 
                }, 
                allHobbies: { 
                    $push: "$hobbies" 
                    } 
                } 
        }
  ]).pretty();

//	$addToSet operation is able to add any element to any set wheree is noit going to duplicate the items:
db.friends.aggregate([
    { $unwind: "$hobbies" }, 
    { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } }
  ]).pretty();

//	$slice operation:
//	$slice:[array_data, snumberOfElementsToGet]
//	$slice:[array_data, startFromitem(counting begins with 1), numberOfElementsToGet]
db.friends.aggregate([
    { 
        $project: { 
            _id: 0, 
            examScore: { 
                $slice: ["$examScores", 2, 1] 
                } 
            } 
        }
  ]).pretty();


// ---------------------------------------
//	$size operation helps us to get the number of items inner array object:
db.friends.aggregate([
    { 
        $project: { 
            _id: 0, 
            numScores: { 
                $size: "$examScores" 
                },
            totalScores:{
                $sum: '$examScores.score'                
                }
            } 
        }
  ]).pretty();


// ---------------------------------------
//	Using $filter operator:
db.friends.aggregate([
    {
      $project: {
        _id: 0,
        scores: { 
            $filter: { 
                input: '$examScores', 
                as: 'sc', 
                cond: {
                    $gt: ["$$sc.score", 60]  
                    /*
                    '$$sc.score':{
                        $gt: 60
                    }
                    */
                    } 
                } 
            }
      }
    }
  ]).pretty();

// ---------------------------------------
//	Applying multiple operations to our Array:
db.friends.aggregate([
    { $unwind: "$examScores" },
    { $project: { _id: 1, name: 1, age: 1, score: "$examScores.score" } },
    { $sort: { score: -1 } },
    { $group: { _id: "$_id", name: { $first: "$name" }, 
        maxScore: {
            $first:{
                $max: "$score" 
            } 
            }
             } },
    { $sort: { maxScore: -1 } }
  ]).pretty();


// ---------------------------------------
//	$bucket oepration:
db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',
        boundaries: [18, 30, 40, 50, 60, 120],
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: '$dob.age' }
        }
      }
    }
  ])
  .pretty();

db.persons.aggregate([
    {
      $bucketAuto: {
        groupBy: '$dob.age',
        buckets: 5,
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: '$dob.age' }
        }
      }
    }
  ]).pretty();

// ---------------------------------------
//	Dividing into additional stages:
db.persons.aggregate([
    { 
        $match: { 
            gender: "male" 
            } 
        },
    { 
        $project: { 
            _id: 0, 
            gender: 1, 
            name: { 
                $concat: ["$name.first", " ", "$name.last"] 
                }, 
            birthdate: { 
                $toDate: "$dob.date" 
                } 
            } 
        },
    { 
        $sort: { 
            birthdate: 1 
            } 
        },
    { 
        $skip: 10 
        },
    { 
        $limit: 10 
        }
  ]).pretty();
// ---------------------------------------
//	Writing pipeline results into a new collection:
//	Using the $out keyword inside of aggregation
db.persons.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: "$dob.age",
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            }
          ]
        }
      }
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    },
    { $out: "transformedPersons" }
  ]).pretty();

// ---------------------------------------
//	Working with the $geoNearStage:
db.transformedPersons
.createIndex({
    location: '2dsphere'
})

db.transformedPersons.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [-18.4, -42.8]
        },
        maxDistance: 1000000,
        num: 10,
        query: { age: { $gt: 30 } },
        distanceField: "distance"
      }
    }
  ]).pretty();


// ---------------------------------------
//	Working with numeric data
//	Integers, Long, Double
//	Integer is going to use the NumberInt, Long is to use Number Long and the last one double is going to use NumberDecimal
// ---------------------------------------
//	Capped collection: Capped collections are fixed-size collections that support high-throughput operations that insert and retrieve documents based on insertion order.
db.createCollection('capped', {capped:true, size: 10000, max:3})

db.capped
.find({})
.sort({$natural:-1})
.pretty()

//	Replica Set it a method approach to operate through Secondary Note whcile we saving the data even if the Primary Note data where are saved is not working properly for a moment of time.

//	Sharding (Horizontal Scaling): Client can have a call thorugh mongos (router) then route to specific server/Shard

// ---------------------------------------
//	Transactions:
//	Thats a good exmaple of transcation when for example we have a user that is going to be realted with 2+ Post Document items from post Collection so in this case we we have to deleted also the Post Document Items that are related directly with UserId.

const session= db.getMongo().startSession()
print(session)  
session.startTransaction()
const usersC=session.getDatabase('analytics').users
const postsC=session.getDatabase('analytics').posts
print(usersC)
usersC.find({}) //example, do another operation through the collections
//session.commitTransaction()
//session.abortTransaction()

// ---------------------------------------