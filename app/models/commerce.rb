class Commerce < ActiveRecord::Base
	belongs_to :user
	has_many :stores,dependent: :destroy
	extend FriendlyId
  	friendly_id :name, use: :slugged
  	validates :name, :presence => {:message => "El campo Nombre no puede estar vacío"}
end
