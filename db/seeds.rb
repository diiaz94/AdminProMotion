# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Role.create(
				[
					{name: "Admin",description: "Administra la aplicacion"},
					{name: "Owner",description: "Due;o de algun comercio"}
				]
			)
Category.create(
				[
					{name: "Restaurants",description: "Ventas de comida"},
					{name: "Sport Shop",description: "Venta de prendas deportivas"},
					{name: "Night Club",description: "Sitios nocturnos"}
				]
			)