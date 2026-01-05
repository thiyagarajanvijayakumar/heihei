const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config({ path: '../.env' });

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);

        const email = 'admin';
        const password = 'admin';

        const existing = await User.findOne({ email });
        if (existing) {
            console.log('User already exists. Updating password...');
            existing.passwordHash = await bcrypt.hash(password, 10);
            await existing.save();
            console.log('Admin user updated successfully.');
        } else {
            console.log('Creating new admin user...');
            const passwordHash = await bcrypt.hash(password, 10);
            await User.create({
                email,
                passwordHash,
                name: 'Admin'
            });
            console.log('Admin user created successfully.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin user:', err);
        process.exit(1);
    }
}

seed();
