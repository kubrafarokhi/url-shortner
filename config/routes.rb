Rails.application.routes.draw do
  get '*path', to: "static#index", constraints: ->(request) do
    !request.xhr? && request.format.html? && !request.path.match(/^\/(assets|api)/)
  end

  root to: "static#index"
end
