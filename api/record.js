const Record = require('../db/models/record.js');

module.exports = function(app) {
    return {
        createRecord: (req, res) => {
            const {date, title, user, fullArticle, rating} = req.body;
            Record.create({
                date,
                title,
                user,
                fullArticle,
                rating
            }, (err, record) => {
                if (err) {
                    console.error(err);

                    return res
                        .status(500)
                        .send(err.message);
                }

                res.send({
                    success: true,
                    data: record
                })
            })
        }
    }
};