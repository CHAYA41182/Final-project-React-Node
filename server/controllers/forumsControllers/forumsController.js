/// CRUD בסיסי

const Forum = require('../../models/Forum');

const getForums = async (req, res) => {
    try {
        const forums = await Forum.find().lean();
        res.json(forums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getForum = async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id,{ password: 0 }).lean();
        res.json(forum);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createForum = async (req, res) => {
    const { name, description, threads, public } = req.body;
    const newForum = new Forum({ name, description, threads, public });
    try {
        const savedForum = await newForum.save({ password: 0 });
        res.json(savedForum);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateForum = async (req, res) => {
    try {
        const { name, description, threads, public } = req.body;
        const updatedForum = await Forum.findById(req.params.id);
        if(name) updatedForum.name = name;
        if(description) updatedForum.description = description;
        if(threads) updatedForum.threads = threads;
        if(public) updatedForum.public = public;
        const savedForum = await updatedForum.save({ password: 0 });
        res.json(savedForum);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteForum = async (req, res) => {
    try {
        const deletedForum = await Forum.findByIdAndDelete(req.params.id);
        res.json("Forum deleted");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getForums,
    getForum,
    createForum,
    updateForum,
    deleteForum
};
