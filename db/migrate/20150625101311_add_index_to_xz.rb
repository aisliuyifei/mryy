class AddIndexToXz < ActiveRecord::Migration
  def change
    add_index :xzs,[:downloaded_at,:name]
  end
end
