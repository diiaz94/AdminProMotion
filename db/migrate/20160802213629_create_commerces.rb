class CreateCommerces < ActiveRecord::Migration
  def change
    create_table :commerces do |t|
      t.string :name
      t.text :location
      t.text :description
      t.belongs_to :user, index:true
      t.string :slug
      t.timestamps null: false
    end
  end
end
