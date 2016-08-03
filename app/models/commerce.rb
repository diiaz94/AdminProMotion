class Commerce < ActiveRecord::Base
	belongs_to :user
	has_many :stores,dependent: :destroy
end
