Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"
  get "index", to: "home#index"
  get "骰(*dice)",to: "home#dice"
end
