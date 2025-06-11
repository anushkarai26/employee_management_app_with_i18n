const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const dbConfig =require('../config/employeedb');


// Employee schema
const EmployeeSchema = new mongoose.Schema({
 Name: {
 type: String,
 required:true
 },
 username: {
 type: String,
 required:true
 },
 Designation:{
 type:String,
 required:true
 },
 Department:{
 type:String,
 required:true
 },
 email: {
 type: String,
 required:true
 },
 PhoneNo: {
 type: String,
 required:true
 }
 },{timestamps: true}
);

const Employee= module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
