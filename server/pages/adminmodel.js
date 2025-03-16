const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const AdminModel = mongoose.model('adminmodels', adminSchema);

// Function to insert default admin if not exists
const insertDefaultAdmin = async () => {
    try {
        const existingAdmin = await AdminModel.findOne({ username: 'admin@gmail.com' });
        if (!existingAdmin) {
            const newAdmin = new AdminModel({
                username: 'admin@gmail.com',
                password: 'admin' // You should hash the password before saving it
            });
            await newAdmin.save();
            console.log('Default admin created.');
        } else {
            console.log('Admin already exists.');
        }
    } catch (error) {
        console.error('Error inserting default admin:', error);
    }
};

// Call the function when the script runs
insertDefaultAdmin();

module.exports = AdminModel;
