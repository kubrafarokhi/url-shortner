require 'rails_helper'

RSpec.describe "ShortLinks", type: :request do
  describe "POST /short_links" do
    it "creates a short link" do
      post create_short_link_path, params: { long_url: "https://example.com/test" }
      expect(response).to have_http_status(201)
      expect(json_response["long_url"]).to eq "https://example.com/test"
      expect(json_response["short_url"]).to_not be_blank
    end

    it "returns the same short link with duplicate" do
      post create_short_link_path, params: { long_url: "https://example.com/test" }
      expect(response).to have_http_status(201)
      short_url = json_response["short_url"]
      post create_short_link_path, params: { long_url: "https://example.com/test" }
      expect(response).to have_http_status(201)
      expect(json_response["short_url"]).to eq short_url
    end
  end

  describe "GET /:stub" do
    let(:short_link) { ShortLink.create(long_url: "https://example.com/test") }
    subject { get short_link_path(stub: short_link.stub) }

    it "redirects to long_url" do
      expect(subject).to redirect_to("https://example.com/test")
      expect(subject).to eq 301
    end
  end
end
