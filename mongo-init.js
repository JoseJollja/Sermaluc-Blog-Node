// TODO: cargar las variables de entorno en el archivo mongo-init.js

print('Start creating database ##########################')

db = db.getSiblingDB('api_blog_dev')

db.createUser({
  pwd: 'api1234',
  user: 'api_user_dev',
  roles: [{ role: 'readWrite', db: 'api_blog_dev' }]
})

db.ping.insertOne({ msg: 'pong' })

print('End creating database ##########################')
