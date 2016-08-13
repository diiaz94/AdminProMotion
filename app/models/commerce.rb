class Commerce < ActiveRecord::Base
	belongs_to :user
	has_many :stores,dependent: :destroy
	extend FriendlyId
  	friendly_id :name, use: :slugged
  	validates :name, :presence => {:message => "El campo Nombre no puede estar vacío"}
	validates :user_id, :presence => {:message => "Debe indicar el Usuario dueño del comercio"}

end
