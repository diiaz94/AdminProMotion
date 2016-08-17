json.extract! promotion, :id, :title, :description, :active, :picture, :price, :until, :created_at, :updated_at
json.url promotion_url(promotion, format: :json)