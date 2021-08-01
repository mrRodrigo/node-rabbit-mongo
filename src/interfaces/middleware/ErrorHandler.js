module.exports = () => (err, req, res, next) => {
	console.error(err);
	res.status(err.code || 500).json({ message: err.message });
}
