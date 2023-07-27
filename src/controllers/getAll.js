
const getAll = async (req, res) => {
    try {
        
        res.status(200).json({users: "hugo"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

module.exports = getAll;






