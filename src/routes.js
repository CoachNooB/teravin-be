const { getAllEmployeeHandler, addEmployeeHandler, editEmployeeHandler, deleteEmployeeHandler } = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: getAllEmployeeHandler
    },
    {
        method: 'POST',
        path: '/users',
        handler: addEmployeeHandler
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: editEmployeeHandler
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: deleteEmployeeHandler
    },
]

module.exports = routes;