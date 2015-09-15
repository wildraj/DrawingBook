class Image < ActiveRecord::Base

  validates :title, presence: true
  validates :data,  presence: true
  belongs_to :user
end
