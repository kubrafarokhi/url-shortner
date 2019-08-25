class CreateAccessEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :access_events do |t|
      t.string :referer
      t.string :user_agent
      t.references :short_link, null: false, foreign_key: true

      t.timestamps
    end
  end
end
