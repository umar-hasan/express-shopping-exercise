const express = require('express');
let items = require("./fakeDb")
const ExpressError = require("./error")

const router = new express.Router()

router.get("", (req, res, next) => {
    try {
        return res.json({items: items})
    } catch (error) {
        return next(error)
    }
    
})

router.post("", (req, res, next) => {
    let n = req.body
    items.push(n)
    return res.json({
        added: n
    })
})

router.get("/:name", (req, res, next) => {
    try {
        const itemList = items.find(n => n["name"] === req.params.name)
        if (!itemList) {
            throw new ExpressError("Item not found.", 500)
        }
        return res.json(items)
    } catch (error) {
        return next(error)
    }
    
    
})

router.patch("/:name", (req, res, next) => {
    try {
        let toUpdate = items.find(n => n["name"] === req.params.name)
        if (toUpdate) {
            toUpdate["name"] = req.body.name
            toUpdate["price"] = req.body.price
            return res.json({
                updated: toUpdate
            })
        }
        else {
            throw new ExpressError("Item does not exist.", 500)
        }
    } catch (error) {
        return next(error)
    }


})

router.delete("/:name", (req, res, next) => {
    try {
        let toDelete = items.find(n => n["name"] === req.params.name)
        if (!toDelete) {
            throw new ExpressError("Item not found.", 500)
        }
        items.pop(toDelete)
        return res.json({
            message: "Deleted"
        })
    } catch (error) {
        return next(error)
    }

})


module.exports = router