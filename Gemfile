source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 6.0.0'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.0'
gem 'bootsnap', '>= 1.4.4', require: false

group :development do
  gem 'foreman'
  gem 'listen'
end

group :test do
  gem 'capybara'
  gem 'capybara-selenium'
  gem 'chromedriver-helper' if ENV['USE_SYSTEM_CHROMEDRIVER'].nil?
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'rspec-rails'
  gem 'rspec-given'
  gem 'shoulda-matchers'
  gem 'simple_bdd'
end
