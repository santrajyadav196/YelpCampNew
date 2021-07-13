const Campground = require('./models/campground');
const { campgroundSchema, reviewSchema } = require('./schemas')
const ExpressError = require('./utilitis/ExpressError')
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);
    if(!req.isAuthenticated()){
        // console.log(req.path, req.originalUrl)
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateCampground = (req, res, next) =>{
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(element => element.message).join(',');
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

module.exports.isAuthor = async(req, res, next) =>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You have permision to update this campground!!')
        return res.redirect(`/campgrounds/${id}`)
    } else{
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next) =>{
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You have permision to update this campground!!')
        return res.redirect(`/campgrounds/${id}`)
    } else{
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(element => element.message).join(',');
        throw new ExpressError(msg, 400)
    } else{
        next();
    } 
}