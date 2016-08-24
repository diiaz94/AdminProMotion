class ActivatesValidator < ActiveModel::Validator
  def validate(record)
  	puts "**********Validate::  options[:fields]  "+options[:fields].to_s
  	puts "**********Validate::  record.send(options[:fields][0]).to_s   "+record.send(options[:fields][0]).to_s
  	puts "**********Validate::  record.send(options[:fields][1]).to_s   "+record.send(options[:fields][1]).to_s
    if record.send(options[:fields][0])==true
    	puts "OK active"
    	if Promotion.find(record.send(options[:fields][1])).store.promotions.where(active: "true").size>0
	      record.errors[:message] = "Esta tienda ya posee una promoción activa"
    		
    	end
    end
  end
end
class Promotion < ActiveRecord::Base

	belongs_to :store
	after_initialize :init
 	extend FriendlyId
  	friendly_id :title, use: :slugged
	validates :title, :presence => {:message => "El campo Título no puede estar vacío"}
	validates :until, :presence => {:message => "El campo Caducidad no puede estar vacío"}
	validates :price, :presence => {:message => "El campo Precio no puede estar vacío"}
	validates :store_id, :presence => {:message => "Debe indicar la Tienda"}
	validates_with ActivatesValidator, fields: [:active,:id]

	def init
		self.picture  ||= "/photo_store/default_promotion.png"
		self.active =  false if self.active.nil?
	end	
	
	def state
		return self.active ? "Activa" : "Inactiva"
	end
end
