#!/bin/bash
sequelize db:seed:undo:all
sequelize db:drop
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
