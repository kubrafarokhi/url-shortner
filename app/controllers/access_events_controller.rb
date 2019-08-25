class AccessEventsController < ApplicationController
  def show
    access_events = AccessEvent.joins(:short_link).where(:"short_links.stub" => stub)
    render json: { response: access_events.as_json(only: [:created_at, :referer, :user_agent]) }
  end

  private

  def stub
    params[:stub].delete_suffix('+')
  end
end
