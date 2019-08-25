require 'rails_helper'

RSpec.describe "AccessEvents", type: :request do
  describe "GET /:stub+" do
    let(:user_agent) { "TEST AGENT RUNNING RSPEC" }
    let(:referer) { "this.other.site" }
    let(:header) { { 'User-Agent' => user_agent, 'Referer' => referer }}

    it "gets a list of access events" do
      post create_short_link_path, params: { long_url: "https://example.com/test" }
      expect(response).to have_http_status(201)
      short_url = json_response["short_url"]
      get short_url, headers: header
      get short_url, headers: header

      get "#{short_url}+"
      expect(response).to have_http_status(200)
      expect(json_response["response"].length).to eq 2
      first_lookup = json_response["response"][0]
      expect(first_lookup["user_agent"]).to eq user_agent
      expect(first_lookup["referer"]).to eq referer
    end
  end
end
