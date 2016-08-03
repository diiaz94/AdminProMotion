class Commerce < ActiveRecord::Base
	belongs_to :user
	has_many :stores,dependent: :destroy
	extend FriendlyId
  	friendly_id :name, use: :slugged
end
