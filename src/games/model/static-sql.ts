const SELECT = `
SELECT 
  g.id, 
    g.title, 
    JSON_OBJECT(
    'country', l.country,
        'city', l.city
  ) as location, 
  g.price,
  g.description,
  g.gameCondition,
  IF(COUNT(i.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(i.src)) as images,
  JSON_OBJECT(
    'name', u.name,
    'surname', u.surname,
    'email', u.email
  ) as owner
FROM images as i
LEFT JOIN games as g
ON i.gameId = g.id
LEFT JOIN  locations as l
ON g.locationId = l.id
LEFT JOIN users as u
ON u.id = g.ownerId
`;
const GROUP = 'group by g.id';

const SQL = {
  SELECT,
  GROUP,
};

export default SQL;
