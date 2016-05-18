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
            ]);
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
            console.log("Done !");
        })
    
    
}