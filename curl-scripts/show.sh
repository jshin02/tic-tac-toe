# creates game in database

curl "https://tic-tac-toe-wdi-production.herokuapp.com/games/:${ID}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo
