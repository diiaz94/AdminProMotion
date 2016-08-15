class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || "Debe introducir un Email válido")
    end
  end
end
class Store < ActiveRecord::Base
	belongs_to :category
	belongs_to :commerce
	has_many :promotions
	has_many :beacons
	after_initialize :init
	extend FriendlyId
  	friendly_id :name, use: :slugged

	validates :name, :presence => {:message => "El campo Nombre no puede estar vacío"}
	validates :email, :presence => {:message => "El campo Email no puede estar vacío"}
	validates :email, email:  true
	validates :address, :presence  => {:message => "El campo Dirección no puede estar vacío"}
	validates :category_id, :presence => {:message => "Debe indicar la Categoría"}
	validates :commerce_id, :presence => {:message => "Debe indicar el Comercio"}
	validates :latitude, :presence => {:message => "Debe indicar la ubicación de la Tienda"}
	validates :longitude, :presence => {:message => "Debe indicar la ubicación de la Tienda"}
	def init
		self.picture  ||= "/photo_store/default_store.png"
		self.active =  false if self.active.nil?
	end	
	
	def state
		return self.active ? "Activa" : "Inactiva"
	end
end
