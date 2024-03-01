exports.postNewPassword = async (req,res,next) =>{
    console.log(req.body)
    res.json({msg : "received"})

}