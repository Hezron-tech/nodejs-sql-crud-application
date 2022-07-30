const { tutorials } = require("../models");
const db = require("../models");
const Tutorial =  db.tutorials

const Op = db.Sequelize.Op

exports.create = (req,res) =>{

};
//Retrive all tutorials from the database
exports.findAll = (req,res) =>{

};

//find a single tutorials with an id
exports.findone = (req,res) =>{

};

// update a tutorial by the id in the requets
exports.update = (req,res) =>{

};
exports.delete = (req,res) =>{

};
exports.deleteAll = (req,res) =>{

};
exports.findAllpublished = (req,res) =>{

};

exports.create = (req, res) =>{
    //validate request

    if (!req.body.title){
        res.status(400).send({
            message:"content can not be empty!"
        });
        return;
    }
    //create tutorial

    const tutorial={
        title:req.body.title,
        description:req.body.description,
        published: req.body.published?req.body.published:false
    };
    //save tutorial in the database

    Tutorial.create(tutorial)
    .then(data=>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message|| "some error occurred while creating he tutorial."
        });
    });
};


//Retrieve objects(with condition)

exports.findAll =(req , res)=>{
    const title =req.query.title;
    var condition= title?{ title: {[Op.like]: `%${title}%` } }:null;
    Tutorial.findAll({where:condition})
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "some error occured while retrieving tutorials"
        });
    });
};


// Retrieve a single object


exports.findone =(req, res) =>{
    const id = req.params.id;
    Tutorial.findById(id)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:"Error retrieving Tutorial with id=" +id
        });
    });


};


//update an object

exports.update =(req,res) =>{
    const id = req.params.id;
    Tutorial.update(req.body,{
        where:{id:id}
    })

    .then(num =>{
        if(num ==1){
            res.send({
                message:"Tutorials was updated succesfully"
            });
        }else{
            res,send({
                message:`cannot update tutorial with id=${id}. Maybe Tutorila was not found`
            });
        }
})

.catch(err =>{
    res.status(500),sebnd({
        message: "error updating Tutorial with id =" +id
    });
});
};



//Delete an object

exports.delete =(req,res) =>{
    const id =req.params.id;
    Tutorial.destroy({
        where:{id:id}
    })
    .then(num =>{
        if(num==1){
            res.send({
                message:"Tutorial was deleted succesfully!"
            });

        }else{
            res.send({
                message:`cannot delete id=${id}`
            });

        }
    })
    .catch(err =>{
        res.status(500).send({
            message:"could not delete tutorial with id=" +id
        });
    });
};


//delete all objects

exports.deleteAll =(req,res) =>{
    Tutorial.destroy({
        where:{},
        truncate:false
    })
    .then(nums =>{
        res.send({message:`${nums} Tutorials were deleted successfully!`});
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occurred while removing all tutorials."
        });
    });
};


//find all objects by condition.

exports.findAllpublished =(req, res) =>{
    Tutorial.findAll({ where:{ published:true}})
    .then(data =>{
        res.send(data);
    })

    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "some error occurred while retrieving tutorials."
        });
    });
};



