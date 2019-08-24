Rails.application.routes.draw do
  post "short_link", to: "short_link#create", as: "create_short_link"

  get ":stub", to: "analytics#show", constraints: { stub: /.{8}\+/ }

  get ":stub", to: "short_link#show", constraints: { stub: /.{8}/ }, as: "short_link"

  root to: "static#index"
end
