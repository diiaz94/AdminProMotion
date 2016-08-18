# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160810203928) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "beacons", force: :cascade do |t|
    t.string   "uuid"
    t.string   "major"
    t.string   "minor"
    t.string   "slug"
    t.integer  "store_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "beacons", ["store_id"], name: "index_beacons_on_store_id", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "slug"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "commerces", force: :cascade do |t|
    t.string   "name"
    t.text     "location"
    t.text     "description"
    t.integer  "user_id"
    t.string   "slug"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "commerces", ["user_id"], name: "index_commerces_on_user_id", using: :btree

  create_table "profiles", force: :cascade do |t|
    t.string   "name"
    t.string   "last_name"
    t.boolean  "sex"
    t.string   "phone"
    t.string   "slug"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", using: :btree

  create_table "promotions", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.boolean  "active"
    t.string   "picture"
    t.float    "price"
    t.string   "until"
    t.string   "slug"
    t.integer  "store_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "promotions", ["store_id"], name: "index_promotions_on_store_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "slug"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "stores", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "email"
    t.string   "phone"
    t.text     "address"
    t.boolean  "active"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "picture"
    t.integer  "commerce_id"
    t.integer  "category_id"
    t.string   "slug"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "stores", ["category_id"], name: "index_stores_on_category_id", using: :btree
  add_index "stores", ["commerce_id"], name: "index_stores_on_commerce_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",            null: false
    t.string   "crypted_password"
    t.string   "salt"
    t.string   "slug"
    t.integer  "role_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["role_id"], name: "index_users_on_role_id", using: :btree

end
