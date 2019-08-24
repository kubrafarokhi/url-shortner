class CreateShortLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :short_links do |t|
      t.string :long_url
      t.string :stub, limit: 8

      t.index :long_url, unique: true
      t.index :stub, unique: true

      t.timestamps
    end
  end
end
