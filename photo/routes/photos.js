exports.list = function (req, res){
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
}

exports.