class ShortLinkController < ApplicationController
  def show
    link = ShortLink.find_by(stub: params[:stub])
    AccessEvent.create(short_link: link, referer: request.referer, user_agent: request.user_agent)
    redirect_to link.long_url, status: 301
  end

  def create
    link = ShortLink.where(short_link_params).first_or_create

    if link.errors.blank?
      render json: json_for(link), status: 201
    else
      render json: link.errors, status: 400
    end
  end

  private

  def short_link_params
    params.permit(:long_url)
  end

  def json_for(link)
    { long_url: link.long_url, short_url: short_link_url(stub: link.stub) }
  end
end
