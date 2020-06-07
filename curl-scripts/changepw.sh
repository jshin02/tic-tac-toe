curl 'https://tic-tac-toe-wdi-production.herokuapp.com/change-password' \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"
  --data '{
    "credentials": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'",
    }
  }'

echo
