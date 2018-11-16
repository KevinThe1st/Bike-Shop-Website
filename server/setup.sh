#!/bin/bash

sequelize db:drop --env test
sequelize db:create --env test
sequelize db:migrate --env test
