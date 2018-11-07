sequelize db:drop
sequelize db:create
sequelize db:migrate

sequelize db:drop --env test
sequelize db:create --env test
sequelize db:migrate --env test
