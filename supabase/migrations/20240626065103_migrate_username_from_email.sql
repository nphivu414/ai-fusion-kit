UPDATE profiles AS p
SET username = u.email
FROM auth.users as u
WHERE p.id = u.id AND p.username IS NULL;
