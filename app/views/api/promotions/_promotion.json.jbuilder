json.extract! promotion, :id, :title
json.about promotion.description
json.isActive promotion.active
json.extract! promotion, :picture, :price
json.endDate promotion.until