const SELECT = `
SELECT 
g.id,
g.title,
json_object('country', l.country, 'city', l.city) as location,
g.price,
g.description,
g.gameCondition,
IF(COUNT(i.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(i.src)) as images
FROM games as g
LEFT JOIN images as i
  ON i.gameId = g.id
LEFT JOIN locations l
ON g.locationId = l.id
`;
const GROUP = 'group by g.id';

const SQL = {
  SELECT,
  GROUP,
};

export default SQL;
