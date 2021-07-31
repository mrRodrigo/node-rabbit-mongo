module.exports = ({
	fromAMQP: data => data.toString().slice(1, -1)
});
