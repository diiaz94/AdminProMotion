class Role < ActiveRecord::Base
	has_many :users
 	extend FriendlyId
  	friendly_id :name, use: :slugged
end
