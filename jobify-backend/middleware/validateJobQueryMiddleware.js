// middleware/validateJobQueryMiddleware.js

const validateJobQuery = (req, res, next) => {
  const allowedStatuses = ['interview', 'pending', 'declined'];
  const allowedSort = ['latest', 'oldest', 'a-z', 'z-a'];
  let { status, sort, search, page = 1 } = req.query;

  page = parseInt(page);
  if (isNaN(page) || page < 1) {
    return res.status(400).json({ message: 'Invalid page number' });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status filter' });
  }

  if (sort && !allowedSort.includes(sort)) {
    return res.status(400).json({ message: 'Invalid sort option' });
  }

  if (search) {
    search = search.trim();
    if (search.length > 50) search = search.slice(0, 50);
    req.query.search = search;
  }

  req.query.page = page;
  next();
};

export default validateJobQuery;
