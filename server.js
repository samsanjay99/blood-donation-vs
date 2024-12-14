const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB connection - use environment variable or default to local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodDonationDB';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bloodGroup: String,
    phone: String,
    address: String,
    userType: String, // 'donor' or 'bloodbank'
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Signup API
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, bloodGroup, phone, address, userType } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            bloodGroup,
            phone,
            address,
            userType
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Login API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const user = await User.findOne({ email, userType });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.json({ message: 'Login successful', user: { 
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType
        }});
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Admin APIs
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        await User.findByIdAndUpdate(id, updateData);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
