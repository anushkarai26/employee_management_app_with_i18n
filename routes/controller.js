const express = require('express');
const mongoose = require('mongoose');
const Employee=require('../model/employeedet');
const employeeRoute = express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const User=require('../model/userdet');
const bcrypt=require('bcryptjs');
const config=require('../config/employeedb');
const dbconfig=require('../config/passport');

//EMPLOYEE CRUD

//GET API - view employee profile
employeeRoute.get('/', async (req, res) => {

 
        const employees = await Employee.find();
        res.json(employees);
    });

// POST API - Add Employee
employeeRoute.route('/addEmployee').post(async (req, res) => {
    try {
        // Extract employee details from request body
        const { EmployeeID, Name, username, Designation, Department, email, PhoneNo } = req.body;

        // Check if an employee with the same username or email already exists
        let existingEmployee = await Employee.findOne({ $or: [{ username }, { email }] });

        if (existingEmployee) {
            return res.status(400).json({ msg: 'Employee with this username or email already exists' });
        }

        // Create a new employee instance
        let employee = new Employee({
            EmployeeID,
            Name,
            username,
            Designation,
            Department,
            email,
            PhoneNo
        });

        // Save the new employee to the database
        await employee.save();

        // Respond with success message
        res.status(200).json({ employee: 'Employee Added Successfully' });
    } catch (err) {
        console.error(err.message);
        // Handle the duplicate key error specifically
        if (err.code && err.code === 11000) {
            res.status(400).json({ msg: 'Duplicate key error: Employee with this username or email already exists' });
        } else {
            res.status(500).send('Something Went Wrong');
        }
    }
});
//GET API by ID- view employee by username

employeeRoute.get('/editEmployee/:id', async (req, res) => {
        // Extract employee ID from request parameters
        const id = req.params.id;

        // Query MongoDB to find employee by ID
        const employee = await Employee.findById(id);

        // Check if employee with the given ID exists
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        // Respond with JSON containing the employee object
        res.json(employee);
    
});


//PUT API - update employees by ID 
employeeRoute.put('/updateEmployee/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, username, Designation, Department, email, PhoneNo } = req.body;

    try {
        // Find employee by ID
        let employee = await Employee.findById(id);

        // Check if employee with the given ID exists
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        // Update employee fields
        employee = await Employee.findByIdAndUpdate(
            id,
            { $set: { Name, username, Designation, Department, email, PhoneNo } },
            { new: true }
        );

        // Respond with updated employee
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//delete employee
employeeRoute.delete('/deleteEmployee/:id', async (req, res) => {
    
        // Extract employee ID from request parameters
        const id = req.params.id;

        // Query MongoDB to find and delete employee by ID
        const employee = await Employee.findByIdAndDelete(id);

        // Check if employee with the given ID exists
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        // Respond with JSON containing the deleted employee object
        res.json({ msg: 'Employee Deleted Successfully', deletedEmployee: employee });
});

//USER INTERFACE

// Function to hash password and save user
const addUser = async (newUser) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash; // Set hashed password
    await newUser.save();
};

// Register a new user
employeeRoute.post('/register', async (req, res) => {
    try {
        const { Name, email, username, password } = req.body;

        // Validate input fields
        if (!Name || !email || !username || !password) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new User instance
        const newUser = new User({
            Name,
            email,
            username,
            password,
     
        });

        // Hash password and save user
        await addUser(newUser);

        // Respond with success message
        res.status(201).json({ msg: 'User Added Successfully' });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).send('Server Error');
    }
});

//to login (authenticate) a user
employeeRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        // Compare provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ user }, config.secret, {
                expiresIn: 604800 // 1 week in seconds
            });

            res.json({
                success: true,
                token: 'JWT ' + token, 
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                msg: 'User logged in successfully'
            });
        } else {
            return res.status(401).json({ success: false, msg: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
});


//protecting files
employeeRoute.get('/validate',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user: req.user});
    res.send('VALIDATE');
});


// Route to get profile by username
employeeRoute.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found' });
      }
  
      // Respond with user profile data
      res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, msg: 'Server Error' });
    }
  });


module.exports = employeeRoute ; 