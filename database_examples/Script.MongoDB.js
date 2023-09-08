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
