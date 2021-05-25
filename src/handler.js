const { Employee } = require('./database');
let { Counter } = require('./database')

const getAllEmployeeHandler = () => ({
    status: 'success',
    data: {
        Employee,
    }
});

const addEmployeeHandler = (req, h) => {
    const { name, email, mobile, birthday, address } = req.payload;

    if(!name) {
        const res = h.response({
            status: 'fail',
            message: 'Failed to add new Employee, name cannot be empty!'
        });
        res.code(400);
        return res;
    }

    if(!address) {
        const res = h.response({
            status: 'fail',
            message: 'Failed to add new Employee, address cannot be empty!'
        });
        res.code(400);
        return res;
    }


    const year = new Date().getFullYear()
    const yearDigit = year.toString().slice(-2)
    const month = (new Date().getMonth()+1).toString()
    const monthPad = '00'
    const resultMonth = (monthPad+month).slice(-monthPad.length)

    const idPad = '0000'
    const unique = Counter.toString(10)
    Counter ++
    const result = (idPad+unique).slice(-idPad.length);

    const id = `${yearDigit}${resultMonth}${result}`
    

    const newEmployee = {
        id,
        name,
        email,
        mobile,
        birthday,
        address,
    }
    Employee.push(newEmployee);
    const isSuccess = Employee.filter((person) => person.id === id);

    if(isSuccess) {
        const res = h.response({
            status: 'succes',
            message: 'Employee added successfully.',
            data: {
                employeeId: id,
            }
        })
        res.code(201);
        return res;
    }

    const res = h.response({
        status: 'failed',
        message: 'Failed to add new Employee.',
    });
    res.code(500);
    return res;
}

const editEmployeeHandler = (req, h) => {
    const { id } = req.params;
    const { name, email, mobile, birthday, address } = req.payload;

    if(!name) {
        const res = h.response({
            status: 'failed',
            message: 'Failed to update Employee, Name cannot be empty!'
        });
        res.code(400);
        return res;
    }

    if(!address) {
        const res = h.response({
            status: 'failed',
            message: 'Failed to update Employee, Address cannot be empty!'
        });
        res.code(400);
        return res;
    }

    const index = Employee.findIndex((person) => person.id === id);

    if(index !== -1) {
        Employee[index] = {
            ...Employee[index],
            name,
            email,
            mobile,
            birthday,
            address,
        }

        const res = h.response({
            status: 'success',
            message: 'Employee data Updated Successfully.'
        });
        res.code(200);
        return res;
    }

    const res = h.response({
        status: 'failed',
        message: 'Cannot find employee ID'
    });
    res.code(404);
    return res;
}

const deleteEmployeeHandler = (req, h) => {
    const { id } = req.params;
    const index = Employee.findIndex((person) => person.id === id)

    if(index !== -1) {
        Employee.splice(index, 1)
        
        const res = h.response({
            status: 'success',
            message: 'Employee data Deleted successfully.'
        });
        res.code(200);
        return res;
    }

    const res = h.response({
        status: 'failed',
        message: 'Cannot find employee ID',
    });
    res.code(404);
    return res;
}

module.exports = { getAllEmployeeHandler, addEmployeeHandler, editEmployeeHandler, deleteEmployeeHandler }