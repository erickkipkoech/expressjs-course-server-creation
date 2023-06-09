const members = require("../../Members.js");
const express=require('express');
const router=express.Router();
const uuid=require('uuid');


//create a get members api
router.get("/", (req, res) => res.json(members));

//Get one member
router.get("/:id", (req, res) => {
    const found=members.some((member) => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter((member) => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({message:`Member with id ${req.params.id} not found`});
    }
  
});

//Create member
router.post('/',(req,res)=>{
    const newMember={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    };

if(!newMember.name || !newMember.email){
   return res.status(400).json({message:'Missing values, please input the correct values'})
}
members.push(newMember);
res.json(newMember);
// res.redirect('/');
});

//Update Member
router.put('/:id',(req,res)=>{
    const found=members.some((member) => member.id === parseInt(req.params.id))
    if(found){
        const updMember=req.body;
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updMember.name ? updMember.name: member.name;
                member.email=updMember.email ? updMember.email:member.email;
                res.json({message:'Member updated successfully',member});
            }
        });
    }else{
        res.status(400).json({message:`Member with id ${req.params.id} not found`});
    }
});

//Delete Member
router.delete('/:id',(req,res)=>{
    const found=members.some((member)=>member.id===parseInt(req.params.id));
    if(found){
        res.json({message:'Member successfully deleted',members:members.filter(member=>member.id!==parseInt(req.params.id))})
    }else{
        res.status(400).json({message:`Member with id ${req.params.id} not found`});
    }
})

module.exports= router;