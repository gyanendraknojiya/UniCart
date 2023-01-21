const getRedisCartKey = (userId) =>{
  return `${userId}-cart`;
};

module.exports = { getRedisCartKey };
