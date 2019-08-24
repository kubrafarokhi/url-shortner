class ShortLink < ApplicationRecord
  validates :long_url, presence: true, format: /\A#{URI::regexp}\z/, uniqueness: true
  validates :stub, presence: true, length: { is: 8 }

  before_validation :create_stub, on: :create

  private

  def create_stub
    self.stub = SecureRandom.base64(6)
    # TODO: handle the low-chance of duplicate stubs
    # TODO: handle the higher-chance of non-URI compatible stubs
  end
end
