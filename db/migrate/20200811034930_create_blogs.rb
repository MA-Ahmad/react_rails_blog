class CreateBlogs < ActiveRecord::Migration[6.0]
  def change
    create_table :blogs do |t|
      t.string :title
      t.string :author
      t.text :content
      t.string :image, default: 'https://bit.ly/2Z4KKcF'

      t.timestamps
    end
  end
end
