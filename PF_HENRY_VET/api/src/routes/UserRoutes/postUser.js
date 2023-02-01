const {Router} = require("express");
const {User} = require("../../db");
const router = Router();

router.post("/post", async (req, res) => {
    const {
        name,
        email,
        password,
        creditCard,
        direction,
        idCarrito
    } = req.body;
    try{
        if(!name || !email || !password || !creditCard || !direction) res.status(200).json({
            ok: false,
            msg: "Faltan Datos",
            detail: "Faltan Datos"
        }) 
        const createdUser = await User.create({
            name_U: name,
            email_U: email,
            password_U: password,
            creditCard_U: creditCard,
            direction_U: direction
        })

        //await createdUser.addShoppingCart(idCarrito);

        res.status(200).json({
            ok: true,
            value: "Se ha Agregado El Usuario."
        });
    }catch(err){
        res.status(404).send({
            ok: false, 
            msg: "Lo Lamentamos, Ha Ocurrido Un Error.",
            detail: err.message 
        })
    }
});

module.exports = router;