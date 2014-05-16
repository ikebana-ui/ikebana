# Copies the ikebana library to assets and
# Converts SASS to CSS

test -d "assets/ikebana" || mkdir -p "assets/ikebana/" && cp -r "../../lib/" "assets/ikebana"
while [ ! -f assets/ikebana/ikebana.sass ]
do
  sleep 2
done
sass --update assets/ikebana/ikebana.sass:assets/styles/ikebana.css