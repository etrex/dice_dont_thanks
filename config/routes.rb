Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"
  get "index", to: "home#index"
  get "menu", to: "home#index"
  get "目錄", to: "home#index"
  get "功能", to: "home#index"
  get "使用說明", to: "home#index"
  get "說明", to: "home#index"
  get "骰子", to: "home#index"
  get "骰(*dice)",to: "home#dice"
end
