class CreateBeacons < ActiveRecord::Migration
  def change
    create_table :beacons do |t|
      t.string :uuid
      t.string :major
      t.string :minor
      t.string :slug
      t.belongs_to :store, index:true
      t.timestamps null: false
    end
  end
end
