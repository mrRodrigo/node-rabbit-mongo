FROM mongo

COPY products.csv /products.csv
CMD mongoimport --host db --db local --collection products --type csv --file /products.csv --headerline
