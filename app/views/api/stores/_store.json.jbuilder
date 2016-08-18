json.shopID store.id
json.isActive store.active
json.extract! store, :picture, :name
json.categoryId store.category_id
json.category store.category.name
json.company store.commerce.name
json.extract! store, :email, :phone, :address
json.about store.description
json.registered store.created_at
json.extract! store, :latitude,:longitude

json.promotions do
	json.partial! '/api/promotions/promotions',  promotions: store.promotions
end

json.beaconInfo do
	json.partial! '/api/beacons/beacons',  beacons: store.beacons
end
