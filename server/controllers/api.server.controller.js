// Invoke 'strict' JavaScript mode
'use strict';

// controller method that will be used to document all service routes for this api
exports.showRoutes = function(req, res) {

    const allroutes = [
        {
            name:'Get Version', 
            description:'Get the current version of the api.',
            http_method:'GET', 
            path:'api/getversion'
        }, 
        {
            name:'Direct DB query to MS SQ ServerL', 
            description:'Directly query SQL Server.',
            http_method:'GET', 
            queryParams:{
                q:'accepts any ms sql query string'
            },
            path:'/api/sqldb/query?q={query}'            
        }
    ];

   res.json({"/api": allroutes})

};

// controller method that returns the current API version 
exports.getVersion = function(req, res) {
   res.json({api_version:'0.1'});

};


