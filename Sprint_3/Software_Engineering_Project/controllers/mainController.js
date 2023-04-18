


exports.index =(req, res)=>{
    res.render('index.ejs');

};

exports.about= (req, res) => {
    res.render('about.ejs')
};

exports.contact = (req, res) => {
    res.render('contact.ejs')

};

exports.sign = (req, res) => {
    res.render('logins.ejs')
};

exports.search = (req, res, next) => {
    res.render('search.ejs')
};

exports.register= (req, res, next) => {
    res.render('registration.ejs')
}