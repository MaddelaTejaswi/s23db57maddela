var queen = require('../models/queen');
// List of all queen

// List of all queen
exports.queen_list = async function (req, res) {
    try {
        thequeen = await queen.find();
        res.send(thequeen);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }

};
// for a specific queen.
//exports.queen_detail = function(req, res) {
//  res.send('NOT IMPLEMENTED: queen detail: ' + req.params.id);
// };

// for a specific queen.
exports.queen_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await queen.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};


// Handle queen create on POST.

// Handle queen create on POST.
exports.queen_create_post = async function (req, res) {
    console.log(req.body)
    let document = new queen();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"queen_type":"goat", "cost":12, "size":"large"}
    document.queen_type = req.body.Queen_nam;
    document.cost = req.body.Queen_age;
    document.size = req.body.Queen_height;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle queen delete form on DELETE.
/*exports.queen_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: queen delete DELETE ' + req.params.id);
};*/
// Handle queen delete on DELETE.
exports.queen_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await queen.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
// Handle queen update form on PUT.
// exports.queen_update_put = function(req, res) {
//  res.send('NOT IMPLEMENTED: queen update PUT' + req.params.id);
// };

//Handle queen update form on PUT.
    exports.queen_update_put = async function (req, res) {
        console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
        try {
            let toUpdate = await queen.findById(req.params.id)
            // Do updates of properties
            if (req.body.queen_height)
                toUpdate.queen_height = req.body.queen_height;
            if (req.body.queen_age) toUpdate.queen_age = req.body.queen_age;
            if (req.body.queen_name) toUpdate.queen_name = req.body.queen_name;
            let result = await toUpdate.save();
            console.log("Sucess " + result)
            res.send(result)
        } catch (err) {
            res.status(500)
            res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
        }
    };


// if (req.body.checkboxsale) toUpdate.sale = true;
// else toUpdate.same = false;


// VIEWS
// Handle a show all view
exports.queen_view_all_Page = async function (req, res) {
    try {
        thequeen = await queen.find();
        res.render('queen', { title: 'queen Search Results', results: thequeen });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle a show one view with id specified by query
exports.queen_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await queen.findById( req.query.id)
    res.render('queendetail',
    { title: 'queen Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    // Handle building the view for creating a queen.
// No body, no in path parameter, no query.
// Does not need to be async
exports.queen_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('queencreate', { title: 'queen Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    // Handle building the view for updating a queen.
// query provides the id
exports.queen_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await queen.findById(req.query.id)
    res.render('queenupdate', { title: 'queen Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    
    