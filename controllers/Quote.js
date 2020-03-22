var mongoose = require('mongoose');

let QuoteSchema = mongoose.Schema({
    author: String,
    text: String
})

let Quote = mongoose.model('quotes', QuoteSchema);

module.exports = {

    add: async (author, text) => {
        let newQuote = new Quote({
            author,
            text
        });
        try {
            if (!await Quote.findOne({ text }))
                return await newQuote.save();
            return null;
        }
        catch (err) {
            return err;
        }
    },

    get: async () => {
        try {
            const data = await Quote.find({});
            return data;
        }
        catch (err) {
            return err;
        }
    }
}

