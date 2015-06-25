class CreateXzs < ActiveRecord::Migration
  def change
    create_table :xzs do |t|
      t.string :downloaded_at
      t.string :name
      t.text :innfo

      t.timestamps null: false
    end
  end
end
