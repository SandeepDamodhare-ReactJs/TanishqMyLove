
const { UserModel } = require("../model/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'helloworld';

const userRegister = async (req, res) => {
    try {
        const { name, mobile, address, pincode, about, email, password, image, accountType } = req.body;

        const userfindData = await UserModel.findOne({ email });
        if (userfindData) {
            return res.status(201).json({ msg: "User already registered", success: false });
        }

        const userfindMobile = await UserModel.findOne({ mobile });
        if (userfindMobile) {
            return res.status(201).json({ msg: "User already registered with this mobile number", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ name, mobile, address, pincode, about, email, password: hashedPassword, image, accountType });

        const user = await newUser.save();
        res.status(201).json({ msg: "User registered successfully", success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findData = await UserModel.findOne({ email });
        if (!findData) {
            return res.status(400).json({ msg: "User not registered" });
        }

        const isMatch = await bcrypt.compare(password, findData.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: findData._id }, secretKey, { expiresIn: '1h' });
        const { name, mobile, address, pincode, about, image, accountType } = findData;

        res.status(200).json({ msg: "User login success", token, name, mobile, address, pincode, about, email, image, accountType });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

const getUserData = async (req, res) => {
    const { email } = req.body;

    try {
        const users = await UserModel.findOne({ email });
        if (users) {
            res.status(200).json({ msg: "User found", users, success: true });
        } else {
            res.status(200).json({ msg: "User not found", success: false });
        }
    } catch (error) {
        console.log(error);
    }
};

const userUpdate = async (req, res) => {
    const userData = req.body;
    const { UserId } = req.params;
    console.log("UserId", UserId);
    let newData = {...userData, }
    try {
        const prevImage = await UserModel.findOne({ _id: UserId })
        console.log("prev", prevImage);
        console.log("data", userData);
        
        await UserModel.findByIdAndUpdate({ _id: UserId }, userData);
        res.status(200).json({ msg: "User update success!", success: true });
    } catch (error) {
        console.log(error);
    }
};

const userDelete = async (req, res) => {
    try {
        const { email } = req.body;

        const findData = await UserModel.findOne({ email });

        if (!findData) {
            return res.status(404).json({ msg: "User not found" });
        }

        await findData.deleteOne();

        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

// const userGet = async (req, res) => {
//     try {
//         const { name } = req.query;

//         const user = await UserModel.findOne({ name: new RegExp('^' + name + '$', 'i') });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({ message: "User found successfully", user });
//     } catch (error) {
//         res.status(500).json({ message: "An error occurred", error: error.message });
//     }
// };


const userGet = async (req, res) => {
    try {
        const { name, pincode, address } = req.query;

        // Build query object based on provided parameters
        const query = {};
        if (name) query.name = new RegExp(name, 'i'); // Case-insensitive search
        if (pincode) query.pincode = pincode;
        if (address) query.address = new RegExp(address, 'i'); // Case-insensitive search

        console.log("Query Object:", query); // Log query for debugging

        // Find users matching the query
        const users = await UserModel.find(query);
        console.log("Users Found:", users); // Log users for debugging

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({ message: "Users found successfully", users });
    } catch (error) {
        console.error("Error:", error); // Log error for debugging
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};








// const userSuggestion = async (req, res) => {
//     try {
//         const { name } = req.query;
//         const users = await UserModel.find({ name: { $regex: name, $options: 'i' } }).limit(10).select('name -_id');
//         const suggestions = users.map(user => user.name);
//         res.json({ suggestions });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

const userSuggestion = async (req, res) => {
    try {
        const { name, pincode, address } = req.query;

        // Build query object based on provided parameters
        const query = {};
        if (name) query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        if (pincode) query.pincode = pincode;
        if (address) query.address = { $regex: address, $options: 'i' }; // Case-insensitive search

        console.log("Query Object:", query); // Log query for debugging

        // Find users matching the query
        const users = await UserModel.find(query).limit(10).select('name -_id');
        console.log("Suggestions Found:", users); // Log suggestions for debugging

        const suggestions = users.map(user => user.name);
        res.json({ suggestions });
    } catch (error) {
        console.error("Error:", error); // Log error for debugging
        res.status(500).send(error);
    }
};





module.exports = {
    getUserData,
    userRegister,
    userLogin,
    userUpdate,
    userDelete,
    userSuggestion,
    userGet
};




