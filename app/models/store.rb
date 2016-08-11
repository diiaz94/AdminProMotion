class Store < ActiveRecord::Base
	belongs_to :category
	belongs_to :commerce
	has_many :promotions
	has_many :beacons
	extend FriendlyId
  	friendly_id :name, use: :slugged

	validates :name, :presence => {:message => "El campo Nombre no puede estar vacío"}
	validates :address, :presence => {:message => "El campo Dirección no puede estar vacío"}
	validates :category_id, :presence => {:message => "Debe indicar la Categoría"}
	validates :commerce_id, :presence => {:message => "Debe indicar el Comercio"}
end
