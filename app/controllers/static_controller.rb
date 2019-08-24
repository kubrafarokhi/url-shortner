class StaticController < ApplicationController

  def index
    response.headers["X-Frame-Options"] = 'ALLOWALL'
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    render body: Rails.public_path.join('index.html').read, content_type: 'text/html'
  end
end
