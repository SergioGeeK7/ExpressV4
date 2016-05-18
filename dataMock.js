module.exports = function (db){
    
     db
        .Users
        .bulkCreate([{
                email     : "SergioGeek7@gmail.com",
                firstName : "Sergio",
                lastName  : "Arboleda"
            },
            {
                email     : "AndresGeek7@gmail.com",
                firstName : "Andres",
                lastName  : "Arboleda"
            }
        ])
         .then(function (user){
             return db.UserPassWords.bulkCreate([{
                password  : "password",
                expire    :  Date.now(),
                UserId    :  1
            },
            { 
                password  : "esto es una contraseña",
                expire    :  Date.now(),
                UserId    :  2
            }
            ], {validate: true, individualHooks: true});
         
        })
         .then(function (){
            return db.Users
                      .findAll({
                        where  : {
                            id : 1
                        },
                        include :[{
                            model: db.UserPassWords
                        }]
                    });
        })
        .then(function (dataset){
            console.log(dataset.length)
            console.log(dataset[0].dataValues.UserPassWord.dataValues)
        })
        .then(function (){
            return db
                    .Pictures
                    .bulkCreate([{
                        UserId : 1,
                        url    : "http://simplenote.com/img.png"
                    },
                    {
                        UserId : 1,
                        url    : "http://google.com/youtube.png"
                    },
                    {
                        UserId : 2,
                        url    : "http://google.com/googleplus.png"
                    },
                    {
                        UserId : 1,
                        url    : "http://google.com/googlemaps.png"
                    }
                    ]);
        }) 
        .then(function (){
              return db.Users
                      .findAll({
                        where  : {
                            id : 1
                        },
                        include :[{
                            model: db.Pictures ,
                            where: { url: { $like: '%google%' }}
                        }]
                    }); 
        })
        .then(function (dataset){
            console.log(dataset.length)
            console.log(dataset[0].dataValues.Pictures.length)
            console.log(dataset[0].dataValues.Pictures[0].dataValues.url)
            console.log(dataset[0].dataValues.Pictures[1].dataValues.url)
            
            
            Object.keys(db.Users).forEach(function (item){
                if(item.indexOf("PassWord")){
                    console.log(item);
                }
            })
            
        })
        .then(function (){
            console.log("Done !");
        })
    
    
}


// User.belongsTo(Company); // Will add companyId to user
// Find all projects with a least one task where task.state === project.task
// Project.findAll({
//     include: [{
//         model: Task,
//         where: { state: Sequelize.col('project.state') }
//     }]
// })