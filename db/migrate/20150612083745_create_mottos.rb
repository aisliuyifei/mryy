class CreateMottos < ActiveRecord::Migration
  def change
    create_table :mottos do |t|
      t.string :content
      t.string :downloaded_at
      t.string :remote_image_url
      t.timestamps null: false
    end
  end
end
